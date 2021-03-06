<template>
  <div>
    <v-row dense>
      <v-col>
        <v-autocomplete
          rounded
          class="map-input"
          dense
          hide-details
          :disabled='disabled'
          :value="dataset"
          @change="emitDatasetChange"
          :items="datasets"
          item-text="title"
          item-value="title"
          return-object
          :label="datasetLabel"
          outlined
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row
      class="spacing-row"
      v-if="dataset && dataset.layers.length > 1"
      dense
    >
      <v-col>
        <v-select
          rounded
          dense
          hide-details
          class="map-input"
          :value="layer"
          item-text="title"
          item-value="layerId"
          :items="dataset.layers"
          :label="layerLabel"
          @change="emitLayerChange"
          return-object
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row
      class="spacing-row"
      v-if="layer && datasetLayer && layer.years.length > 1 && layer.years.length < 6"
      dense
    >
      <v-col>
        <v-slider
          class="map-input"
          :tick-labels="ticksLabels"
          :max="layer.years.length - 1"
          step="1"
          ticks="always"
          tick-size="4"
          :value="activeYearIndex"
          @change="updateYearByIndex"
        ></v-slider>
      </v-col>
    </v-row>
    <v-row
      class="spacing-row"
      v-else-if="layer && datasetLayer && layer.years.length > 5"
      dense
    >
      <v-col>
        <v-select
          rounded
          dense
          hide-details
          class="map-input"
          :value="activeYear"
          :items="layer.years"
          :label="layerLabel"
          @change="updateYear"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row
      class="spacing-row"
      v-else-if="!dataset"
      dense
    ></v-row>
  </div>
</template>

<script>
import service from '@/services'
export default {
  name: 'LayersController',
  data() {
    return {
      activeYear: null,
      activeYearIndex: null
    }
  },
  props:[
    'datasets',
    'dataset',
    'datasetLabel',
    'layer',
    'layerLabel',
    'disabled',
  ],
  computed:{
    ticksLabels() {
      return this.layer && this.layer.years
    },
    datasetLayer() {
      return this.layer && this.dataset.layers.some(l => {
        return l.layerId === this.layer.layerId
      })
    }
  },
  methods: {
    async emitDatasetChange(dataset){
      console.log(dataset)
      this.$emit('datasetChange', dataset)
      if(dataset.layers.length === 1) {
        await this.emitLayerChange(dataset.layers[0])
      }
    },
    updateYearByIndex(year) {
      this.activeYearIndex = year;
      this.activeYear = this.layer.years[year]
      this.emitLayerChange(this.layer)
    },
    updateYear(year) {
      this.activeYearIndex = this.layer.years.findIndex(y => y === year);
      this.activeYear = [year];
      this.emitLayerChange(this.layer)
    },
    async emitLayerChange(layer){
      console.log(layer)
      let layerData = await service.loadGISLayer(layer.layerId)
      layerData.years = layer.years
      if(this.activeYear === null || !layer.years.some(y => y === this.activeYear)) {
        layerData.activeYear = this.activeYear = layer.years[0]
        this.activeYearIndex = 0;
      } else {
        layerData.activeYear = this.activeYear
      }
      if(layerData.years[this.activeYearIndex] !== this.activeYear) {
        this.activeYearIndex = layerData.years.findIndex(y => y === this.activeYear)
      }
      this.$emit('layerChange', layerData)
    },
  }
}
</script>

<style>

.spacing-row {
  height: 55px;
}
</style>
