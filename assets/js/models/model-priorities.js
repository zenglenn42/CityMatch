//----------------------------------------------------------------------------------
// ModelPriorities
//
// This class maintains state related to the user's current priorities when it
// comes to ranking a city's desirability.
//
// It exports getters for use by the view and setters for use by the controller.
//----------------------------------------------------------------------------------
// TODO: Make this observable (in the software patterns sense).
//----------------------------------------------------------------------------------

function ModelPriorities(affordabilityValue,
                         happinessValue,
                         politicsValue,
                         affordabilityRange,
                         happinessRange,
                         politicsRange,
                         affordabilityEnabled = true,
                         happinessEnabled = true,
                         politicsEnabled = true,
                         jobSearchEnabled = false) {

  if (!this.isValidRange(affordabilityRange)) {
    throw('ModelPriorities: Failed constructor.  Invalid affordabilityRange input parameter')
  }

  if (!this.isValidRange(happinessRange)) {
    throw('ModelPriorities: Failed constructor.  Invalid happinessRange input parameter')
  }

  if (!this.isValidRange(politicsRange)) {
    throw('ModelPriorities: Failed constructor.  Invalid politicsRange input parameter')
  }
  
  //------------------------------------
  // Desired affordability
  //------------------------------------

  // Specify a range of valid values for this attribute along with a
  // desired target value.  Initial value defaults to range midpoint.

  this.affordabilityRange = affordabilityRange
  this.dfltAffordabilityValue = Math.round((this.affordabilityRange.min + this.affordabilityRange.max) / 2)
  this.affordabilityValue = this.isValidAffordabilityValue(affordabilityValue, this.affordabilityRange) ? 
                              affordabilityValue : this.dfltAffordabilityValue

  // Specify if this attribute should contribute to the city ranking algorithm.
  //
  // TODO: Replace this with a quantized weighting factor that reflects the
  //       graded importance of this attribute to the user ranging from
  //       'not important' to 'very important'.

  this.dfltAffordabilityEnabled = true
  this.affordabilityEnabled = this.isBoolean(affordabilityEnabled) ?
                                affordabilityEnabled : this.dfltAffordabilityEnabled

  //------------------------------------
  // Desired civic happiness
  //------------------------------------

  // Based upon a 3rd party survey of cities in the U.S.

  // Specify a range of valid values for this attribute along with a
  // desired target value.  Initial value defaults to range midpoint.

  this.happinessRange = happinessRange
  this.dfltHappinessValue = Math.round((happinessRange.min + happinessRange.max) / 2)
  this.happinessValue = this.isValidHappinessValue(happinessValue, this.happinessRange) ?
                              happinessValue : this.dfltHappinessValue

  // Specify if this attribute contributes to the city ranking algorithm.
  //
  // TODO: Replace this with a quantized weighting factor that reflects the
  //       graded importance of this attribute to the user ranging from
  //       'not important' to 'very important'.

  this.dfltHappinessEnabled = true
  this.happinessEnabled = this.isBoolean(happinessEnabled) ? happinessEnabled : this.dfltHappinessEnabled

  //------------------------------------
  // Desired prevailing politics
  //------------------------------------

  // Based upon 2016 voter data in a national election,
  // approximating a liberal-to-conservative scale.

  // Specify a range of valid values for this attribute along with a
  // desired target value.  Initial value defaults to range midpoint.

  this.politicsRange = politicsRange  // Expressed as percentage.
  this.dfltPoliticsValue = { rep16_frac: 50, dem16_frac: 50 }
  this.politicsValue = this.isValidPoliticsValue(politicsValue, this.politicsRange) ?
                          politicsValue : this.dfltPoliticsValue

  // Specify if this attribute contributes to the city ranking algorithm.
  //
  // TODO: Replace this with a quantized weighting factor that reflects the
  //       graded importance of this attribute to the user ranging from 
  //       'not important' to 'very important'.

  this.dfltPoliticsEnabled = true
  this.politicsEnabled = this.isBoolean(politicsEnabled) ? politicsEnabled : this.dfltPoliticsEnabled

  //------------------------------------
  // Job search feature
  //------------------------------------

  // TODO: Add support for this Feature.  Disabled for now.

  this.dfltJobSearchEnabled = false
  this.jobSearchEnabled = this.isBoolean(jobSearchEnabled) ? false : false
}

ModelPriorities.prototype.getNormalizedPriorities = function() {

  // Marshall the user's current priorities into an object
  // suitable for making a request to rank a list of cities.

  let prioritiesJson = {}
  if (this.happinessEnabled) {
    prioritiesJson.happiness = parseInt(this.happinessValue)
  } else {
    prioritiesJson.happiness = NaN
  }
  if (this.affordabilityEnabled) {
    prioritiesJson.affordability = parseInt(this.affordabilityValue)
  } else {
    prioritiesJson.affordability = NaN
  }
  if (this.politicsEnabled) {
    prioritiesJson.politics = this.politicsValue
    prioritiesJson.politics.dem16_frac = parseInt(prioritiesJson.politics.dem16_frac)
    prioritiesJson.politics.rep16_frac = parseInt(prioritiesJson.politics.rep16_frac)
  } else {
    nanPolitics = { rep16_frac: NaN, dem16_frac: NaN }
    prioritiesJson.politics = nanPolitics
  }
  if (this.isNormalized(prioritiesJson)) {
    return prioritiesJson
  } else {
    throw('ModelPriorities: getNormalizedPriorities(). Result failed schema check.')
  }
}

ModelPriorities.prototype.hasNoPriorities = function(prioritiesJson) {

  // Detect if the user fails to specify any priorities.
  // Useful for creating guard-logic around requests for city ranking.

  if (!this.isNormalized(prioritiesJson)) {
    throw('ModelPriorities: hasNoPriorities(). Input failed schema check:' + JSON.stringify(prioritiesJson))
  }
  return (
    isNaN(prioritiesJson.happiness) &&
    isNaN(prioritiesJson.affordability) &&
    (isNaN(prioritiesJson.politics.rep16_frac) ||
     isNaN(prioritiesJson.politics.dem16_frac))
  )
}

ModelPriorities.prototype.isNormalized = function(prioritiesJson) {

  // Schema-check the input.  If it passes, it's suitable
  // for use in making requests of the city ranking algorithm.

  return typeof prioritiesJson === 'object' &&
         prioritiesJson.hasOwnProperty('happiness') &&
         prioritiesJson.hasOwnProperty('affordability') &&
         prioritiesJson.hasOwnProperty('politics') &&
         prioritiesJson.politics.hasOwnProperty('rep16_frac') &&
         prioritiesJson.politics.hasOwnProperty('dem16_frac')
}

ModelPriorities.prototype.restoreDefaults = function() {
  this.affordabilityValue = this.dfltAffordabilityValue
  this.happinessValue = this.dfltHappinessValue
  this.politicsValue = this.dfltPoliticsValue
  this.affordabilityEnabled = this.dfltAffordabilityEnabled
  this.happinessEnabled = this.dfltHappinessEnabled
  this.politicsEnabled = this.dfltPoliticsEnabled
  this.jobSearchEnabled = this.dfltJobSearchEnabled
}

ModelPriorities.prototype.isValidRange = function(range) {
  if (!range) return false
  return range.hasOwnProperty('min') &&
         range.hasOwnProperty('max') &&
         (typeof range.min === 'number') &&
         (typeof range.max === 'number')
}

ModelPriorities.prototype.isBoolean = function(value) {
  if (value === undefined) return false
  return (value === true || value === false)
}

ModelPriorities.prototype.isValidAffordabilityValue = function(value, range) {
  let isNum = (typeof value === 'number')
  return (this.isValidRange(range) &&
         isNum && Number.isInteger(value) &&
         (value >= range.min && value <= range.max))
}

ModelPriorities.prototype.isValidHappinessValue = function(value, range) {
  let isNum = (typeof value === 'number')
  return (this.isValidRange(range) && isNum && Number.isInteger(value) &&
         (value >= range.min && value <= range.max))
}

ModelPriorities.prototype.isValidPoliticsValue = function(value, range) {
  let isObject = (typeof value) === 'object'
  return (this.isValidRange(range) &&
          isObject &&
          value.hasOwnProperty('rep16_frac') &&
          value.hasOwnProperty('dem16_frac') &&
          (typeof value.rep16_frac) === 'number' &&
          (typeof value.dem16_frac) === 'number' &&
          (value.rep16_frac >= range.min && value.rep16_frac <= range.max) &&
          (value.dem16_frac >= range.min && value.dem16_frac <= range.max) &&
          (value.rep16_frac + value.dem16_frac <= range.max))
}

ModelPriorities.prototype.getAffordabilityValue = function() {
  return this.affordabilityValue
}

ModelPriorities.prototype.setAffordabilityValue = function(value) {
  let result = false
  if (this.isValidAffordabilityValue(value, this.affordabilityRange)) {
    this.affordabilityValue = value
    result = true
  } else {
    console.log('[Info] ModelPriorities.setAffordabilityValue.  Ignoring invalid value:', value)
  }
  return result
}

ModelPriorities.prototype.getHappinessValue = function() {
  return this.happinessValue
}

ModelPriorities.prototype.setHappinessValue = function(value) {
  let result = false
  if (this.isValidHappinessValue(value, this.happinessRange)) {
    this.happinessValue = value
    result = true
  } else {
    console.log('[Info] ModelPriorities.setHappinessValue.  Invalid value:', value)
  }
  return result
}

ModelPriorities.prototype.getPoliticsValue = function() {
  return this.politicsValue
}

ModelPriorities.prototype.setPoliticsValue = function(value) {
  let result = false
  if (this.isValidPoliticsValue(value, this.politicsRange)) {
    this.politicsValue = value
    result = true
  } else {
    console.log('[Info] ModelPriorities.setPoliticsValue.  Invalid value:', value)
  }
  return result
}

ModelPriorities.prototype.getAffordabilityEnabled = function() {
  return this.affordabilityEnabled
}

ModelPriorities.prototype.setAffordabilityEnabled = function(value) {
  let result = false
  if (this.isBoolean(value)) {
    this.affordabilityEnabled = value
    result = true
  } else {
    console.log('[Info] ModelPriorities.setAffordabilityEnabled.  Invalid value:', value)
  }
  return result
}

ModelPriorities.prototype.getHappinessEnabled = function() {
  return this.happinessEnabled
}

ModelPriorities.prototype.setHappinessEnabled = function(value) {
  let result = false
  if (this.isBoolean(value)) {
    this.happinessEnabled = value
    result = true
  } else {
    console.log('[Info] ModelPriorities.setHappinessEnabled.  Invalid value:', value)
  }
  return result
}

ModelPriorities.prototype.getPoliticsEnabled = function() {
  return this.politicsEnabled
}

ModelPriorities.prototype.setPoliticsEnabled = function(value) {
  let result = false
  if (this.isBoolean(value)) {
    this.politicsEnabled = value
    result = true
  } else {
    console.log('[Info] ModelPriorities.setPoliticsEnabled.  Invalid value:', value)
  }
  return result
}

ModelPriorities.prototype.getJobSearchEnabled = function() {
  return this.jobSearchEnabled
}

ModelPriorities.prototype.setJobSearchEnabled = function(value) {
  let result = false
  console.log('[Info] ModelPriorities.setJobSearchEnabled. Feature disabled. Ignoring request.')
  /* TODO: Re-enable this once this feature is supported.
  if (this.isBoolean(value)) {
    this.jobSearchEnabled = value
    result = true
  } else {
    console.log('[Info] ModelPriorities.setJobSearchEnabled.  Invalid value:', value)
  }
  */
  return result
}

ModelPriorities.prototype.get = function() {
  // TODO: Add optional schema version as input to validate what props are expected.

  let result = {
    happinessValue: this.getHappinessValue(),
    happinessEnabled: this.getHappinessEnabled(),

    affordabilityValue: this.getAffordabilityValue(),
    affordabilityEnabled: this.getAffordabilityEnabled(),

    politicsValue: this.getPoliticsValue(),
    politicsEnabled: this.getPoliticsEnabled(),
  }
  return result
}

// The use-case for this method is initialization from persisted state.

ModelPriorities.prototype.set = function(jsonObj) {
  if (jsonObj) {
    // TODO: Add schema version to validate what props and prop naming we /expect/.

    let props = (typeof jsonObj === 'object') ? jsonObj : JSON.parse(jsonObj)

    // Validate incoming json before mutating state.  Default to current state if invalid input.

    let happinessValue = (props.hasOwnProperty('happinessValue') && 
                     this.isValidHappinessValue(props.happinessValue, this.happinessRange)) 
                        ? props.happinessValue 
                        : (this.isValidHappinessValue(this.getHappinessValue(), this.happinessRange)
                            ? this.getHappinessValue()
                            : this.dfltHappinessValue)

    let happinessEnabled = 
                    (props.hasOwnProperty('happinessEnabled') && 
                     this.isBoolean(props.happinessEnabled))
                        ? props.happinessEnabled 
                        : (this.isBoolean(this.getHappinessEnabled())
                            ? this.getHappinessEnabled()
                            : this.dfltHappinessValue)

    let affordabilityValue = (props.hasOwnProperty('affordabilityValue') && 
                     this.isValidAffordabilityValue(props.affordabilityValue, this.affordabilityRange)) 
                        ? props.affordabilityValue 
                        : (this.isValidAffordabilityValue(this.getAffordabilityValue(), this.affordabilityRange)
                            ? this.getAffordabilityValue()
                            : this.dfltAffordabilityValue)

    let affordabilityEnabled = 
                    (props.hasOwnProperty('affordabilityEnabled') && 
                     this.isBoolean(props.affordabilityEnabled))
                        ? props.affordabilityEnabled 
                        : (this.isBoolean(this.getAffordabilityEnabled())
                            ? this.getAffordabilityEnabled()
                            : this.dfltAffordabilityValue)

    let politicsValue = (props.hasOwnProperty('politicsValue') && 
                     this.isValidPoliticsValue(props.politicsValue, this.politicsRange)) 
                        ? props.politicsValue 
                        : (this.isValidPoliticsValue(this.getPoliticsValue(), this.politicsRange)
                            ? this.getPoliticsValue()
                            : this.dfltPoliticsValue)

    let politicsEnabled = 
                    (props.hasOwnProperty('politicsEnabled') && 
                     this.isBoolean(props.politicsEnabled))
                        ? props.politicsEnabled 
                        : (this.isBoolean(this.getPoliticsEnabled())
                            ? this.getPoliticsEnabled()
                            : this.dfltPoliticsValue)

   this.setHappinessValue(happinessValue)
   this.setAffordabilityValue(affordabilityValue)
   this.setPoliticsValue(politicsValue)

   this.setHappinessEnabled(happinessEnabled)
   this.setAffordabilityEnabled(affordabilityEnabled)
   this.setPoliticsEnabled(politicsEnabled)
  } else {
    console.log("[Info] ModelPriorities.set(json): Ignoring set, json parameter is undefined.")
  }
}

//----------------------------------------------------------------------------------
// Unit Test
//----------------------------------------------------------------------------------

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

function UnitTestModelPriorities() {
  let cut = ""
  let failure = ""
  let errmsg = undefined
  let module = "model-priorities.js"

  console.log('Starting unit tests for ' + module)
  console.log('----------------------------------------')

  console.log(' Instantiating model priorities object ...')

  let testAffordability = 100000
  let testHappiness = 50
  let testPolitics = { rep16_frac: 40, dem16_frac: 60 }
  let testAffordabilityRange = {min: 82500, max: 927400}
  let testHappinessRange = {min: 29, max: 73}
  let testPoliticsRange = {min: 0, max: 100}
  let testAffordabilityEnabled = true
  let testHappinessEnabled = true
  let testPoliticsEnabled = true
  let testJobSearchEnabled = true

  let priorities = new ModelPriorities(
                          () => {return "en-US"},
                          testAffordability, 
                          testHappiness, 
                          testPolitics,
                          testAffordabilityRange,
                          testHappinessRange,
                          testPoliticsRange,
                          testAffordabilityEnabled, 
                          testHappinessEnabled, 
                          testPoliticsEnabled, 
                          testJobSearchEnabled)

  // Test #1
  try {
    cut = "ModelPriorities(ctor)"
    console.log(' Verifying object construction ...')

    if (priorities.affordabilityValue !== testAffordability) {
      failure = "Expected affordabilityValue == " + testAffordability + "  Got " + priorities.affordabilityValue
    } else if (priorities.happinessValue !== testHappiness) {
      failure = "Expected happinessValue == " + testHappiness + "  Got " + priorities.happinessValue
    } else if (JSON.stringify(priorities.politicsValue) !== JSON.stringify(testPolitics)) {
      failure = "Expected politicsValue == " + JSON.stringify(testPolitics) + "  Got " + JSON.stringify(priorities.politicsValue)
    } else if (JSON.stringify(priorities.affordabilityRange) !== JSON.stringify(testAffordabilityRange)) {
      failure = "Expected affordabilityRange == " + JSON.stringify(testAffordabilityRange) + "  Got " + JSON.stringify(priorities.affordabilityRange)
    } else if (JSON.stringify(priorities.happinessRange) !== JSON.stringify(testHappinessRange)) {
      failure = "Expected happinessRange == " + JSON.stringify(testHappinessRange) + "  Got " + JSON.stringify(priorities.happinessRange)
    } else if (priorities.affordabilityEnabled !== testAffordabilityEnabled) {
      failure = "Expected affordabilityEnabled == " + testAffordabilityEnabled + "  Got " + priorities.affordabilityEnabled
    } else if (priorities.happinessEnabled !== testHappinessEnabled) {
      failure = "Expected happinessEnabled == " + testHappinessEnabled + "  Got " + priorities.happinessEnabled
    } else if (priorities.politicsEnabled !== testPoliticsEnabled) {
      failure = "Expected politicsEnabled == " + testPoliticsEnabled + "  Got " + priorities.politicsEnabled
    } else if (priorities.jobSearchEnabled !== false) { // TODO: Replace 'false' with testJobSearchEnabled
                                                        //       once feature is implemented.
      failure = "Expected jobSearchEnabled == " + testJobSearchEnabled + "  Got " + priorities.jobSearchEnabled
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
    cut = "ModelPriorities.isValidRange()"

    console.log(' Verifying we can detect well-formed range objects ...')
    let goodRange = {min: 0, max: 100}
    if (!priorities.isValidRange(goodRange)) {
      failure = "Expected to pass with " + JSON.stringify(goodRange) + " but failed.\n"
    } 

    console.log(' Verifying we can detect range object with non-numeric value ...')
    let badRange1 = {min: 2, max: '3'}
    if (priorities.isValidRange(badRange1)) {
      failure += "Expected to fail on non-numeric max value, but passed with " + JSON.stringify(badRange1) + "\n"
    } 

    console.log(' Verifying we can detect range object with missing property ...')
    let badRange2 = {min: 2, madMax: 3}
    if (priorities.isValidRange(badRange2)) {
      failure += "Expected to fail on missing 'max' property, but passed with " + JSON.stringify(badRange2) + "\n"
    } 

    console.log(' Verifying we can detect missing/undefined range ...')
    let badRange3 = undefined
    if (priorities.isValidRange(badRange3)) {
      failure += "Expected to fail on undefined range, but passed"
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
    cut = "ModelPriorities.isBoolean()"
    console.log(' Verifying we can detect boolean parameters ...')

    if (!priorities.isBoolean(true)) {
      failure = "Expected to pass with 'true' but failed\n"
    } 
    if (!priorities.isBoolean(false)) {
      failure = "Expected to pass with 'false' but failed\n"
    } 
    if (priorities.isBoolean('bogus-string')) {
      failure = "Expected to fail with 'bogus-string' but passed\n"
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
    cut = "ModelPriorities.isValidAffordabilityValue()"

    console.log(' Verifying we can detect valid affordability values ...')
    //testAffordabilityRange = {min: 82500, max: 927400}
    let badValue1 = '500000' // should be a number, not a string
    if (priorities.isValidAffordabilityValue(badValue1, testAffordabilityRange)) {
      failure = "Expected to fail with string value but passed with " + badValue1 + "\n"
    } 

    console.log(' Verifying we can detect out of range minimum ...')
    let badValue2 = 82499 // out of range minimum
    if (priorities.isValidAffordabilityValue(badValue2, testAffordabilityRange)) {
      failure += "Expected to fail with out of range minimum but passed with " + badValue2 + "\n"
    } 

    console.log(' Verifying we can detect out of range maximum ...')
    let badValue3 = 927401 // out of range maximum
    if (priorities.isValidAffordabilityValue(badValue3, testAffordabilityRange)) {
      failure += "Expected to fail with out of range maximum but passed with " + badValue3 + "\n"
    } 

    console.log(' Verifying we can detect boundary minimum ...')
    let goodValue1 = 82500
    if (!priorities.isValidAffordabilityValue(goodValue1, testAffordabilityRange)) {
      failure += "Expected to pass with boundary minimum, but failed with " + goodValue1 + "\n"
    } 

    console.log(' Verifying we can detect boundary maximum ...')
    let goodValue2 = 927400
    if (!priorities.isValidAffordabilityValue(goodValue2, testAffordabilityRange)) {
      failure += "Expected to pass with boundary maximum, but failed with " + goodValue2 + "\n"
    } 

    console.log(' Verifying we can detect middling value ...')
    let goodValue3 = 500000
    if (!priorities.isValidAffordabilityValue(goodValue3, testAffordabilityRange)) {
      failure += "Expected to pass with middling value, but failed with " + goodValue3 
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
    cut = "ModelPriorities.isValidHappinessValue()"

    //testHappinessRange = {min: 29, max: 73}

    console.log(' Verifying we can detect invalid happiness type ...')
    let badValue1 = '50' // should be a number, not a string
    if (priorities.isValidHappinessValue(badValue1, testHappinessRange)) {
      failure = "Expected to fail with string value but passed with " + badValue1 + "\n"
    } 

    console.log(' Verifying we can detect out of range minimum ...')
    let badValue2 = 28 // out of range minimum
    if (priorities.isValidHappinessValue(badValue2, testHappinessRange)) {
      failure += "Expected to fail with out of range minimum but passed with " + badValue2 + "\n"
    } 

    console.log(' Verifying we can detect out of range maximum ...')
    let badValue3 = 74 // out of range maximum
    if (priorities.isValidHappinessValue(badValue3, testHappinessRange)) {
      failure += "Expected to fail with out of range maximum but passed with " + badValue3 + "\n"
    } 

    console.log(' Verifying we can detect boundary minimum ...')
    let goodValue1 = 29
    if (!priorities.isValidHappinessValue(goodValue1, testHappinessRange)) {
      failure += "Expected to pass with boundary minimum, but failed with " + goodValue1 + "\n"
    } 

    console.log(' Verifying we can detect boundary maximum ...')
    let goodValue2 = 73
    if (!priorities.isValidHappinessValue(goodValue2, testHappinessRange)) {
      failure += "Expected to pass with boundary maximum, but failed with " + goodValue2 + "\n"
    } 

    console.log(' Verifying we can detect middling value ...')
    let goodValue3 = 42
    if (!priorities.isValidHappinessValue(goodValue3, testHappinessRange)) {
      failure += "Expected to pass with middling value, but failed with " + goodValue3 
    } 

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }


  // Test #6
  failure = ""
  try {
    cut = "ModelPriorities.isValidPoliticsValue()"
    // typical politics value = { rep16_frac: 50, dem16_frac: 50 }
    let testPoliticsRange = {min: 0, max: 100}

    console.log(' Verifying we can detect invalid politics object ...')
    let badValue1 = { bogus_frac: 50, dem16_frac: 50 } // bad property name, should be rep16_frac
    if (priorities.isValidPoliticsValue(badValue1, testPoliticsRange)) {
      failure = "Expected to fail with bad property name but passed with " + JSON.stringify(badValue1) + "\n"
    } 

    console.log(' Verifying we can detect out of range minimum ...')
    let badValue2 = { rep16_frac: -1, dem16_frac: 50 } // out of range minimum
    if (priorities.isValidPoliticsValue(badValue2, testPoliticsRange)) {
      failure += "Expected to fail with out of range minimum but passed with " + badValue2 + "\n"
    } 

    console.log(' Verifying we can detect out of range maximum ...')
    let badValue3 = { rep16_frac: 0, dem16_frac: 101 } // out of range maximum
    if (priorities.isValidPoliticsValue(badValue3, testPoliticsRange)) {
      failure += "Expected to fail with out of range maximum but passed with " + badValue3 + "\n"
    } 

    console.log(' Verifying we can detect boundary minimum ...')
    let goodValue1 = { rep16_frac: 0, dem16_frac: 0 }
    if (!priorities.isValidPoliticsValue(goodValue1, testPoliticsRange)) {
      failure += "Expected to pass with boundary minimum, but failed with " + goodValue1 + "\n"
    } 

    console.log(' Verifying we can detect boundary maximum ...')
    let goodValue2 = { rep16_frac: 100, dem16_frac: 0 }
    if (!priorities.isValidPoliticsValue(goodValue2, testPoliticsRange)) {
      failure += "Expected to pass with boundary maximum, but failed with " + goodValue2 + "\n"
    } 

    console.log(' Verifying we fail for sum value > 100% ...')
    let badValue4 = { rep16_frac: 50, dem16_frac: 51 }
    if (priorities.isValidPoliticsValue(badValue4, testPoliticsRange)) {
      failure += "Expected to fail with total percentage > 100% but passed with " + JSON.stringify(badValue4) + "\n"
    } 

    console.log(' Verifying we pass with nominal value ...')
    let goodValue3 = { rep16_frac: 25, dem16_frac: 42 }
    if (!priorities.isValidPoliticsValue(goodValue3, testPoliticsRange)) {
      failure += "Expected to pass with nominal value, but failed with " + JSON.stringify(goodValue3)
    } 

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

  // Test #7
  failure = ""
  try {
    cut = "ModelPriorities.getAffordabilityValue() / *.setAffordabilityValue()"
    // affordabilityValue: 100000

    console.log(' Verifying we can get affordabilityValue ...')
    let testValue = priorities.getAffordabilityValue()
    if (testValue !== priorities.affordabilityValue) {
      failure = "Expected to get " + priorities.affordabilityValue + " but got " + testValue + "\n"
    } 

    console.log(' Verifying we can set / get affordabilityValue ...')
    testValue = 100001
    if (!priorities.setAffordabilityValue(testValue) || priorities.getAffordabilityValue() !== testValue) {
      failure = "Expected to set affordabilityValue to 100001 but got " + priorities.affordabilityValue + "\n"
    }

    console.log(' Verifying we cannot set affordabilityValue to something invalid...')
    let badValue = -1
    if (priorities.setAffordabilityValue(badValue)) {
      failure = "Expected to fail when setting affordabilityValue to an invalid number, but passed with " + priorities.affordabilityValue + "\n"
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

  // Test #8
  failure = ""
  try {
    cut = "ModelPriorities.getHappinessValue() / *.setHappinessValue()"
  
    // happinessValue: 50

    console.log(' Verifying we can get happinessValue ...')
    let testValue = priorities.getHappinessValue()
    if (testValue !== priorities.happinessValue) {
      failure = "Expected to get " + priorities.happinessValue + " but got " + testValue + "\n"
    } 

    console.log(' Verifying we can set / get happinessValue ...')
    testValue = 51
    if (!priorities.setHappinessValue(testValue) || priorities.getHappinessValue() !== testValue) {
      failure = "Expected to set happinessValue to 51 but got " + priorities.happinessValue + "\n"
    }

    console.log(' Verifying we cannot set happinessValue to something invalid...')
    let badValue = 28
    if (priorities.setHappinessValue(badValue)) {
      failure = "Expected to fail when setting happinessValue to out-of-range minimum number, but passed with " + priorities.happinessValue + "\n"
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

  // Test #9
  failure = ""
  try {
    cut = "ModelPriorities.getPoliticsValue() / *.setPoliticsValue()"
    // politicsValue: { dem16_frac: 60, rep16_frac: 40 }

    console.log(' Verifying we can get politicsValue ...')
    let testValue = priorities.getPoliticsValue()
    if (JSON.stringify(testValue) !== JSON.stringify(priorities.politicsValue)) {
      failure = "Expected to get " + JSON.stringify(priorities.politicsValue) + " but got " + JSON.stringify(testValue) + "\n"
    } 

    console.log(' Verifying we can set / get politicsValue ...')
    testValue = { dem16_frac: 59, rep16_frac: 39 }
    if (!priorities.setPoliticsValue(testValue) || priorities.getPoliticsValue() !== testValue) {
      failure = "Expected to set politicsValue to " + JSON.stringify(testValue) + " but got " + JSON.stringify(priorities.politicsValue) + "\n"
    }

    console.log(' Verifying we cannot set politicsValue to something invalid...')
    let badValue = { dem16_frac: 51, rep16_frac: 51 }
    if (priorities.setPoliticsValue(badValue)) {
      failure = "Expected to fail when setting politicsValue to > 100% sum, but passed with " + priorities.politicsValue + "\n"
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

  // Test #10
  failure = ""
  try {
    cut = "ModelPriorities.getAffordabilityEnabled() / *.setAffordabilityEnabled()"
    // affordabilityEnabled: true

    console.log(' Verifying we can get affordabilityEnabled ...')
    let testValue = priorities.getAffordabilityEnabled()
    if (testValue !== priorities.affordabilityEnabled) {
      failure = "Expected to get " + JSON.stringify(priorities.affordabilityEnabled) + " but got " + JSON.stringify(testValue) + "\n"
    } 

    console.log(' Verifying we can set / get affordabilityEnabled ...')
    testValue = false
    if (!priorities.setAffordabilityEnabled(testValue) || priorities.getAffordabilityEnabled() !== testValue) {
      failure = "Expected to set affordabilityEnabled to " + JSON.stringify(testValue) + " but got " + JSON.stringify(priorities.affordabilityEnabled) + "\n"
    }

    console.log(' Verifying we cannot set affordabilityEnabled to something invalid...')
    let badValue = 'bogus_boolean'
    if (priorities.setAffordabilityEnabled(badValue)) {
      failure = "Expected to fail when setting affordabilityEnabled to something bogus but passed with " + priorities.affordabilityEnabled + "\n"
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }


  // Test #11
  failure = ""
  try {
    cut = "ModelPriorities.getHappinessEnabled() / *.setHappinessEnabled()"
    // happinessEnabled: true

    console.log(' Verifying we can get happinessEnabled ...')
    let testValue = priorities.getHappinessEnabled()
    if (testValue !== priorities.happinessEnabled) {
      failure = "Expected to get " + JSON.stringify(priorities.happinessEnabled) + " but got " + JSON.stringify(testValue) + "\n"
    } 

    console.log(' Verifying we can set / get happinessEnabled ...')
    testValue = false
    if (!priorities.setHappinessEnabled(testValue) || priorities.getHappinessEnabled() !== testValue) {
      failure = "Expected to set happinessEnabled to " + JSON.stringify(testValue) + " but got " + JSON.stringify(priorities.happinessEnabled) + "\n"
    }

    console.log(' Verifying we cannot set happinessEnabled to something invalid...')
    let badValue = 'bogus_boolean'
    if (priorities.setHappinessEnabled(badValue)) {
      failure = "Expected to fail when setting happinessEnabled to something bogus but passed with " + priorities.happinessEnabled + "\n"
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

  // Test #12
  failure = ""
  try {
    cut = "ModelPriorities.getPoliticsEnabled() / *.setPoliticsEnabled()"
    // politicsEnabled: true

    console.log(' Verifying we can get politicsEnabled ...')
    let testValue = priorities.getPoliticsEnabled()
    if (testValue !== priorities.politicsEnabled) {
      failure = "Expected to get " + JSON.stringify(priorities.politicsEnabled) + " but got " + JSON.stringify(testValue) + "\n"
    } 

    console.log(' Verifying we can set / get politicsEnabled ...')
    testValue = false
    if (!priorities.setPoliticsEnabled(testValue) || priorities.getPoliticsEnabled() !== testValue) {
      failure = "Expected to set politicsEnabled to " + JSON.stringify(testValue) + " but got " + JSON.stringify(priorities.politicsEnabled) + "\n"
    }

    console.log(' Verifying we cannot set politicsEnabled to something invalid...')
    let badValue = 'bogus_boolean'
    if (priorities.setPoliticsEnabled(badValue)) {
      failure = "Expected to fail when setting politicsEnabled to something bogus but passed with " + priorities.politicsEnabled + "\n"
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

  // Test #13
  failure = ""
  try {
    cut = "ModelPriorities.getJobSearchEnabled() / *.setJobSearchEnabled()"
    // jobSearchEnabled: false

    console.log(' Verifying we can get jobSearchEnabled ...')
    let testValue = priorities.getJobSearchEnabled()
    if (testValue !== priorities.jobSearchEnabled) {
      failure = "Expected to get " + JSON.stringify(priorities.jobSearchEnabled) + " but got " + JSON.stringify(testValue) + "\n"
    } 

    console.log(' Verifying we cannot set TDB feature jobSearchEnabled ...')
    testValue = true
    if (priorities.setJobSearchEnabled(testValue) || priorities.getJobSearchEnabled() === testValue) {
      failure = "Expected to fail setting TBD feature jobSearchEnabled to " + JSON.stringify(testValue) + " but got " + JSON.stringify(priorities.jobSearchEnabled) + "\n"
    }

    /*
    console.log(' Verifying we cannot set jobSearchEnabled to something invalid...')
    let badValue = 'bogus_boolean'
    if (priorities.setJobSearchEnabled(badValue)) {
      failure = "Expected to fail when setting jobSearchEnabled to something bogus but passed with " + priorities.jobSearchEnabled + "\n"
    }
    */

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }

  // Test #14
  failure = ""
  try {
    cut = "ModelPriorities(ctor) negative case"
    console.log(' Verifying object construction failure on bad affordability range input parameter ...')

    let failedPriorities = new ModelPriorities(
                          () => {return "en-US"},
                          testAffordability,
                          testHappiness,
                          testPolitics,
                          'bogus_affordability_range',
                          testHappinessRange,
                          testPoliticsRange,
                          testAffordabilityEnabled,
                          testHappinessEnabled,
                          testPoliticsEnabled,
                          testJobSearchEnabled)

    failure = "Expected to fail with affordabilityRange = 'bogus_affordability_range', but passed."
    throw(mkFailMsg(cut, failure))
  } catch(e) {
    let expectedError = "ModelPriorities: Failed constructor.  Invalid affordabilityRange input parameter"
    if (e !== expectedError) {
      failure = "Expected to catch constructor error: \n"
      failure += "         " + expectedError + "\n"
      failure += "  got: " + e + "\n"
      throw(mkFailMsg(cut, failure))
    } 
    console.log(mkPassMsg(cut))
  }

  // Test #15
  failure = ""
  try {
    cut = "ModelPriorities(ctor) negative case"
    console.log(' Verifying object construction failure on bad happiness range input parameter ...')

    let failedPriorities = new ModelPriorities(
                          () => {return "en-US"},
                          testAffordability,
                          testHappiness,
                          testPolitics,
                          testAffordabilityRange,
                          'bogus_happiness_range',
                          testPoliticsRange,
                          testAffordabilityEnabled,
                          testHappinessEnabled,
                          testPoliticsEnabled,
                          testJobSearchEnabled)

    failure = "Expected to fail with happinessRange = 'bogus_happiness_range', but passed."
    throw(mkFailMsg(cut, failure))
  } catch(e) {
    let expectedError = "ModelPriorities: Failed constructor.  Invalid happinessRange input parameter"
    if (e !== expectedError) {
      failure = "Expected to catch constructor error: \n"
      failure += "         " + expectedError + "\n"
      failure += "  got: " + e + "\n"
      throw(mkFailMsg(cut, failure))
    } 
    console.log(mkPassMsg(cut))
  }

  // Test #16
  failure = ""
  try {
    cut = "ModelPriorities(ctor) negative case"
    console.log(' Verifying object construction failure on bad politics range input parameter ...')

    let failedPriorities = new ModelPriorities(
                          () => {return "en-US"},
                          testAffordability,
                          testHappiness,
                          testPolitics,
                          testAffordabilityRange,
                          testHappinessRange,
                          'bogus_politics_range',
                          testPoliticsRange,
                          testAffordabilityEnabled,
                          testHappinessEnabled,
                          testPoliticsEnabled,
                          testJobSearchEnabled)

    failure = "Expected to fail with politicsRange = 'bogus_politics_range', but passed."
    throw(mkFailMsg(cut, failure))
  } catch(e) {
    let expectedError = "ModelPriorities: Failed constructor.  Invalid politicsRange input parameter"
    if (e !== expectedError) {
      failure = "Expected to catch constructor error: \n"
      failure += "         " + expectedError + "\n"
      failure += "  got: " + e + "\n"
      throw(mkFailMsg(cut, failure))
    }
    console.log(mkPassMsg(cut))
  }

  // Test #17
  failure = ""
  try {
    cut = "ModelPriorities.restoreDefaults()"
    console.log(' Verifying ability to reset a priorities model object to a default state ...')

    let testAffordability = priorities.dfltAffordabilityValue
    let testHappiness = priorities.dfltHappinessValue
    let testPolitics = priorities.dfltPoliticsValue
    let testAffordabilityRange = {min: 82500, max: 927400}
    let testHappinessRange = {min: 29, max: 73}
    let testAffordabilityEnabled = priorities.dfltAffordabilityEnabled
    let testHappinessEnabled = priorities.dfltAffordabilityEnabled
    let testPoliticsEnabled = priorities.dfltPoliticsEnabled
    let testJobSearchEnabled = priorities.dfltJobSearchEnabled

    let dfltPriorities = new ModelPriorities(
                           () => {return "en-US"},
                           testAffordability, 
                           testHappiness, 
                           testPolitics,
                           testAffordabilityRange,
                           testHappinessRange,
                           testPoliticsRange,
                           testAffordabilityEnabled, 
                           testHappinessEnabled, 
                           testPoliticsEnabled, 
                           testJobSearchEnabled)

    priorities.restoreDefaults()

    if (JSON.stringify(dfltPriorities) !== JSON.stringify(priorities)) {
      failure = "Unable to reset priority model to default state.\n"
      failure += "Expecting " + JSON.stringify(dfltPriorities) + "\n"
      failure += "Got       " + JSON.stringify(priorities) + "\n"
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
