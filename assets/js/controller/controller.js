//----------------------------------------------------------------------------------
// Controller
//
// This class instantiates the models and view associated with this simple,
// single-user, front-end web app.  All the code runs on the client after initial
// download from the server.
//
// State is managed within model objects and read or written via getter and 
// setter methods.  The business logic of ranking cities based upon user priorities
// is embodied within the cities model.
//
// The view binds to model-state getters passed in through the view constructor,
// allowing it to read state and visually update the browser window accordingly.
//
// The controller binds to model-state setters through composition,
// allowing it to mutate state in response to user-input events such as mouse clicks 
// or touch-screen activity.
//----------------------------------------------------------------------------------
// TODO: Allow the view to subscribe to model-state changes.
//
//       Currently the controller shoulders responsibility for keeping the view
//       synchronized with the models.
//----------------------------------------------------------------------------------

function Controller(bodyDivId, locale = "en-US") {

  this.networkConnection = this.ManageNetworkConnection.getSingleton()
  this.networkConnection.checkInternet()

  this.cache = new LocalStorage()  // Persisted state from last session.
  this.cities = new ModelCities()  // Domain model with business logic.

  let isValidLocale = ModelT9n.prototype.isValidLocale
  let isValidLocaleProperty = ModelT9n.prototype.isValidLocaleProperty
  let isValidCountryCode = ModelT9n.prototype.isValidCountryCode
  let maxResults = 10
  let countryCode = "US"
  this.settings = new ModelSettings(          // Settings view-model
      locale,
      isValidLocale,
      this.cities.getNumCities(),
      maxResults,
      countryCode,
      isValidCountryCode)

  if (this.cache.hasSettings()) {
    let persistedSettings = this.cache.getSettings()
    this.settings.set(persistedSettings)
  }
  let getSettingsLocale = this.settings.getLocale.bind(this.settings)

  this.t9n = new ModelT9n(getSettingsLocale)  // Multi-lang view-model

  this.priorities = new ModelPriorities(      // User priorities view-model
    this.cities.getMidAffordabilityValue(),
    this.cities.getMidHappinessValue(),
    this.cities.getMidPoliticsValue(),
    this.cities.getAffordabilityRange(),
    this.cities.getHappinessRange(),
    this.cities.getPoliticsRange()
  )
  if (this.cache.hasPriorities()) {
    // Update current priorities state from cached settings.
    let persistedPriorities = this.cache.getPriorities()
    this.priorities.set(persistedPriorities)
  }

  this.results = new ModelResults(            // Results view-model
    this.cities.isValidCityList,
    "photo-view"
  )
  if (this.cache.hasResults()) {
    // TODO: Enforce inet check before attempting to restore
    //       to possibly inet-down disabled view.
    let persistedResults = this.cache.getResults()
    this.results.set(persistedResults)
  }

  this.FAB = new ModelFAB(                    // Floating Action Button view-model
        getSettingsLocale,
        isValidLocaleProperty)
  if (this.cache.hasFAB()) {
    let persistedFAB = this.cache.getFAB()
    this.FAB.set(persistedFAB)
  }

  this.delegatedHandlers = this.ManageEventHandlers.getSingleton()
  this.ManageOrientationChange()

  this.view = new View(
    bodyDivId,
    this.FAB,
    this.getMenuDrawerEventListeners().bind(this),
    this.getHeaderEventListeners().bind(this),
    this.getLandingPageEventListeners().bind(this),
    this.getPrioritiesPageEventListeners().bind(this),
    this.getResultsPageEventListeners().bind(this),
    this.getSettingsPageEventListeners().bind(this),
    this.cities.getCityRankCB().bind(this.cities),
    this.cities.getMinHappinessValue(),
    this.cities.getMaxHappinessValue(),
    this.cities.getMinAffordabilityValue(),
    this.cities.getMaxAffordabilityValue(),
    this.cities.getMinPoliticsValue(),
    this.cities.getMaxPoliticsValue(),
    this.cities.getSketchyQuartile.bind(this.cities),
    this.cache.hasSettings.bind(this.cache),
    this.cache.hasFAB.bind(this.cache),
    this.cache.hasPriorities.bind(this.cache),
    this.t9n.t.bind(this.t9n),  // translates static strings into locale language
    this.t9n.getLangName.bind(this.t9n),
    this.t9n.getLangOptionsMap.bind(this.t9n),
    this.t9n.getCountryName.bind(this.t9n),
    this.t9n.getCountryOptionsMap.bind(this.t9n),
    this.t9n.getCurrency.bind(this.t9n),
    this.settings.githubUrl,
    this.settings.getMaxResults.bind(this.settings),
    this.settings.getMaxResultsOptions.bind(this.settings),
    getSettingsLocale,
    this.settings.getCountryCode.bind(this.settings),
    this.priorities.getAffordabilityValue.bind(this.priorities),
    this.priorities.getHappinessValue.bind(this.priorities),
    this.priorities.getPoliticsValue.bind(this.priorities),
    this.priorities.getAffordabilityEnabled.bind(this.priorities),
    this.priorities.getHappinessEnabled.bind(this.priorities),
    this.priorities.getPoliticsEnabled.bind(this.priorities),
    this.priorities.getJobSearchEnabled.bind(this.priorities),
    this.priorities.getNormalizedPriorities.bind(this.priorities),
    this.priorities.hasNoPriorities.bind(this.priorities),
    this.results.getActiveDataView.bind(this.results),
    this.results.getRankedList.bind(this.results),
    this.networkConnection
  )

  this.view.render()
}
