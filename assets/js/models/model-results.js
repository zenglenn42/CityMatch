//----------------------------------------------------------------------------------
// ModelResults
//
// This class maintains state related to the results page.
//
// It exports getters for use by the view and setters for use by the controller.
//----------------------------------------------------------------------------------
// TODO: Make this observable (in the software patterns sense).
//----------------------------------------------------------------------------------

function ModelResults(isValidCityListFn, dataView, rankedList) {

  // Validate required input parameters.

  if (!isValidCityListFn || typeof isValidCityListFn !== 'function') {
    throw('ModelResults: Failed constructor.  Invalid isValidCityList fn parameter')
  }
  this.isValidCityListFn = isValidCityListFn

  this.dfltDataView = "photo-view" // photo-view | table-view | chart-view | map-view
                                   // TODO: This should always default to a view which can't
                                   //       be disabled.  We want graceful fallback to this if
                                   //       persisted data-view corresponds to currently disabled
                                   //       view.
  this.activeDataView = (this.isValidDataView(dataView)) ? dataView : this.dfltDataView

  this.dfltRankedList = []

  // TODO: Integrate with controller and view.
  this.rankedList = (rankedList) ? rankedList : this.dfltRankedList
  this.rankedList = (this.isValidCityListFn(this.rankedList)) ? this.rankedList : this.dfltRankedList

}

// TODO: Change to enumerated types when javascript or I get smarter.
//       Really, I just want static const enumerated type associated
//       with a class, but that still seems to require hoop-jumping in js.
//       Maybe TypeScript is the answer.
//
//       Settling for strings with guard-rails as expedient proxy for now.

ModelResults.prototype.isValidDataView = function(dataView) {
  return dataView === "photo-view" ||
      // dataView === "list-view"  ||
         dataView === "table-view" ||
         dataView === "chart-view" ||
         dataView === "map-view"
}

ModelResults.prototype.isValidDisabledDataView = function(dataView) {
  return dataView === "photo-view-disabled" ||
      // dataView === "list-view-disabled"  ||
         dataView === "table-view-disabled" ||
         dataView === "chart-view-disabled" ||
         dataView === "map-view-disabled"
}

ModelResults.prototype.getActiveDataView = function() {
  return this.activeDataView
}

ModelResults.prototype.setActiveDataView = function(dataView) {
  let result = false
  if (this.isValidDataView(dataView)) {
    this.activeDataView = dataView
    result = true
  } else {
    // Sometimes we disable a data view because inet is down.
    // Detect for that versus an error condition.
    if (!this.isValidDisabledDataView(dataView)) {
      console.log('[Info] ModelResults.setActiveDataView.  Ignoring invalid dataView:', dataView)
    }
  }
  return result
}

ModelResults.prototype.restoreDefaults = function() {
  this.activeDataView = this.dfltDataView
  this.rankedList = this.dfltRankedList
}

ModelResults.prototype.get = function() {
  // TODO: Add optional schema version as input to validate what props are expected.

  let result = {
    activeDataView: this.getActiveDataView()
  }
  return result
}

ModelResults.prototype.set = function(jsonObj) {
  if (jsonObj) {
    // TODO: Add schema version to validate what props and prop naming we /expect/.

    let props = (typeof jsonObj === 'object') ? jsonObj : JSON.parse(jsonObj)

    // Validate incoming json before mutating state.  Default to current state if invalid input.

    // Disallow setting the active view to a view if it is currently disabled by
    // temporary circumstances (like inet being down).

    let activeDataView = (
      props.hasOwnProperty('activeDataView')
      && (this.isValidDataView(props.activeDataView) &&
          !this.isValidDisabledDataView(props.activeDataView)))
                      ? props.activeDataView
                      : (this.isValidDataView(this.getActiveDataView()) &&
                         !this.isValidDisabledDataView(this.getActiveDataView()))
                            ? this.getActiveDataView()
                            : this.dfltDataView

    this.setActiveDataView(activeDataView)
  } else {
    console.log("[Info] ModelResults.set(json): Ignoring set, json parameter is undefined.")
  }
}

ModelResults.prototype.getRankedList = function() {
  return this.rankedList
}

ModelResults.prototype.setRankedList = function(list) {
  let result = false
  if (this.isValidCityListFn(list)) {
    this.rankedList = list
    result = true
  } else {
    console.log('[Info] ModelResults.setRankedList.  Ignoring invalid list:', JSON.stringify(list, null, 2))
  }
  return result
}

//----------------------------------------------------------------------------------
// Unit Test
//----------------------------------------------------------------------------------
function UnitTestSchema(obj, expectedProperties) {
  // Is it time for Typescript or 3rd party test harness? :-)
  let failedProperties = expectedProperties.map((propertyExpr) => {
    let failure = ""

    // Does property exist in object?

    let property = propertyExpr.split(":")[0]
    failure = (!obj.hasOwnProperty(property)) ? `Missing property: ${property}\n` : ''

    // Is it of the expected type?

    let parsed = undefined
    let typeFailure = ""
    let type = propertyExpr.split(":")[1]
    let value = obj[property]
    if (!failure && type) {
      switch(type) {
        case 'integer':
          // NB: This will identify 'string' integers as integers.
          parsed = parseInt(value)
          if (isNaN(parsed)) {
            typeFailure = `Expecting type: ${property}:${type}\n`
          }
          break
        case 'float':
          // NB: This will identify 'string' floats as floats.
          parsed = parseFloat(value)
          if (isNaN(parsed)) {
            typeFailure = `Expecting type: ${property}:${type}\n`
          }
          break
        case 'object':
          if (!value || typeof value !== 'object' || value.constructor !== Object) {
            typeFailure = `Expecting type: ${property}:${type}\n`
          }
          break
        case 'array':
          if (!Array.isArray(value)) {
            typeFailure = `Expecting type: ${property}:${type}\n`
          }
          break
        case 'string':
          if (typeof value !== 'string') {
            typeFailure = `Expecting type: ${property}:${type}\n`
          }
          break

        default:
          typeFailure = `Unknown type: ${property}:${type}\n`
      }
      failure = typeFailure
    }
    return failure
  }).filter((failureStr) => { return failureStr })

  let reducerReportFailures = (accumulator, currentValue, currentIndex) => {
    if (!accumulator) {
      accumulator = " Failure with these properties: \n"
    }
    accumulator += `  ${currentIndex + 1}. ${currentValue} \n`
    return accumulator
  }

  failures = failedProperties.reduce(reducerReportFailures, "")
  return failures
}

function mkFailMsg(codeUnderTest, failStr) {
  let failMsg = `  [fail] ${codeUnderTest} \n  ${failStr}`
  return failMsg
}

function mkPassMsg(codeUnderTest, iterations) {
  let passMsg = ` [pass] ${codeUnderTest}`
  if (iterations) {
    passMsg += ` (${iterations} iterations)`
  }
  return passMsg
}

function UnitTestModelResults() {
  let cut = ""
  let failure = ""
  let errmsg = undefined
  let module = "model-results.js"
  let cityModel = new ModelCities() // For isValidCityList() validator.

  console.log('Starting unit tests for ' + module)
  console.log('----------------------------------------')

  console.log(' Instantiating model results object ...')

  // Test #1
  try {
    cut = "ModelResults(ctor)"
    console.log(' Verifying default object construction ...')
    let model = new ModelResults(() => {return "en-US"}, cityModel.isValidCityList)

    if (model.activeDataView !== model.dfltDataView ||
        JSON.stringify(model.rankedList) !== JSON.stringify([]) || 
        model.getLocale() !== 'en-US') {
        failure = "Expected properties of ['en-US', photo-view, []].  Got " +
                  JSON.stringify([model.getLocale(), model.activeDataView, model.rankedList])
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

  // Test #2
  failure = ""
  try {
    cut = "ModelResults(ctor) negative case"
    console.log(' Verifying object construction with invalid data-view ...')
    let model = new ModelResults(() => {return "en-US"}, 
                                 cityModel.isValidCityList, 
                                 "bogus-view")

    if (model.activeDataView !== model.dfltDataView ||
        JSON.stringify(model.rankedList) !== JSON.stringify([]) || 
        model.getLocale() !== 'en-US') {
        failure = "Expected properties of ['en-US', photo-view, []].  Got " +
                  JSON.stringify([model.getLocale(), model.activeDataView, model.rankedList])
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

  // Test #3
  failure = ""
  try {
    cut = "ModelResults(ctor)"
    console.log(' Verifying object construction with valid non-default data-view ...')
    let model = new ModelResults(() => {return "en-US"}, cityModel.isValidCityList, "table-view")

    if (model.activeDataView !== "table-view" ||
        JSON.stringify(model.rankedList) !== JSON.stringify([]) || 
        model.getLocale() !== 'en-US') {
        failure = "Expected properties of ['en-US','table-view', [],].  Got " +
                  JSON.stringify([model.getLocale(), model.activeDataView, model.rankedList])
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

  // Test #4
  failure = ""
  try {
    cut = "ModelResults.getRankedList()"
    console.log(' Verifying ability to get ranked list ...')
    let model = new ModelResults(() => {return "en-US"}, cityModel.isValidCityList)
    let rankedList = model.getRankedList()

    if (JSON.stringify(rankedList) !== JSON.stringify([])) {
        failure = "Expected rankedList of [].  Got " + JSON.stringify(rankedList)
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

  // Test #5
  failure = ""
  try {
    cut = "ModelResults.setRankedList()"
    console.log(' Verifying ability to set ranked list ...')
    let model = new ModelResults(() => {return "en-US"}, cityModel.isValidCityList)
    let dummyList = [
    {
      "Plano, TX": {
        affordability: 265300,
        happiness: 72.3,
        img: {
          imgAuthor: "Eric Fredericks",
          imgLic: "(CC BY-SA 2.0)",
          imgSrc:
            "https://upload.wikimedia.org/wikipedia/commons/2/29/Legacy_town_center_plano.jpg"
        },
        location: {
          lat: 33.0198431,
          lng: -96.6988856
        },
        politics: {
          dem16_frac: 39.22001430394481,
          rep16_frac: 56.20468664544448
        }
      }
    },
    {
      "Irvine, CA": {
        affordability: 620500,
        happiness: 71.86,
        img: {
          imgAuthor: "Poppashoppa22",
          imgLic: "(CC BY-SA 3.0)",
          imgSrc:
            "https://upload.wikimedia.org/wikipedia/commons/a/a8/Campus_of_the_University_of_California%2C_Irvine_%28aerial_view%2C_circa_2006%29.jpg"
        },
        location: {
          lat: 33.6845673,
          lng: -117.8265049
        },
        politics: {
          dem16_frac: 50.96015441583128,
          rep16_frac: 43.28010943892407
        }
      }
    }]

    model.setRankedList(dummyList)
    let rankedList = model.getRankedList()

    if (JSON.stringify(rankedList) !== JSON.stringify(dummyList)) {
        failure = "Expected rankedList of " + JSON.stringify(dummyList) + 
                  " Got " + JSON.stringify(rankedList)
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

} // End UnitTest
