//----------------------------------------------------------------------------------
// Controller
//
// This class instantiates the models and view associated with this simple,
// single-user, front-end web app.  All the code runs on the client after initial
// download from the server.  Persistence of state is intended to happen on the 
// client (see TODO's below).
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

  // Get network status at object creation-time.
  //
  // We may want to set this up on an interval, but for now, we just check at
  // a few significant junctures in the code-flow.
  //
  // Check inet status early since this impacts how we interpret
  // persisted settings that drive the model.

  this.isOnline = 'unknown'
  this.checkInternet("", this.setOnlineStatus.bind(this))

  this.cache = new LocalStorage()

  // Instantiate domain model.

  this.cities = new ModelCities()

  // Instantiate view models.

  // The following 3 methods, needed by the Settings view-model constructor,
  // function as class methods from the translation model (t9n) which we
  // haven't instantiated yet.
  //
  // We can't instatiate the t9n object prior because /that/ constructor has
  // a dependency upon the getLocale getter which comes from an instantiated
  // settings object.
  //
  // So we have something of a circular dependency here between Settings and Translation
  // view-models.  One way out of this circumstance is to treat these t9n methods
  // as 'class' methods, which avoids the need to instantiate a t9n object.  Since
  // I'm not using ES6 class semantics and the static key word, I simply reference the
  // methods out of the prototype of ModelT9n.

  let isValidLocale = ModelT9n.prototype.isValidLocale
  let isValidLocaleProperty = ModelT9n.prototype.isValidLocaleProperty
  let isValidCountryCode = ModelT9n.prototype.isValidCountryCode

  let maxResults = 10
  let countryCode = "US"
  this.settings = new ModelSettings(
      locale,
      isValidLocale,
      this.cities.getNumCities(),
      maxResults,
      countryCode,
      isValidCountryCode)

  if (this.cache.hasSettings()) {
    // Update current settings state from cached settings.

    let persistedSettings = this.cache.getSettings()
    this.settings.set(persistedSettings)
  }
  let getSettingsLocale = this.settings.getLocale.bind(this.settings)

  // Instantiate translation (t9n) object.
  this.t9n = new ModelT9n(getSettingsLocale)

  this.priorities = new ModelPriorities(
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

  this.results = new ModelResults(
    this.cities.isValidCityList,
    "photo-view"
  )
  if (this.cache.hasResults()) {
    // Update results state from cached settings.

    // TODO: Enforce inet check before attempting to restore
    //       to possibly inet-down disabled view.
    let persistedResults = this.cache.getResults()
    this.results.set(persistedResults)
  }

  this.FAB = new ModelFAB(getSettingsLocale, isValidLocaleProperty)
  if (this.cache.hasFAB()) {
    // Update current fab state from cached settings.

    let persistedFAB = this.cache.getFAB()
    this.FAB.set(persistedFAB)
  }

  this.delegatedHandlers = this.ManagedEventHandlers.getSingleton()


  // Instantiate view, passing in state getters from models.
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
    this.checkInternet.bind(this),
    this.getOnlineStatus.bind(this)
  )

  // Avoid content clipping especially on iOS if device is rotated 90 deg.

  this.ManageOrientationChange()
  this.view.render()
}
