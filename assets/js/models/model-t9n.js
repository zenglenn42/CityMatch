//----------------------------------------------------------------------------------
// ModelT9n
//
// This class enables multi-language support for the user interface.
//
// At the heart of matter is a locale-based message catalog.
// It's a bit of JSON which maps enumerated names for strings to translated
// versions of those strings for a given language locale (e.g. "en-US").
//----------------------------------------------------------------------------------

function ModelT9n(getLocale = () => {return "en-US"}, dfltLocale = "en-US")  {

  // The source of truth for the current locale is ensconced within the 
  // ModelSettings object.  Here, we test that the getter method for that ivar has 
  // been passed in.

  if (!getLocale || typeof getLocale !== 'function') {
    throw('ModelT9n: Failed constructor.  Invalid getLocale fn parameter')
  }

  // Locale codes are based upon a two-letter language tag (see IETF BCP-47)
  // and a two-letter region code (see ISO 3166).

  this.getLocale = getLocale
  this.dfltLocale = dfltLocale

  // This method merges all component-level message catalogs 
  // (such as landing page, priorities page, results page, etc)
  // into a single, app-level catalog.
  //
  // The primary key is the locale (e.g., "en-US"). 
  // Under that are secondary keys (e.g., 'AppName')
  // which serve as symbolic names used for looking up translated strings for the
  // current locale.
  //
  // So we're creating something like this ...
  //
  // msgCatalog = { 
  //     "en-US": {'AppName': 'City Match', ...}, 
  //     "es-ES": {'AppName': 'Ciudad de Sueños', ...} 
  //     ...
  // }
  //
  // So ModelT9n.t('AppName') would return 'Ciudad de Sueños' if the locale were currently
  // set to Spanish ('es-ES') in the ModelSettings object.

  this.mergeCatalogs = (localeArray, catalogArray) => {
    let mergedCatalog = localeArray.reduce( (localeACC, locale) => {
      localeACC = { ...localeACC, [locale]: 
            catalogArray.reduce( (catalogACC, catalog) => {
              catalogACC = { ...catalogACC, ...catalog[locale] }
              return catalogACC
            }, {})
      }
      return localeACC
    }, {})
    return mergedCatalog
  }

  // Enumerate the currently supported languages/locales.

  this.langOptionsMap = {
    "en-US": {
      name: "English",
      enName: "English",
      flag: "🇺🇸",   // Flag emoji from: https://emojipedia.org/flags/
      supported: true
    },
    "es-ES": {
      name: "Español",
      enName: "Spanish",
      flag: "🇪🇸",
      supported: true  // May be used by view to gray out a selection list option.
    },
    "hi-IN": {
      name: "हिंदी",
      enName: "Hindi",
      flag: "🇮🇳",
      supported: true
    },
    "zh-CN": {
      name: "普通话",
      enName: "Mandarin",
      flag: "🇨🇳",
      supported: true  // May be used by view to gray out a selection list option.
    }
  }

  // Enumerate the currently supported countries that we can CityMatch against.

  this.countryOptionsMap = {
    "US": {
      name: "United States",
      flag: "🇺🇸",     // Flag emoji from: https://emojipedia.org/flags/
      supported: true,  // Currently we just support the US.
      currency: "USD"
    },
    "IN": {
      name: "India",
      flag: "🇮🇳",
      supported: false, // TODO: May be used to gray-out in user interface.
      currency: "USD"   // Should probably be rupies for full localization.
    },
    "CR": {
      name: "Costa Rica",
      flag: "🇨🇷",
      supported: false, // TODO: May be used to gray-out in user interface.
      currency: "CRC"
    }
  }

  //--------------------------------------//
  // Landing Page Strings                 //
  //--------------------------------------//

  this.landingMsgCatalog = {
    "common": {
      "AppCopyrightDate": "2021"
    },
    "en-US": {
      "AppName": "City Match",
      "AppSlogan": "Find your city",

      // NB: Strive to keep blurb text short, ideally not more than 2 sentences
      //     with each sentence < 80 characters.

      "AppBlurb": "Thinking about a move but not sure which city is your best bet?\n" +
             "Share your priorities and we'll offer some options to consider.",
    },
    "hi-IN": {
      "AppName": "सिसपनों का शहर",
      "AppSlogan": "अपने सपनों का शहर खोजें",

      // NB: Strive to keep blurb text short, ideally not more than 2 sentences
      //     with each sentence < 80 characters.

      "AppBlurb": "एक अलग शहर में जाने के बारे में सोच रहे हैं लेकिन यह सुनिश्चित नहीं है कि मेरे लिए सबसे अच्छा शहर कौन सा है?\n" +
             "अपनी प्राथमिकताएं प्रदान करें और हम कुछ विकल्प देंगे।",
    },
    "es-ES": {
      "AppName": "Ciudad de Sueños",
      //"AppName": () => {return this.t('AppName', 'en-US')},
      "AppSlogan": "Encuentra tu ciudad",

      // NB: Strive to keep blurb text short, ideally not more than 2 sentences
      //     with each sentence < 80 characters.

      "AppBlurb": "¿Estás pensando en mudarte pero no estás seguro de cuál es tu mejor opción?\n" +
             "Comparta sus prioridades y le ofreceremos algunas opciones a considerar.",
    },
    "zh-CN": {
      "AppName": "城市配对",   // City Pairing
      //"AppName": "城市配合", // City Fit (as in 'fit together')
      //"AppName": "梦想之城", // Dream City
      //"AppName": "城市适合", // Suitable City
      //"AppName": "宜居城市", // Livable City

      "AppSlogan": "寻找宜居城市", // Find a livable city
      //"AppSlogan": "找到你的城市", // Find your city

      // NB: Strive to keep blurb text short, ideally not more than 2 sentences
      //     with each sentence < 80 characters.

      "AppBlurb": "正在考虑搬家但不确定哪个城市是您的最佳选择？\n" +
             "分享您的优先事项，我们将提供一些可供考虑的选项。",
    }
  }

  //--------------------------------------//
  // User-Priorities Strings              //
  //--------------------------------------//

  this.prioritiesMsgCatalog = {
    "en-US": {
      PrioritiesSubtitle: "Share your priorities ...",
      HappinessTitle: "Civic Happiness",
      HappinessTooltip: "Use slider below to adjust this priority. " +
                        "Based upon a 2019 study by WalletHub across dimensions including " +
                        "overall well-being, employment, and community in the U.S.",
      PoliticsTitle: "Prevailing Politics",
      PoliticsTooltip: "Use slider below to adjust this priority of desired prevailing " +
                       "political environment.  Based upon county-level 2016 U.S. Presidential " +
                       "election data published by opendatasoft.",
      AffordabilityTitle: "Cost of Living",
      AffordabilityTooltip: "Use slider below to specify desired relative cost of living. " +
                            "Based upon 2017 median home price by county published by U.S. Census.",
      JobSearchTitle: "Job Outlook",
      //JobSearchTooltip: "This feature is currently unavailable.",
      JobSearchTooltip: "You must be logged in to use this feature.",
      JobSearchPlaceholder: "Job Title (disabled)"
    },
    "hi-IN": {
      PrioritiesSubtitle: "अपनी प्राथमिकताओं को साझा करें",
      HappinessTitle: "नागरिक खुशी",
      HappinessTooltip: "इस प्राथमिकता को समायोजित करने के लिए नीचे स्लाइडर का उपयोग करें। " +
                        "समग्र कल्याण, रोजगार और समुदाय सहित आयामों में वॉलेटहब द्वारा 2019 के अध्ययन के आधार पर।",
      PoliticsTitle: "राजनीतिक झुकाव",
      PoliticsTooltip: "वांछित प्रचलित राजनीतिक माहौल की इस प्राथमिकता को समायोजित करने के लिए नीचे स्लाइडर का उपयोग करें। " + 
                       "ओपनडेटासॉफ्ट द्वारा प्रकाशित 2016 राष्ट्रपति चुनाव के आंकड़ों के आधार पर।",
      AffordabilityTitle: "रहने की लागत",
      AffordabilityTooltip: "रहने की वांछित सापेक्ष लागत निर्दिष्ट करने के लिए नीचे स्लाइडर का उपयोग करें। " +
                            "2017 में औसत घर की कीमत के आधार पर। अमेरिकी जनगणना द्वारा प्रकाशित।",
      JobSearchTitle: "जॉब आउटलुक",
      //JobSearchTooltip: "यह सुविधा वर्तमान में अनुपलब्ध है।",
      JobSearchTooltip: "आपको इस सुविधा का उपयोग करने के लिए लॉग इन करना होगा।",
      JobSearchPlaceholder: "नौकरी का शीर्षक" + " " + "(विकलांग)"
    },
    "es-ES": {
      PrioritiesSubtitle: "Comparta sus prioridades ...",
      HappinessTitle: "Felicidad Cívica",
      HappinessTooltip: "Utilice el control deslizante a continuación para ajustar esta prioridad. " +
                        "Basado en un estudio de WalletHub de 2019 en muchas dimensiones, incluido el bienestar general, el empleo y la comunidad.",
      PoliticsTitle: "Política Imperante",
      PoliticsTooltip: "Utilice el control deslizante a continuación para ajustar esta prioridad del entorno político predominante deseado. " +
                       "Basado en datos de elecciones presidenciales de 2016 a nivel de condado publicados por opendatasoft.",
      AffordabilityTitle: "Costo de la Vida",
      AffordabilityTooltip: "Utilice el control deslizante a continuación para especificar el costo de vida relativo deseado. " +
                            "Basado en el precio medio de la vivienda por condado de 2017 según lo publicado por el censo de los Estados Unidos.",
      JobSearchTitle: "Perspectiva Laboral",
      //JobSearchTooltip: "Esta función no está disponible actualmente.",
      JobSearchTooltip: "Debe iniciar sesión para utilizar esta función.",
      JobSearchPlaceholder: "Título del Trabajo (discapacitado)"
    },
    "zh-CN": {
      PrioritiesSubtitle: "分享您的优先事项 ...",
      HappinessTitle: "公民幸福",
      HappinessTooltip: "使用下面的滑块调整此优先级。 " +
                        "基于 WalletHub 2019 年对整体福祉、就业和社区等方面的研究。",
      PoliticsTitle: "盛行的政治",
      PoliticsTooltip: "使用下面的滑块来调整所需的主流政治环境。 " +
                       "基于 opendatasoft 发布的 2016 年县级总统选举数据。",
      AffordabilityTitle: "生活成本",
      AffordabilityTooltip: "使用下面的滑块指定所需的相对生活成本。 " +
                            "基于美国人口普查局公布的 2017 年各县房价中值。",
      JobSearchTitle: "就业前景",
      JobSearchTooltip: "您必须先登录才能使用此功能。",
      JobSearchPlaceholder: "职称（已禁用）"
    },
  }

  //--------------------------------------//
  // Results Page Strings                 //
  //--------------------------------------//

  this.resultsMsgCatalog = {
    "common": {
      NoResultsImg: "assets/img/chess-failure.jpg",
      MonetizeImg: "assets/img/monetize.jpg",
      MissingCityImg: "assets/img/welcome-moon.png"
    },
    "en-US": {
      ResultsSubtitle: "Your best bets ...",
      NoResults: "No results available.",
      NoResultsAdvice: "Please go back and specify one or more priorities.",
      NoMapView: "The map view requires internet. Please reload when you're reconnected.",
      MonetizeHere: "Monetize here $",
      MonetizeLearnMore: "Learn More",
      PhotoLabelHappiness: "Civic Happiness",
      PhotoLabelAffordability: "Median Home Price",
      PhotoLabelPolitics: "",
      ChartTitle: "Alignment with your priorities (0 = ideal)",
      ChartLabelCombined: "Combined",
      ChartLabelHappiness: "Happiness",
      ChartLabelAffordability: "Cost of Living",
      ChartLabelPolitics: "Politics",
      ListLabelHappiness: "Civic Happiness",      
      ListLabelAffordability: "Median Home Price",      
      ListLabelPolitics: "",
      TableLabelRank: "#",
      TableLabelCity: "City",
      TableLabelHappiness: "Happiness",
      TableLabelAffordability: "Cost",
      TableLabelPolitics: "Politics"
    },
    "hi-IN": {
      ResultsSubtitle: "आपके सबसे अच्छे शहर ...",
      NoResults: "कोई परिणाम उपलब्ध नहीं है।",
      NoResultsAdvice: "कृपया वापस जाएं और एक या अधिक प्राथमिकताएं निर्दिष्ट करें।",
      NoMapView: "मानचित्र के लिए इंटरनेट का उपयोग आवश्यक है। कृपया पुन: कनेक्ट होने पर पुनः लोड करें।",
      MonetizeHere: "यहाँ विज्ञापन दें। ₹",
      MonetizeLearnMore: "और अधिक जानें",
      PhotoLabelHappiness: "नागरिक खुशी",
      PhotoLabelAffordability: "मेडियन होम प्राइस",
      PhotoLabelPolitics: "",
      ChartTitle: "अपनी प्राथमिकताओं के साथ संरेखण। (0 = आदर्श)",
      ChartLabelCombined: "कम्पोजिट",
      ChartLabelHappiness: "ख़ुशी",
      ChartLabelAffordability: "जीवन यापन की लागत",
      ChartLabelPolitics: "राजनीति",
      ListLabelHappiness: "नागरिक खुशी",   
      ListLabelAffordability: "मेडियन होम प्राइस",  
      ListLabelPolitics: "",
      TableLabelRank: "#", // "श्रेणी"
      TableLabelCity: "शहर",
      TableLabelHappiness: "नागरिक खुशी",   
      TableLabelAffordability: "लागत",
      TableLabelPolitics: "राजनीति"
    },
    "es-ES": {
      ResultsSubtitle: "Tus mejores apuestas ...",
      NoResults: "No hay resultados disponibles.",
      NoResultsAdvice: "Regrese y especifique una o más prioridades, por favor.",
      NoMapView: "El mapa requiere acceso a Internet. Vuelva a cargar cuando vuelva a conectarse.",
      MonetizeHere: "Monetiza aquí $",
      MonetizeLearnMore: "Aprende Más",
      PhotoLabelHappiness: "Felicidad Cívica",
      PhotoLabelAffordability: "Precio medio de la vivienda",
      PhotoLabelPolitics: "",
      ChartTitle: "Alineación con tus prioridades (0 = ideal)",
      ChartLabelCombined: "Conjunta",
      ChartLabelHappiness: "Felicidad",
      ChartLabelAffordability: "Costo de la Vida",
      ChartLabelPolitics: "Política",
      ListLabelHappiness: "Felicidad Cívica",      
      ListLabelAffordability: "Precio medio de la vivienda",
      ListLabelPolitics: "",
      TableLabelRank: "#", // "Clasificación"
      TableLabelCity: "Ciudad",
      TableLabelHappiness: "Felicidad",
      TableLabelAffordability: "Costo",
      TableLabelPolitics: "Política"
    },
    "zh-CN": {
      ResultsSubtitle: "你最好的赌注 ...",
      NoResults: "没有可用的结果。",
      NoResultsAdvice: "请返回并指定一个或多个优先级。",
      NoMapView: "地图需要互联网接入。 重新连接后请重新加载。",
      MonetizeHere: "在这里获利",
      MonetizeLearnMore: "学到更多",
      PhotoLabelHappiness: "公民幸福",
      PhotoLabelAffordability: "房价中位数",
      PhotoLabelPolitics: "",
      ChartTitle: "最接近您的优先事项 (0 = 理想的)",
      ChartLabelCombined: "组合",
      ChartLabelHappiness: "幸福",
      ChartLabelAffordability: "生活成本",
      ChartLabelPolitics: "政治",
      ListLabelHappiness: "公民幸福",
      ListLabelAffordability: "房价中位数",
      ListLabelPolitics: "",
      TableLabelRank: "#", // "排行"
      TableLabelCity: "城市",
      TableLabelHappiness: "幸福",
      TableLabelAffordability: "代价",
      TableLabelPolitics: "政治"
    }
  }

  //--------------------------------------//
  // Settings Page Strings                //
  //--------------------------------------//

  this.settingsMsgCatalog = {
    "en-US": {
      SettingsSubtitle: "Edit settings ...",
      SelectLang: "Select language",
      SelectLangTooltip: "Select language locale",
      UseLang: "Use",
      SelectCountry: "Select country",
      ShowCities: "Show cities in",
      SelectQuantity: "Select quantity",
      ShowTopCitiesBegin: "Show top",
      ShowTopCitiesEnd: "cities",
    },
    "hi-IN": {
      SettingsSubtitle: "सेटिंग अपडेट करें ...",
      SelectLang: "भाषा का चयन करें",
      UseLang: "भाषा का प्रयोग करें",
      SelectCountry: "देश चुनें",
      ShowCities: "शहरों में दिखाओ",
      SelectQuantity: "मात्रा चुनें",
      ShowTopCitiesBegin: "शीर्ष ",
      ShowTopCitiesEnd: "शहरों को दिखाएं"
    },
    "es-ES": {
      SettingsSubtitle: "Editar configuración ...",
      SelectLang: "Seleccione el idioma",
      UseLang: "Usar",
      SelectCountry: "Seleccionar país",
      ShowCities: "Mostrar ciudades en",
      SelectQuantity: "Selecciona la cantidad",
      ShowTopCitiesBegin: "Mostrar las",
      ShowTopCitiesEnd: "mejores ciudades"
    },
    "zh-CN": {
      SettingsSubtitle: "编辑设置 ...",
      SelectLang: "选择语言",
      UseLang: "选择",
      SelectCountry: "选择国家",
      ShowCities: "显示城市",
      SelectQuantity: "选择数量",
      ShowTopCitiesBegin: "列举",
      ShowTopCitiesEnd: "城市"
    },
  }

  //--------------------------------------//
  // Menu Strings                         //
  //--------------------------------------//

  this.menuMsgCatalog = {
    "en-US": {
      MenuTitle: "Menu",
      MenuView: "View",
      MenuViewIntro: "1. Introduction",
      MenuViewPriorities: "2. Your priorities",
      MenuViewBestBets: "3. Your best bets",
      MenuViewBlog: "Blog",
      MenuPriorities: "Priorities",
      MenuPrioritiesEdit: "Edit",
      MenuPrioritiesClear: "Clear cached priorities",
      MenuPrioritiesDefault: "Restore defaults",
      MenuPrioritiesHappiness: (val) => {return `Civic Happiness: ${val}`},
      MenuPrioritiesPolitics: (val) => {return `Prevailing Politics: ${val}`},
      MenuPrioritiesCost: (val) => {return `Cost of Living: ${val}`},
      MenuSettings: "Settings",
      MenuSettingsEdit: "Edit",
      MenuSettingsClear: "Clear cached settings",
      MenuSettingsDefault: "Restore defaults",
      MenuUseLang: (val) => {return `Use ${val}`},
      MenuShowCities: (val) => {return `Show cities in ${val}`},
      MenuShowTop: (val) => {return `Show top ${val} cities`},
      MenuHelp: "Help"
    },
    "hi-IN": {
      MenuTitle: "मेनू",
      MenuView: "इधर देखो",
      MenuViewIntro: "1. परिचय",
      MenuViewPriorities: "2. आपकी प्राथमिकताएं",
      MenuViewBestBets: "3. आपका सबसे अच्छा चुनाव",
      MenuViewBlog: "ब्लॉग",
      MenuPriorities: "आपकी प्राथमिकताएं",
      MenuPrioritiesEdit: "प्राथमिकताएं बदलें",
      MenuPrioritiesClear: "कैश की गई प्राथमिकताएं हटाएं",
      MenuPrioritiesDefault: "रीसेट प्राथमिकताएं",
      MenuPrioritiesHappiness: (val) => {return `नागरिक खुशी: ${val}`},
      MenuPrioritiesPolitics: (val) => {return `राजनीतिक झुकाव: ${val}`},
      MenuPrioritiesCost: (val) => {return `जीवन यापन खर्च्चा: ${val}`},
      MenuSettings: "सेटिंग्स",
      MenuSettingsEdit: "सेटिंग्स को बदलें",
      MenuSettingsClear: "सेटिंग्स को हटाएं",
      MenuSettingsDefault: "रीसेट सेटिंग्स",
      MenuUseLang: (val) => {return `प्रयोग ${val}`},
      MenuShowCities: (val) => {return `शहरों को दिखाएं ${val}`},
      MenuShowTop: (val) => {return `सर्वश्रेष्ठ ${val} शहरों को दिखाएं`},
      MenuHelp: "मदद"
    },
    "es-ES": {
      MenuTitle: "Menú",
      MenuView: "Mira",
      MenuViewIntro: "1. Introducción",
      MenuViewPriorities: "2. Tus prioridades",
      MenuViewBestBets: "3. Tus mejores apuestas",
      MenuViewBlog: "Blog",
      MenuPriorities: "Prioridades",
      MenuPrioritiesEdit: "Editar",
      MenuPrioritiesClear: "Limpiar cache",
      MenuPrioritiesDefault: "Valores predeterminados",
      MenuPrioritiesHappiness: (val) => {return `Felicidad Cívica: ${val}`},
      MenuPrioritiesPolitics: (val) => {return `Política Imperante: ${val}`},
      MenuPrioritiesCost: (val) => {return `Costo de la Vida: ${val}`},
      MenuSettings: "Ajustes",
      MenuSettingsEdit: "Editar",
      MenuSettingsClear: "Limpiar cache",
      MenuSettingsDefault: "Valores predeterminados",
      MenuUseLang: (val) => {return `Usar ${val}`},
      MenuShowCities: (val) => {return `Mostrar ciudades en ${val}`},
      MenuShowTop: (val) => {return `Mostrar las ${val} mejores ciudades`},
      MenuHelp: "Ayúdame"
    },
    "zh-CN": {
      MenuTitle: "菜单",
      MenuView: "看",
      MenuViewIntro: "1. 简介",
      MenuViewPriorities: "2. 你的优先事项",
      MenuViewBestBets: "3. 你最好的城市",
      MenuViewBlog: "博客",
      MenuPriorities: "你的优先事项",
      MenuPrioritiesEdit: "编辑",
      MenuPrioritiesClear: "清除缓存",
      MenuPrioritiesDefault: "恢复默认值",
      MenuPrioritiesHappiness: (val) => {return `公民幸福: ${val}`},
      MenuPrioritiesPolitics: (val) => {return `盛行的政治: ${val}`},
      MenuPrioritiesCost: (val) => {return `生活成本: ${val}`},
      MenuSettings: "设置",
      MenuSettingsEdit: "编辑",
      MenuSettingsClear: "清除缓存",
      MenuSettingsDefault: "恢复默认值",
      MenuUseLang: (val) => {return `使用 ${val}`},
      MenuShowCities: (val) => {return `从这里显示城市 ${val}`},
      MenuShowTop: (val) => {return `显示最好的 ${val} 个城市`},
      MenuHelp: "协助"
    }
  }

  this.supportedCatalogs = [
      this.landingMsgCatalog, 
      this.prioritiesMsgCatalog, 
      this.resultsMsgCatalog,
      this.settingsMsgCatalog,
      this.menuMsgCatalog
  ]

  this.msgCatalog = this.mergeCatalogs(this.supportedLocales, this.supportedCatalogs)
}

ModelT9n.prototype.supportedLocales = ["common", "en-US", "es-ES", "hi-IN", "zh-CN"]
ModelT9n.prototype.supportedCountryCodes = ["US"]

//----------------------------------------------------------------------------------
// TODO: Turn these into static class methods one day.
//
// Needed by the ModelSettings object before we can instantiate a ModelT9n object.
// Interestingly, the ModelT9n object needs the getLocale method from ModelSettings.
// So there is a chase-your-tail dependency that I'm resolving by making these
// next two methods essentially static class methods.
//----------------------------------------------------------------------------------
ModelT9n.prototype.isValidLocale = function(locale) {
    return ModelT9n.prototype.supportedLocales.includes(locale)
}
ModelT9n.prototype.isValidCountryCode = function(countryCode) {
    return ModelT9n.prototype.supportedCountryCodes.includes(countryCode)
}
//----------------------------------------------------------------------------------

ModelT9n.prototype.getCountryName = function(countryCode) {
  let countryName = "missing-countryName"
  if (ModelT9n.prototype.isValidCountryCode(countryCode)) {
    countryName =
        (this.countryOptionsMap.hasOwnProperty(countryCode) &&
         this.countryOptionsMap[countryCode].hasOwnProperty('name')) ?
        this.countryOptionsMap[countryCode].name : countryCode + "-" + countryName
  } else {
    console.error('ModelT9n.getCountryName(countryCode): Invalid countryCode =', countryCode)
  }
  return countryName
}

ModelT9n.prototype.getCountryOptionsMap = function() {
  return JSON.parse(JSON.stringify(this.countryOptionsMap))
}

// Return the 3-letter iso-currency descriptor associated with
// a given country code as defined by this site:
// https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/amendments/lists/list_one.xml
//
// For example, given the countryCode = "US" return "USD".
// This is used by the view to generate the related "$" symbol.

ModelT9n.prototype.getCurrency = function(countryCode) {
  let code = countryCode || this.countryCode

  return this.countryOptionsMap[code].currency
}

ModelT9n.prototype.isValidLocaleProperty = function(locale, prop) {
  return (this.msgCatalog.hasOwnProperty(locale)) &&
         (this.msgCatalog[locale].hasOwnProperty(prop))
}

ModelT9n.prototype.getLangName = function(locale) {
  let langName = "missing-langName"
  if (ModelT9n.prototype.isValidLocale(locale)) {
    langName = (this.langOptionsMap.hasOwnProperty(locale) &&
                this.langOptionsMap[locale].hasOwnProperty('name')) ?
               this.langOptionsMap[locale].name : locale + "-" + langName
  } else {
    console.error('ModelT9n.getLangName(locale): Invalid locale =', locale)
  }
  return langName
}

ModelT9n.prototype.getLangOptionsMap = function() {
  return JSON.parse(JSON.stringify(this.langOptionsMap))
}

// Return the translated string associated with a given key (for the current locale).

ModelT9n.prototype.t = function(key, val, theLocale) {
  let locale = (theLocale) ? theLocale : this.getLocale()
  let result = `missing_${key}`

  if (this.isValidLocaleProperty(locale, key)) {
    result = (typeof this.msgCatalog[locale][key] === 'function') 
                  ? this.msgCatalog[locale][key](val) 
                  : this.msgCatalog[locale][key]
  } else if (this.isValidLocaleProperty(this.dfltLocale, key)) {
    result = (typeof this.msgCatalog[this.dfltLocale][key] === 'function') 
                  ? this.msgCatalog[this.dfltLocale][key](val) 
                  : this.msgCatalog[this.dfltLocale][key]
  } else if (this.isValidLocaleProperty("common", key)) {
    result = this.msgCatalog["common"][key]
  } else {
    result = (locale) ? `${result}_${locale}` : result
    console.log(`ModelT9n:${key} Error `, result)
  }   
  return result
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

function UnitTestModelT9n() {
  let cut = ""
  let failure = undefined
  let errmsg = undefined
  let module = "model-t9n.js"

  console.log('Starting unit tests for ' + module)
  console.log('---------------------------------------')

  let t9n = new ModelT9n()

  // Test #1
  try {
    cut = "ModelT9n() dflt constructor"
    console.log(' Verifying default construction when ctor called without params ...')

    if (t9n.t('AppName') !== "City Match") {
      failure = "Expected title of 'City Match' but got " + t9n.t('AppName')
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
  try {
    let t9n = new ModelT9n()
    cut = "ModelT9n().t('AppCopyrightDate')"

    if (t9n.t('AppCopyrightDate') !== "2021") {
      failure = "Expected copyright date of '2021' but got " + t9n.t('AppCopyrightDate')
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
  try {
    let t9n = new ModelT9n()
    cut = "ModelT9n().t('BogusKey')"

    if (t9n.t('BogusKey') !== 'missing_BogusKey_en-US') {
      failure = "Expected t.('BogusKey') === 'missing_BogusKey_en-US' got " + t9n.t('BogusKey')
    }

    if (failure) {
      throw(mkFailMsg(cut, failure))
    } else {
      console.log(mkPassMsg(cut))
    }
  } catch(e) {
    console.error(e)
  }
}
