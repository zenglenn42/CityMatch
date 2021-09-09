//----------------------------------------------------------------------------------
// View
//
// This class renders the visual components associated with the application 
// based upon the state of various models.
//
// State is fetched through getter methods passed into the constructor.
//
// At the moment, view code is spread across several files in a rough attempt
// at component modularity.  However, at runtime, all the code is coalesced
// under the same View namespace.
//----------------------------------------------------------------------------------
// TODO: Consider splitting this code into separate component classes aggregated by
//       by the View.  
//
//       This aligns better with the notion of an MVC app consisting of many 
//       smaller-MVCs, enabling more resilience to change and scalability.
//
// TODO: Allow the view to subscribe to model-state changes.  
//
//       Currently the controller shoulders responsibility for keeping the view 
//       synchronized with the models.  Eventually the view will include render()
//       methods that can be registered with and invoked by the models in response
//       to state changes therein.
//----------------------------------------------------------------------------------

function View(
  bodyDivId,
  fabModel,
  addMenuDrawerEventListeners,
  addHeaderEventListeners,
  addLandingPageEventListeners,
  addPrioritiesPageEventListeners,
  addResultsPageEventListeners,
  addSettingsPageEventListeners,
  cityRankModelCB,
  minHappinessValue,
  maxHappinessValue,
  minAffordabilityValue,
  maxAffordabilityValue,
  minPoliticsValue,
  maxPoliticsValue,
  getSketchyQuartile,
  hasPersistedSettings,
  hasPersistedFAB,
  hasPersistedPriorities,
  t,
  getLangName,
  getLangOptionsMap,
  getCountryName,
  getCountryOptionsMap,
  getCurrency,
  githubUrl,
  getMaxResults,
  getMaxResultsOptions,
  getLocale,
  getCountryCode,
  getAffordabilityValue,
  getHappinessValue,
  getPoliticsValue,
  getAffordabilityEnabled,
  getHappinessEnabled,
  getPoliticsEnabled,
  getJobSearchEnabled,
  getNormalizedPriorities,
  hasNoPriorities,
  getActiveDataView,
  getRankedList,
  checkInternet,
  getOnlineStatus
) {

  this.fabModel = fabModel

  // Bind to LocalPersistence interface.
  this.hasPersistedSettings = hasPersistedSettings
  this.hasPersistedFAB = hasPersistedFAB
  this.hasPersistedPriorities = hasPersistedPriorities

  // Bind to Translation (t9n) interface.
  this.t = t
  this.getLangName = getLangName
  this.getLangOptionsMap = getLangOptionsMap
  this.getCountryName = getCountryName
  this.getCountryOptionsMap = getCountryOptionsMap
  this.getCurrency = getCurrency

  // Bind to SettingsModel interface.
  this.getMaxResults = getMaxResults
  this.getMaxResultsOptions = getMaxResultsOptions
  this.getLocale = getLocale
  this.getCountryCode = getCountryCode

  // Bind to PriorityModel interface.
  this.getAffordabilityValue = getAffordabilityValue
  this.getHappinessValue = getHappinessValue
  this.getPoliticsValue = getPoliticsValue
  this.getAffordabilityEnabled = getAffordabilityEnabled
  this.getHappinessEnabled = getHappinessEnabled
  this.getPoliticsEnabled = getPoliticsEnabled
  this.getJobSearchEnabled = getJobSearchEnabled
  this.getNormalizedPriorities = getNormalizedPriorities
  this.hasNoPriorities = hasNoPriorities

  // Bind to ResultsModel interface.
  this.getActiveDataView = getActiveDataView
  this.getRankedList = getRankedList

  // Bind to network interface.
  this.checkInternet = checkInternet
  this.getOnlineStatus = getOnlineStatus

  this.bodyDivId = bodyDivId
  this.rankedList = []
  this.addMenuDrawerEventListeners = addMenuDrawerEventListeners
  this.addHeaderEventListeners = addHeaderEventListeners
  this.addLandingPageEventListeners = addLandingPageEventListeners
  this.addPrioritiesPageEventListeners = addPrioritiesPageEventListeners
  this.addResultsPageEventListeners = addResultsPageEventListeners
  this.addSettingsPageEventListeners = addSettingsPageEventListeners

  this.cityRankModelCB = cityRankModelCB
  this.minHappinessValue = minHappinessValue
  this.maxHappinessValue = maxHappinessValue
  this.minAffordabilityValue = minAffordabilityValue
  this.maxAffordabilityValue = maxAffordabilityValue
  this.getSketchyQuartile = getSketchyQuartile

  this.githubUrl = githubUrl

  let locale = getLocale()
  let currency = getCurrency(getCountryCode())

  // TODO: Make sensitive to locale and locale changes.
  //       For now, just hardcode for en-US number formatting and USD.
  //       Implication is we need a new formatter when changing
  //       locale or currency from the settings page.

  this.formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  })

  this.resultsMain = undefined
}

View.prototype.render = function() {
  let page = this.fabModel.getCurrPage()
  this.createPageBody(page)
}

View.prototype.resetBody = function() {

  // Explicitly remove /all/ the nodes under body and then recreate the top
  // body <div> off of which the rest of the application's DOM nodes hang.
  //
  // Otherwise, MDL keeps inserting .mdl-layout__container <div>'s between
  // the body and the application's <div> with each new page render.  Guessing
  // this is related to a work-around for getting the mdl menu to work
  // (by downgrading / upgrading MDL elements).
  //
  // TODO: Maybe there is a more elegant way to do this.
  //
  //       Really, we could create singletons for each page DOM-tree with app-session
  //       lifetimes and just show/hide them as necessary.  Should see a nice performance
  //       boost.  Will need this for responsive desktop layout where several
  //       pages/components may be visible concurrently.

  this.removeChildNodes(document.body)

  let bodyDiv = document.createElement("div")
  bodyDiv.setAttribute("id", `${this.bodyDivId}`)
  bodyDiv.setAttribute("class", "body__div mdl-layout mdl-js-layout")

  document.body.appendChild(bodyDiv)
  bodyDiv.innerHTML = ""
}

View.prototype.createPageBody = function(page) {
  this.resetBody()

  switch(page) {
    case "landing":
      this.createLandingBody()
      break
    case "settings":
      this.createSettingsBody()
      break
    case "priorities":
      this.createPrioritiesBody()
      break
    case "results":
      this.createResultsBody()
      break
    default:
      console.log("View.createPageBody().  Unrecognized page:", page, " ",
                  "Default to landing page")
      this.createLandingBody()
  }
}

// Pages associated with the application are constructed in real-time and anchored
// off a single parent <div> as the user navigates from page to page.
//
// The following primitive is for removing obsolete nodes and associated event 
// handlers between page transitions.
//
// Simply clearing innerHTML doesn't suffice since it doesn't remove event handlers.
// You may otherwise end up with nuisance/duplicate event handlers responding to the
// same event.

View.prototype.removeChildNodes = function(parentNode) {
  if (parentNode) {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }
  }
}

// Some view models maintain ascii icons (since models are inherently more abstract).
// This routine allows the view to map those to an actual icon.
//
// Most of the actual icons are pulled from Google's Material Icons.
// See: https://fonts.google.com/icons

View.prototype.getIconFromAsciiIcon = function(asciiIcon) {
  let bugIcon = "pest_control" // Flag unknown asciiIcons with a bug icon.
  let realIcon = bugIcon

  switch(asciiIcon) {
    // Used by floating action button (FAB).
    case "<":
      realIcon = "navigate_before"
      break
    case ">":
      realIcon = "navigate_next"
      break
    case "city":
      realIcon = "location_city"
      break
    case "sliders":
      realIcon = "tune"
      break
    case "welcome":
      realIcon = "emoji_people"
      break
    default:
      console.log("View.getIconFromAsciiIcon: Unrecognized asciiIcon:", asciiIcon)
  }
  return realIcon
}

View.prototype.createFooter = function() {
  let appName = this.t('AppName')
  let copyrightDate = this.t('AppCopyrightDate')
  let fabHTML = this.createFAB()

  f = document.createElement("footer")
  f.classList.add("mdl-mini-footer")
  f.innerHTML = `
      ${fabHTML}
      <div class="mdl-mini-footer__left-section"><span class="copyright-text">
        <i class="material-icons footer-icons">location_city</i>
        <i class="material-icons footer-icons" style="position:relative; left:-0.5em">favorite</i>
        <span class="copyright-text" style="position:relative; left:-1.5em">${appName} &copy; ${copyrightDate}</span>
      </div>
      <div class="mdl-mini-footer__right-section">
        <a href="${this.githubUrl}" target="_blank" title="github" ref="noreferrer noopener">
          <button id="button-octocat" class="mdl-button mdl-js-button mdl-js-ripple-effect">
            <i id="footer-icon-octocat" class="fab fa-github-square" aria-hidden="true"></i>
          </button>
        </a>
      </div>
    `
  return f
}
