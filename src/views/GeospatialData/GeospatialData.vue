<template>
  <div class="map-container">
    <v-btn
      @click="menuColapsed = !menuColapsed"
      class="button-collapse d-none d-md-block"
      :class="{'button-collapse-rotated' : menuColapsed}"
      fab
      x-small
      >
      <v-icon
        large
      >
        mdi-chevron-left
      </v-icon>
    </v-btn>
    <v-chip
      v-if="dualModeEnabled"
      small
      class="mode-chip d-none d-md-block"
      color="primary"
    >
      Comparison mode enabled
    </v-chip>
    <v-chip
      v-if="bivariateModeEnabled"
      small
      class="mode-chip d-none d-md-block"
      color="primary"
    >
      Bivariate mode enabled
    </v-chip>
    <map-controller
      :class="{'data-controller-colapsed': menuColapsed}"
      class="data-controller"
      :dualModeEnabled="dualModeEnabled"
      :bivariateModeEnabled="bivariateModeEnabled"
      :map="map"
      @updateBivarState="toggleBivar"
      @update="updateMap"
      @updateDual="updateComparisonMap($event.dataset, $event.layer, true)"
      @updateBivariate="updateBivariate"
    />
    <map-toolbar
      class="toolbar"
      :map="map"
      :activeLayer="activeLayer"
      :dualModeEnabled="dualModeEnabled"
      :bivariateModeEnabled="bivariateModeEnabled"
      @toggleBivar="toggleBivar"
      @toggleDual="toggleDual"
    />
    <selection-info
      v-if="map"
      :map="map"
      :activeLayer="activeLayer"
    />
    <map-loader
      v-if="gisLoader"
    />
    <div id="mapsContainer">
      <div id="map">
        <!-- <div class="loader-gis-modal">
          <grid-loader
            class="loader-gis display-none"
            :loading="gisLoader.loading"
            :color="gisLoader.color"
            :size="gisLoader.size"
          ></grid-loader>
        </div> -->
      </div>

      <div id="map2"></div>
    </div>
  </div>
</template>

<script>
import GIS from "@/gis/gis";
import MapController from "./children/MapController";
import SelectionInfo from "./children/SelectionInfo";
import MapToolbar from "./children/MapToolbar";
import MapLoader from "./children/MapLoader";

export default {
  name: "GeospatialData",
  data() {
    return {
      activeLayer:null,
      map: null,
      menuColapsed:false,
      dualModeEnabled: false,
      bivariateModeEnabled: false,
      gisLoader: true,
    };
  },
  components: {
    MapToolbar,
    MapController,
    SelectionInfo,
    MapLoader
  },
  methods: {
    toggleBivar(e) {
      this.bivariateModeEnabled = e;
      if(this.dualModeEnabled) {
        this.dualModeEnabled = false;
        this.map.toggleMapboxGLCompare(this.dualModeEnabled);
      }
      this.map.toggleBivariateComponents(e)
    },
    toggleDual(e) {
      this.dualModeEnabled = e;
      if(this.bivariateModeEnabled) {
        this.bivariateModeEnabled = false;
        this.map.toggleBivariateComponents(this.bivariateModeEnabled)
      }
      this.map.toggleMapboxGLCompare(e);
    },
    updateBivariate({dataset, layer, secondDataset, secondLayer}) {
      this.map.createBivariate(
        dataset,
        layer,
        secondDataset,
        secondLayer
      );
    },

    updateComparisonMap(activeDataset, activeLayer) {
      if (activeLayer) {
        if (activeLayer.Name === "Ocean Data") {
          if (activeLayer.Field_Name === "depth") {
            this.map.addOcean(activeDataset, activeLayer, true);
          } else {
            this.map.updateData(activeDataset, activeLayer, true);
          }
        } else {
          this.map.updateData(activeDataset, activeLayer, true);
        }
      }
    },
    updateMap(e) {
      this.activeLayer = e.layer
      if (e.dataset) {
        if (e.layer.Name === "Ocean Data") {
          if (e.layer.Field_Name === "depth") {
            this.map.addOcean(e.dataset, e.layer);
          } else {
            this.map.updateData(e.dataset, e.layer);
          }
        } else {
          this.map.updateData(e.dataset, e.layer);
        }
      }
    },
    enebleLoader() {
      this.gisLoader = true;
    },
    disableLoder() {
      this.gisLoader = false;
    }
  },
  mounted() {
    this.map = new GIS("#mapsContainer", "map", "map2");
    this.map.on('loadingStart', this.enebleLoader)
    this.map.on('loadingEnd', this.disableLoder)
  },
  unmounted() {
    this.map.off('loadingStart', () => {
      this.gisLoader = true;
    })
    this.map.off('loadingEnd', () => {
      this.gisLoader = false;
    })
  }
};
</script>
<style media="screen">
.toolbar {
  position:absolute;
  z-index:98;
  top: 2em;
  right:11px;
}
/* portrait devices smaller than tablets */
@media (orientation: portrait) and (max-width: 750px) {
  .landscape-enforcer {
    display: block;
  }
}
/* portrait devices as big as tablets */
@media (orientation: portrait) and (min-width: 750px) {
  .landscape-enforcer {
    display: none;
  }
}

/* landscape for devices smaller than laptops */
@media (orientation: landscape) and (max-width: 1200px) {
  .analysis-tools {
    display: none !important;
    /* used to hide analysis tools from mobile devices */
  }
}

/* */
@media (orientation: landscape) {
  .landscape-enforcer {
    display: none;
  }
}

.mapboxgl-popup-content {
  overflow-y: scroll;
  overflow-x: scroll;
  max-height: 50vh;
}

#map,
#map2 {
  height: 100vh;
  width: 100%;
}
.map-container {
  position: relative;
  padding: 0 !important;
  height: 100vh;
  width: 100%;
}
.data-controller {
  position: absolute;
  left: 2em;
  top: 2em;
  width: 400px;
  z-index: 999;
  transition: 0.5s ease-in-out all;
  opacity: 1;
}
/* FOR LEGEND ??*/

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  display: none;
}

::-webkit-scrollbar-thumb {
  background: #9e9e9e;
  border-radius: 10px;
}

/* onclick of hexes mapbox control bottom-right */
.my-custom-control {
  /* display: block; */
  display: none;
  background-color: rgba(221, 221, 221, 0.9);
  height: 0px;
  width: 0px;
  padding: 5px;
}

.data-controller-colapsed {
  opacity: 0;
  z-index: -999;
  left: -30px;
  pointer-events: none;
}

.mapbox-gl-draw_polygon.active,
.mapbox-gl-draw_polygon.active:hover {
  background-color: rgb(42, 155, 42);
}

#mapsContainer {
  /* position: relative; */
  /*  height: 100%;
  width: 100%; */
  height: 100vh;
}
#mapsContainer #map,
#mapsContainer #map2 {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
}
.button-collapse {
  position:absolute;
  top: 4px;
  left: 4px;
  z-index: 1000;
  transform: rotate(0deg);
  transition: all 200ms;
  background: rgba(221, 221, 221, 0.9);
}
.button-collapse-rotated {
  transform: rotate(180deg);
}
.mode-chip {
  position: absolute;
  top: 20px;
  left: 60px;
  z-index: 1000;
}

@media (max-width:959px) {
  .toolbar {
    top: auto;
    bottom: 70px;
    width: 90%;
    right: 5%;
  }

  #mapsContainer, .map-container {
    height: calc(100vh - 68px);
  }
  #mapsContainer #map,
  #mapsContainer #map2  {
    height: calc(100vh - 68px);
    width: 100%;
  }
  .data-controller {
    width: 90%;
    left: 5%;
  }
}
</style>
