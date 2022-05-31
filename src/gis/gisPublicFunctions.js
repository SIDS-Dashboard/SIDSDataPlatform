import colors from "@/gis/static/colors.js";
import chroma from "chroma-js";
import constants from "@/gis/static/constants.js";
import mapboxgl from "@/gis/mapboxgl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

export function updateData(
  activeDataset,
  activeLayer,
  comparison = false
)
{
  let map = !comparison ? this.map : this.map2; //
  let cls = !comparison
    ? this.options.currentLayerState
    : this.options.comparisonLayerState;
  let Field_Name = activeLayer.Field_Name;
  this.activeDataset = activeDataset;
  this.activeLayer = activeLayer;
  this._handleOceanData(activeDataset, activeLayer, comparison)
  this.clearHexHighlight();
  // this.remove3d();

  cls.dataLayer = Field_Name; //update global to reflect selected datalayer

  //-------------------------------------------
  if (!map.getSource("hex5")) {
    this._addVectorSources(comparison);
  }
  if (!map.getLayer(cls.hexSize)) {
    let currentSourceData = this.options.sourceData[`${cls.hexSize}Source`]
    map.addLayer({
      id: cls.hexSize,
      type: "fill",
      source: cls.hexSize,
      "source-layer": currentSourceData.layer,
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-color": "blue",
        "fill-opacity": 0.0,
      },
    });

    if (this.options.firstSymbolId) {
      map.moveLayer(cls.hexSize, this.options.firstSymbolId);
    }
  }
  let self = this;
  setTimeout(() => {
    var features = map.queryRenderedFeatures({
      layers: [cls.hexSize],
    });
    if (features) {
      var uniFeatures;
      if (cls.hexSize === "admin1") {
        uniFeatures = self.getUniqueFeatures(features, "GID_1");
      } else if (cls.hexSize === "admin2") {
        uniFeatures = self.getUniqueFeatures(features, "GID_2");
      } else {
        uniFeatures = self.getUniqueFeatures(features, "hexid");
      }
      var selectedData = uniFeatures.map((x) => x.properties[Field_Name]);
      console.warn("changeDataOnMap selectedData", selectedData);

      var breaks = chroma.limits(selectedData, "q", 4);

      var breaks_new = [];
      this.options.precision = 1;
      do {
        this.options.precision++;
        for (let i = 0; i < 5; i++) {
          breaks_new[i] = parseFloat(
            breaks[i].toPrecision(this.options.precision)
          );
        }
      } while (self.checkForDuplicates(breaks_new) && this.options.precision < 10);
      breaks = breaks_new;
      let colorRamp;
      if(self.options.colorSCheme.color && self.options.colorSCheme.color !=='original') {
        if (self.options.colorSCheme.color === "red") {
          colorRamp = colors.colorSeq["pinkish"];
        } else if (self.options.colorSCheme.color === "purple") {
          colorRamp = colors.colorSeq["purple"];
        } else if (self.options.colorSCheme.color === "blue") {
          colorRamp = colors.colorSeq["blues"];
        } else if (self.options.colorSCheme.color === "colorblind-safe") {
          colorRamp = colors.colorSeq["colorBlindGreen"];
        }
      } else {
        colorRamp = colors.colorSeq["yellow-blue"];

        if (Field_Name.substring(0, 2) === "1a") {
          colorRamp = colors.colorDiv.gdpColor;
        } else if (Field_Name.substring(0, 2) === "1c") {
          colorRamp = colors.colorSeq["pop"];
        } else if (Field_Name === "7d10") {
          colorRamp = colors.colorSeq["combo"];
        } else if (Field_Name === "7d5") {
          colorRamp = colors.colorSeq["minty"];
        } else if (Field_Name === "7d7") {
          colorRamp = colors.colorSeq["blues"];
        } else if (Field_Name === "7d4") {
          colorRamp = colors.colorSeq["pinkish"];
        } else if (Field_Name === "7d8") {
          colorRamp = colors.colorSeq["silvers"];
        } else if (Field_Name === "d") {
          breaks = [-4841, -3805, -2608, -1090, 1322];
          colorRamp = colors.colorSeq["ocean"];
        }
      }

      if(self.options.colorSCheme.invert) {
        colorRamp = [...colorRamp].reverse()
      }
      cls.breaks = breaks;
      cls.color = colorRamp;
      map.setPaintProperty(cls.hexSize, "fill-color", [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "yellow",
        [
          "interpolate",
          ["linear"],
          ["get", Field_Name],
          breaks[0],
          colorRamp[0],
          breaks[1],
          colorRamp[1],
          breaks[2],
          colorRamp[2],
          breaks[3],
          colorRamp[3],
          breaks[4],
          colorRamp[4],
        ],
      ]);

      if (isNaN(breaks[3]) || breaks[1] == 0) {
        map.setPaintProperty(
          cls.hexSize,
          "fill-opacity",
          0.0
          //this.options.opacity
        );
        setTimeout(() => {
          map.setFilter(cls.hexSize, null);
        }, 100);
        if (!comparison) {
          this.addNoDataLegend()
        }
      } else {
        map.setFilter(cls.hexSize, [">=", Field_Name, 0]);
        this.emit('layerUpdate', {
          colorRamp,
          breaks,
          selectedData,
          precision: this.options.precision
        });
        let self = this;
        setTimeout(() => {
          map.setPaintProperty(
            cls.hexSize,
            "fill-opacity",
            self.options.opacity // 0.8
          );
        }, 100);
      }
    }
    map.once('idle', () => {
      if(this.options.mode3d) {
        this.add3dLayer(map, this.options.currentLayerState.hexSize + "-3d")
      }
    })
  }, 1000);

  map.moveLayer("allsids", this.options.firstSymbolId);
}

export function addOcean(activeDataset, activeLayer, comparison = false) {
  let map = !comparison ? this.map : this.map2; //
  let cls = !comparison
    ? this.options.currentLayerState
    : this.options.comparisonLayerState;

  this.clearHexHighlight();
  // this.remove3d();

  cls.dataLayer = activeLayer.Field_Name; //corresponds to the attributeId
  cls.hexSize = "ocean";

  cls.breaks = [-4841, -3805, -2608, -1090, 0];
  cls.color = colors.colorNatural["ocean-depth"];

  for (var layer in constants.userLayers) {
    if (map.getLayer(constants.userLayers[layer])) {
      map.removeLayer(constants.userLayers[layer]);
    }
  }

  let layerOptions = {
    id: "ocean",
    type: "fill",
    source: "ocean",
    "source-layer": "oceans",
    layout: {
      visibility: "visible",
    },
    filter: ["<", "depth", 0],
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "depth"], //TODO remove this hardcoding
        -4841,
        "#08519c",
        -3805,
        "#3182bd",
        -2608,
        "#6baed6",
        -1090,
        "#bdd7e7",
        1322,
        "#eff3ff",
      ],
      "fill-opacity": this.options.opacity, //0.8,
    },
  };

  map.addLayer(layerOptions, this.options.firstSymbolId);

  if (!comparison) {
    let waitInterval = 1000;
    setTimeout(() => {
      if (map.areTilesLoaded()) {
        let features = map.queryRenderedFeatures({
          layers: ["ocean"],
        });
        if (features) {
          let uniFeatures;
          uniFeatures = this.getUniqueFeatures(features, "depth");
          let selectedData = uniFeatures.map((x) => x.properties["depth"]);
          this.emit('layerUpdate', {
            colorRamp: cls.color,
            breaks: cls.breaks,
            selectedData: selectedData,
            precision: this.options.precision
          });
        }
      }
    }, waitInterval);
  }
}

export function on(eventName, callback) {
  if(this.events[eventName]) {
    this.events[eventName].push(callback)
  }
  else {
    this.events[eventName] = [callback]
  }
}

export function emit(eventName, event) {
  if(this.events[eventName]){
    this.events[eventName].map(callback => {
      callback(event);
    });
  }
}

export function zoomToCountry(selection) {
    var v2 = new mapboxgl.LngLatBounds(selection.bb);
    this.map.fitBounds(v2, {
      linear: true,
      padding: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
      pitch: 0,
    });

    // this.remove3d();
    let self = this;
    //contextual recolor hexes
    this.map.once("idle", () => {
      if (!self.map.getLayer("ocean")) {
          self.recolorBasedOnWhatsOnPage()
      }
    });
    // this.map2.once("idle", function () {
    //   if (!self.map2.getLayer("ocean")) {
    //     setTimeout(() => {
    //       self.recolorBasedOnWhatsOnPage(self.map2), 1000;
    //     }); //timeout added to allow data to load in before triggering recolor+legend update
    //   }
    // });
}

export function changeHexagonSize(resolution) {
  let map = this.map;
  let map2 = this.map2;

  this.clearHexHighlight();

  if(!map.getLayer(this.options.currentLayerState.hexSize)) {
    this.options.currentLayerState.hexSize = resolution;
    this.options.comparisonLayerState.hexSize = resolution;
    return
  }
  if(this.options.mode3d) {
    this.map.removeLayer(this.options.currentLayerState.hexSize + "-3d")
  }
  // this.remove3d();
  //update resolution state
  this.options.currentLayerState.hexSize = resolution;
  this.options.comparisonLayerState.hexSize = resolution;

  //clear maplayers that are usercontrolled
  for (var x in constants.userLayers) {
    if (map.getLayer(constants.userLayers[x])) {
      map.removeLayer(constants.userLayers[x]);
    }
    if (this.options.compareMode) {
      if (map2.getLayer(constants.userLayers[x])) {
        map2.removeLayer(constants.userLayers[x]);
      }
    }
  }

  //get source name
  let currentSourceData = Object.values(this.options.sourceData).find((o) => {
    return o.name === this.options.currentLayerState.hexSize;
  });

  let options = {
    id: resolution,
    type: "fill",
    source: resolution,
    "source-layer": currentSourceData.layer,
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-color": "blue",
      "fill-opacity": 0.0, //globals.opacity, // 0
    },
  };
  map.addLayer(options, this.options.firstSymbolId);

  map.once('idle', () => {
    if(this.options.mode3d) {
      this.add3dLayer(map, this.options.currentLayerState.hexSize + "-3d")
    }
  })
  // if (globals.compareMode) {
  //   map2.addLayer(options, globals.firstSymbolId);
  // }

  /* if (resolution === "hex1") {
      //showing loader in expectation of hex1 taking longer to display
      // $(".loader-gis").show();
      console.log("handling spinner for hex1 loading");
      this.showSpinner();

      map.once("idle", () => {
        // $(".loader-gis").hide();
        this.hideSpinner();
      });
    } */

  if (map.getStyle().name === "Mapbox Satellite") {
    map.moveLayer(resolution);
    // if (globals.compareMode) {
    //   map2.moveLayer(resolution);
    // }
  }

  /*     map.once("idle", function (e) {
      console.log(`map.once on idle triggered by ${e}`);
      console.log("map idle-> recoloring");
      this.recolorBasedOnWhatsOnPage();

      //console.log('change bins');
      //map.setPaintProperty(globals.currentLayerState.hexSize, 'fill-opacity', 0.7)
      map.moveLayer(resolution, "allsids");
    }); */
  map.once("idle", () => {

    this.recolorBasedOnWhatsOnPage(); //as it's inside an arrow function this. should refer to the outer scope and should be able to find the function

    //console.log('change bins');
    //map.setPaintProperty(globals.currentLayerState.hexSize, 'fill-opacity', 0.7)
    map.moveLayer(resolution, "allsids");

    // this.hideSpinner();
  });
  // map2.once("idle", () => {
  //   if (debug) {
  //     console.log("map2 idle-> recoloring");
  //   }
  //   this.recolorBasedOnWhatsOnPage(map2); //as it's inside an arrow function this. should refer to the outer scope and should be able to find the function
  //
  //   //console.log('change bins');
  //   //map.setPaintProperty(globals.currentLayerState.hexSize, 'fill-opacity', 0.7)
  //   map2.moveLayer(resolution, "allsids");
  //
  //   // this.hideSpinner();
  // });
}

export function add3D() {
  let map = this.map;

  this.clearHexHighlight();

  let id = this.options.currentLayerState.hexSize + "-3d";
  if(!map.getLayer(this.options.currentLayerState.hexSize)) {
    map.easeTo({
      center: map.getCenter(),
      pitch: 55,
    });
    return this.options.mode3d = true;
  }
  if (map.getLayer(id)) {
    map
      .easeTo({
        center: map.getCenter(),
        pitch: 0,
      })
      .removeLayer(id);
      this.options.mode3d = false;
  }
  else {
    this.options.mode3d = true;
    this.add3dLayer(map, id)
    map.easeTo({
      center: map.getCenter(),
      pitch: 55,
    });
  }

  // map.once("idle", () => {
  //   this.hideSpinner();
  // });
}


export function changeColor(selectedColor) {
  let map = this.map;
  let currentColor = this.options.currentLayerState.color;
  if(selectedColor === ' invert') {
    this.options.colorSCheme.invert = true
  } else {
    this.options.colorSCheme.invert = false,
    this.options.colorSCheme.color = selectedColor
  }
  if(!this.getLayer(this.options.currentLayerState.hexSize)) {
    return;
  }
  if (selectedColor === "original") {
    if (this.options.currentLayerState.dataLayer === "depth") {
      this.options.currentLayerState.color = colors.colorNatural["ocean-depth"]; //colors.colorSeq["ocean"];
    } else if (this.options.currentLayerState.dataLayer.substring(0, 2) === "1a") {
      this.options.currentLayerState.color = colors.colorDiv.gdpColor;
    } else if (this.options.currentLayerState.dataLayer.substring(0, 2) === "1c") {
      this.options.currentLayerState.color = colors.colorSeq["pop"];
    } else if (this.options.currentLayerState.dataLayer === "7d10") {
      this.options.currentLayerState.color = colors.colorSeq["combo"];
    } else if (this.options.currentLayerState.dataLayer === "7d5") {
      this.options.currentLayerState.color = colors.colorSeq["minty"];
    } else if (this.options.currentLayerState.dataLayer === "7d7") {
      this.options.currentLayerState.color = colors.colorSeq["blues"];
    } else if (this.options.currentLayerState.dataLayer === "7d4") {
      this.options.currentLayerState.color = colors.colorSeq["pinkish"];
    } else if (this.options.currentLayerState.dataLayer === "7d8") {
      this.options.currentLayerState.color = colors.colorSeq["silvers"];
    } else if (this.options.currentLayerState.dataLayer === "d") {
      //breaks = [-4841, -3805, -2608, -1090, 1322];
      this.options.currentLayerState.color = colors.colorNatural["ocean-depth"]; //colors.colorSeq["ocean"];
    } else {
      this.options.currentLayerState.color = colors.colorSeq["yellow-blue"];
    }
  }

  if (selectedColor === "invert") {
    // var reverse = currentColor.reverse();
    let reverse = [...currentColor].reverse();
    this.options.currentLayerState.color = reverse;
  } else if (selectedColor === "red") {
    this.options.currentLayerState.color = colors.colorSeq["pinkish"];
  } else if (selectedColor === "purple") {
    this.options.currentLayerState.color = colors.colorSeq["purple"];
  } else if (selectedColor === "blue") {
    this.options.currentLayerState.color = colors.colorSeq["blues"];
  } else if (selectedColor === "colorblind-safe") {
    this.options.currentLayerState.color = colors.colorSeq["colorBlindGreen"];
  }

  map.setPaintProperty(this.options.currentLayerState.hexSize, "fill-color", [
    "interpolate",
    ["linear"],
    ["get", this.options.currentLayerState.dataLayer],
    this.options.currentLayerState.breaks[0],
    this.options.currentLayerState.color[0],
    this.options.currentLayerState.breaks[1],
    this.options.currentLayerState.color[1],
    this.options.currentLayerState.breaks[2],
    this.options.currentLayerState.color[2],
    this.options.currentLayerState.breaks[3],
    this.options.currentLayerState.color[3],
    this.options.currentLayerState.breaks[4],
    this.options.currentLayerState.color[4],
  ]);

  if(this.options.mode3d) {
    map.setPaintProperty(this.options.currentLayerState.hexSize+'-3d', "fill-extrusion-color", [
      "interpolate",
      ["linear"],
      ["get", this.options.currentLayerState.dataLayer],
      this.options.currentLayerState.breaks[0],
      this.options.currentLayerState.color[0],
      this.options.currentLayerState.breaks[1],
      this.options.currentLayerState.color[1],
      this.options.currentLayerState.breaks[2],
      this.options.currentLayerState.color[2],
      this.options.currentLayerState.breaks[3],
      this.options.currentLayerState.color[3],
      this.options.currentLayerState.breaks[4],
      this.options.currentLayerState.color[4],
    ]);
  }

  let features = map.queryRenderedFeatures({
    layers: [this.options.currentLayerState.hexSize],
  });

  let selectedData = features.map(
    (x) => x.properties[this.options.currentLayerState.dataLayer]
  );

  let breaksAndColors= this.computeBreaksAndColorRamp(
    selectedData,
    this.options.currentLayerState.color,
     "q", 4,
    this.options.currentLayerState.breaks
  );

  this.emit('layerUpdate', {
    colorRamp: breaksAndColors.colorRamp,
    breaks: breaksAndColors.histogramBreaks,
    selectedData,
    precision: this.options.precision
  });
}

export function changeOpacity(opacity) {
  let map = this.map;
  this.options.opacity = opacity;
  if(!map.getLayer(this.options.currentLayerState.hexSize)) {
    return;
  }
  map.setPaintProperty(
    this.options.currentLayerState.hexSize,
    "fill-opacity",
    opacity
  );
  if (map.getLayer("ocean")) {
    map.setPaintProperty("ocean", "fill-opacity", opacity);
  }
  // if (globals.compareMode) {
  //   this.map2.setPaintProperty(
  //     globals.comparisonLayerState.hexSize,
  //     "fill-opacity",
  //     sliderValue * 0.02
  //   );
  //   if (this.map2.getLayer("ocean")) {
  //     // console.log(`adjusting "ocean" layer opacity`);
  //     this.map2.setPaintProperty("ocean", "fill-opacity", sliderValue * 0.02);
  //   }
  // }
  //update global opacity value
  this.options.opacity = opacity;
}

export function changeBasemap (selectedBasemap) {
  let self = this;
  let map = this.map;
  // let map2 = this.map2;

  // let currentBasemap = map.getStyle().name;

  let thisStyle = Object.values(constants.styles).find((style) => {
    return style.name === selectedBasemap;
  });

  map.setStyle(thisStyle.uri);
    // map2.setStyle(thisStyle.uri);
  this._removeUnusedLayers();

  //when done, update: firstSymbolId, basemapLabels
  map.once("idle", function () {
    self.getBasemapLabels();

    self._addVectorSources();
    // let currentSource = Object.values(globals.sourceData).find((o) => {
    //   return o.name === globals.currentLayerState.hexSize;
    // });

    // let cls = globals.currentLayerState;
    if(self.activeLayer) {
      self.updateData(self.activeDataset, self.activeLayer)
    }
    // try {
    //   map.addLayer(
    //     {
    //       id: cls.hexSize,
    //       type: "fill",
    //       source: cls.hexSize,
    //       "source-layer": currentSource.layer,
    //       layout: {
    //         visibility: "visible",
    //       },
    //       paint: {
    //         "fill-opacity": globals.opacity, //0.8
    //         "fill-color": [
    //           "interpolate",
    //           ["linear"],
    //           ["get", cls.dataLayer],
    //           cls.breaks[0],
    //           cls.color[0],
    //           cls.breaks[1],
    //           cls.color[1],
    //           cls.breaks[2],
    //           cls.color[2],
    //           cls.breaks[3],
    //           cls.color[3],
    //           cls.breaks[4],
    //           cls.color[4],
    //         ],
    //       },
    //     },
    //     globals.firstSymbolId
    //   );
    //
    //   let filterString = cls.dataLayer === "depth" ? "<=" : ">=";
    //   map.setFilter(cls.hexSize, [filterString, cls.dataLayer, 0]);
    //   map.moveLayer("allsids", globals.firstSymbolId);
    // }

    // self._addVectorSources(true);
    // let comparisonSource = Object.values(this.options.sourceData).find((o) => {
    //   return o.name === this.options.comparisonLayerState.hexSize;
    // });

    // let comparison_cls = this.options.comparisonLayerState;

  //   try {
  //     map2.addLayer(
  //       {
  //         id: comparison_cls.hexSize,
  //         type: "fill",
  //         source: comparison_cls.hexSize,
  //         "source-layer": comparisonSource.layer,
  //         layout: {
  //           visibility: "visible",
  //         },
  //         paint: {
  //           "fill-opacity": globals.opacity, //0.8
  //           "fill-color": [
  //             "interpolate",
  //             ["linear"],
  //             ["get", comparison_cls.dataLayer],
  //             comparison_cls.breaks[0],
  //             comparison_cls.color[0],
  //             comparison_cls.breaks[1],
  //             comparison_cls.color[1],
  //             comparison_cls.breaks[2],
  //             comparison_cls.color[2],
  //             comparison_cls.breaks[3],
  //             comparison_cls.color[3],
  //             comparison_cls.breaks[4],
  //             comparison_cls.color[4],
  //           ],
  //         },
  //       },
  //       globals.firstSymbolId
  //     );
  //
  //     let filterString = comparison_cls.dataLayer === "depth" ? "<=" : ">=";
  //     map2.setFilter(comparison_cls.hexSize, [
  //       filterString,
  //       comparison_cls.dataLayer,
  //       0,
  //     ]);
  //
  //     map2.moveLayer("allsids", globals.firstSymbolId); //ensure allsids outline ontop
  //   } catch (err) {
  //     if (debug) {
  //       console.warn(
  //         "attempted while no data layer is loaded on comparison map"
  //       );
  //       console.warn(err.stack);
  //     }
  //     //placed to catch error when attempted while no data layer is loaded on main map
  //   }
  //
  //   self.hideSpinner();
  });
}
export function toggleLabels(label) {
  let map = this.map;

  if (label == true) {
    this.options.basemapLabels.forEach((x) => {
      //console.log(x);
      map.addLayer(x);
      if (x.type === "line") {
        if (map.getLayer(this.options.currentLayerState.hexSize)) {
          map.moveLayer(x.id, this.options.currentLayerState.hexSize);
        }
      }
    });
  } else {
    this.options.basemapLabels.forEach(function (x) {
      map.removeLayer(x.id);
    });
  }

  // map.once("idle", () => {
  //   this.hideSpinner();
  // });
}

export function startRegionAnalisys(){
  if (this.draw === null) {
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
      },
    });
    let drawControlsDiv = document.getElementById("drawControls");
    drawControlsDiv.appendChild(
      this.draw.onAdd(this.map)
    );
    this._addDrawListeners(this);
  }
  this.draw.changeMode("draw_polygon");
}