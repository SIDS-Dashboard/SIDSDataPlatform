<template>
  <div class="tooltip-root">
    <h4 class="block-subheader">{{header}}</h4>
    <v-list dense class="indicators-list">
      <v-list-item-group>
        <v-list-item class="p-0">
          <v-list-item-content class="one-line">
            <v-list-item-title class="one-line_header one-line_header_full" v-text="'Definition:'"></v-list-item-title>
            <v-list-item-subtitle class="one-line_subtitle">{{definition}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item  class="p-0">
          <v-list-item-content class="one-line">
            <v-list-item-title class="one-line_header one-line_header_full" v-text="'Source:'"></v-list-item-title>
            <v-list-item-subtitle><a :href="link" target="_blank">{{source}}</a></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item  class="p-0">
          <v-list-item-content class="one-line">
            <v-list-item-title class="one-line_header one-line_header_full" v-text="'SIDS Data:'"></v-list-item-title>
            <v-list-item-subtitle><router-link :to="`/development-indicators/${code}/recentValue/bars`">{{header}}</router-link></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item  class="p-0">
          <v-list-item-content class="one-line">
            <v-list-item-title class="one-line_header one-line_header_full" v-text="'Rank:'"></v-list-item-title>
            <v-list-item-subtitle>{{rank}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item  class="p-0">
          <v-list-item-content class="one-line">
            <v-list-item-title class="one-line_header one-line_header_full" v-text="'Value:'"></v-list-item-title>
            <v-list-item-subtitle>{{value}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'ProfilesSpiderChartTooltip',
  props: ['header','source','code','rank','value','definition', 'link'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tooltip-root {
  max-width: 400px;
}
.indicators-list {
  padding-bottom: 0;
}
.indicators-list .one-line {
  flex-wrap: nowrap;
  align-items: flex-start;
  padding: 4px 0;
}
.indicators-list .v-list-item {
  min-height: 25px;
}
.indicators-list .one-line_subtitle{
  white-space: normal;
}
</style>
