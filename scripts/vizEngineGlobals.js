


///////////////////////////////////
//Initializations
//////////////////////




///initializations

var hues = ["b", "b", "b",]
//var hue = "g";	/* b=blue, g=green, r=red colours - from ColorBrewer */
var rateById = d3.map();
var lastActiveCountry = "";
var sidsEngineInit = 0
var firstIndicatorInit = 0
var sidsMaps;
var data;
var defaultScale = 1;	/* default scale of map - fits nicely on standard screen */
var scale = 3;		/* maximum size to zoom county */
var quantize = d3.scale.quantize()
var countryJson = [];
var sidsXML;
var wdiFull;
var wdiMeta;
var mapLocations;
var indicatorGlobal="Region";
var bboxDict = {};
var textBBoxDict = {};
var bboxInit=0;
var indexCodes=["mvi"]//,egov,etc.]
//var subindexWeights={"mvi":{"Economic":1,"Geographic":1,"Environmental":1,"Financial":1}}
var vizMode;
d3.select(self.frameElement).style("height", "650px");
/////
const vizContainerWidth = "800";
const vizContainerHeight = "580";
main_chart_svg=d3.select("#choro_map_container")
  .append("svg")
  .attr("width", vizContainerWidth)
  .attr("height", vizContainerHeight); //'800'//'auto'
choro_legend_svg=d3.select("#choro_legend_container")
  .append("svg")
  .attr("width", vizContainerWidth)
  .attr("height", vizContainerHeight);
countryListLongitude = ["Belize", "Jamaica", "Cayman Islands", "Cuba", "The Bahamas", "Curaçao", "Aruba", "Haiti", "Dominican Republic",
    "St. Kitts and Nevis", "Sint Maarten","Antigua and Barbuda", "Montserrat", "Dominica", "St. Lucia"
    , "Barbados", "St. Vincent and the Grenadines", "Grenada", "Trinidad and Tobago", "Guyana", "Suriname", "", "",
    "Cabo Verde", "Guinea-Bissau",
    "São Tomé and Príncipe", "Comoros", "Bahrain", "Mauritius", "Seychelles", "Maldives", "Singapore", "", "",
    "Timor Leste", "Palau", "Papua New Guinea", "Solomon Islands",
    "Micronesia", "Marshall Islands", "Vanuatu", "Nauru", "Kiribati", "Fiji", "Tuvalu", "Tonga", "Niue", "Samoa", "Cook Islands"]

regionCountries = {
    "ais": ["CPV", "GNB", "STP", "COM", "BHR", "MUS", "SYC", "MDV", "SGP"], 
        "pacific": ["TLS", "PLW", "PNG", "SLB","TON",
            "FSM", "MHL", "VUT", "NRU", "KIR", "FJI", "TUV", "ABW", "NIU", "WSM", "TKL", "COK"],
    "caribbean": ["BLZ", "JAM", "CYM", "CUB", "BMU", "BHS", "ABW", "CUW", "TCA", "HTI", "DOM",
        "KNA", "VGB", "AIA", "SXM", "ATG", "MSR", "DMA", "LCA"
        , "BRB", "VCT", "GRD", "TTO", "GUY", "SUR"]
}

sidsDict= {"ATG":"Antigua and Barbuda", "ABW":"Aruba","BHS":"The Bahamas","BMU":"Bermuda",
"BHR":"Bahrain","BRB": "Barbados", "BLZ":"Belize","VGB": "British Virgin Islands","CPV":"Cabo Verde",
"CYM":"Cayman Islands", "COM":"Comoros","CUB": "Cuba","CUW":"Curaçao","DMA":"Dominica","DOM": "Dominican Republic",
"FJI":"Fiji","GRD":"Grenada","GNB": "Guinea-Bissau","GUY": "Guyana", "HTI":"Haiti","JAM":"Jamaica",
"KIR":"Kiribati","MDV": "Maldives","MHL": "Marshall Islands","MUS":"Mauritius","FSM": "Micronesia, Fed. Sts.", 
"NRU":"Nauru","PLW": "Palau","PNG":"Papua New Guinea","WSM": "Samoa","STP": "São Tomé and Príncipe",
"SYC":"Seychelles","SGP":"Singapore","SXM":"Sint Maarten","SLB":"Solomon Islands",
"KNA":"St. Kitts and Nevis","VCT": "St. Vincent and the Grenadines","LCA":"St. Lucia",
"SUR":"Suriname","TLS": "Timor Leste","TTO":"Trinidad and Tobago", "TON": "Tonga", 
"TUV":"Tuvalu","TCA":"Turks and Caicos Islands","VUT": "Vanuatu","AIA":"Anguilla",
"COK":"Cook Islands","MSR":"Montserrat","TKL":"Tokelau","NIU": "Niue"}




// sidsSvgToIso= {"antiguaAndBarbuda":"ATG", "aruba":"ABW","bahamas":"BHS","bermuda":"BMU",
// "bahrain":"BHR", "barbados":"BRB", "belize":"BLZ", "britishVirginIslands":"VGB","caboVerde":"CPV","caymanIslands":"CYM", "comoros":"COM",
// "cuba":"CUB","curacao":"CUW","dominica":"DMA", "dominicanRepublic":"DOM",
// "fiji":"FJI" ,"grenada":"GRD", "guineaBissau":"GNB", "guyana":"GUY", "haiti":"HTI", 
// "jamaica":"JAM", "kiribati":"KIR", "maldives":"MDV", "marshallIslands":"MHL",
// "mauritius":"MUS", "micronesia":"FSM", "nauru":"NRU", "palau":"PLW", 
// "papuaNewGuinea":"PNG", "samoa":"WSM", "saoTomeAndPrincipe":"STP", "seychelles":"SYC",
// "singapore":"SGP","sintMaarten":"SXM","solomonIslands":"SLB", "kittsAndNevis":"KNA", "stVincent":"VCT",
// "saintLucia":"LCA", "suriname":"SUR", "timorLeste":"TLS","trinidadAndTobago":"TTO",  "tonga":"TON", 
//            "tuvalu":"TUV","turksAndCaicos":"TCA", "vanuatu":"VUT","anguilla":"AIA","cookIslands":"COK",
//            "montserrat":"MSR","tokelau":"TKL", "niue":"NIU"}







////////
//Old MVI Initializations, should mostly all be abstracted
//////////////

presetDict = {
    evi: [
      "agrInst",
      "expConc",
      "expInst",
      "popLECZ",
      "popDry",
      "remote",
      "victims",
      "agrGDP",
    ],
  };
  
  mviIndicatorNames = {
    expConc: "Export Concentration",
    expInst: "Export Instability",
    agrInst: "Agricultural Instability",
    agrGDP: "Agriculture & Fishing (% of GDP)",
    victims: "Victims of Disasters",
    popLECZ: "% Population in Coastal Zones",
    remote: "Remoteness", //"popDry": "% Population in Drylands",
    tourism: "Tourism Revenue (% of Exports)",
    fdi: "FDI Inflows (% of GDP)",
    remit: "Remittances (% of GDP)",
  };
  
  mviIndicatorsDict = {
    expConc: "mvi-ldc-XCON-Index-economic",
    expInst: "mvi-ldc-XIN-Index-economic",
    agrInst: "mvi-ldc-AIN-Index-economic",
    agrGDP: "mvi-ldc-AFF-Index-environmental",
    victims: "mvi-ldc-VIC-Index-environmental",
    popLECZ: "mvi-ldc-LECZ-Index-geographic",
    remote: "mvi-ldc-REM-Index-geographic", //"popDry": "%mvi-ldc-DRY-Index-geographic",
    tourism: "mvi-ST.INT.RCPT.XP.ZS-financial",
    fdi: "mvi-BX.KLT.DINV.WD.GD.ZS-financial",
    remit: "mvi-BX.TRF.PWKR.DT.GD.ZS-financial",
  };
  
  indexDict={"mvi":"mvi-index-index"}
  
  mviDimensionColors = {
      Financial: "#0DB14B",
      Economic: "#f0db3a",
      Geographic: "#CC333F",
      Environmental: "#00A0B0",
    };
  
    
mviRecodeDict={

}
  
  mviDimensions = {
    Financial: ["tourism", "remit", "fdi"],
    Economic: ["agrInst", "expConc", "expInst"],
    Geographic: ["popLECZ", "remote"], //"popDry",
    Environmental: ["victims", "agrGDP"],
  };
  
  mviDimensionList = Object.keys(mviDimensions);
  
  //should compute this automatically
  mviCountryListSpider = [
    "HTI",
    "DOM",
    "ATG",
    "KNA",
    "DMA",
    "LCA",
    "BRB",
    "VCT",
    "GRD",
    "TTO",
    "GUY",
    "SUR",
    "CPV",
    "GNB",
    "STP",
    "COM",
    "MUS",
    "SYC",
    "MDV",
    "TLS",
    "PLW",
    "PNG",
    "SLB",
    "FSM",
    "MHL",
    "VUT",
    "NRU",
    "KIR",
    "FJI",
    "TUV",
    "TON",
    "WSM",
    "BLZ",
    "JAM",
  ];
  
  mviCountryListLongitude = [
    "Belize",
    "Jamaica",
    "Haiti",
    "Dominican Republic",
    "Antigua and Barbuda",
    "St. Kitts and Nevis",
    "Dominica",
    "Saint Lucia",
    "Barbados",
    "St. Vincent and the Grenadines",
    "Grenada",
    "Trinidad and Tobago",
    "Guyana",
    "Suriname",
    "",
    "",
    "Cabo Verde",
    "Guinea-Bissau",
    "São Tomé and Príncipe",
    "Comoros",
    "Mauritius",
    "Seychelles",
    "Maldives",
    "",
    "",
    "Timor Leste",
    "Palau",
    "Papua New Guinea",
    "Solomon Islands",
    "Micronesia, Fed. Sts.",
    "Marshall Islands",
    "Vanuatu",
    "Nauru",
    "Kiribati",
    "Fiji",
    "Tuvalu",
    "Tonga",
    "Samoa",
  ];
  

  // pacificList2 = [
  //   "Timor Leste",
  //   "Palau",
  //   "Papua New Guinea",
  //   "Solomon Islands",
  //   "Micronesia",
  //   "Marshall Islands",
  //   "Vanuatu",
  //   "Nauru",
  //   "Kiribati",
  //   "Fiji",
  //   "Tuvalu",
  //   "Tonga",
  //   "Samoa",
  // ];
  // aisList2 = [
  //   "Cabo Verde",
  //   "Guinea-Bissau",
  //   "São Tomé and Príncipe",
  //   "Comoros",
  //   "Mauritius",
  //   "Seychelles",
  //   "Maldives",
  // ];
  // caribbeanList2 = [
  //   "Belize",
  //   "Jamaica",
  //   "Haiti",
  //   "Dominican Republic",
  //   "Antigua and Barbuda",
  //   "St. Kitts and Nevis",
  //   "Dominica",
  //   "Saint Lucia",
  //   "Barbados",
  //   "St. Vincent and the Grenadines",
  //   "Grenada",
  //   "Trinidad and Tobago",
  //   "Guyana",
  //   "Suriname",
  // ];
  
