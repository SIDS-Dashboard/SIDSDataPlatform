<template>
  <v-menu
    eager
    transition="none"
    open-delay="200"
    :max-width="maxWidth"
    close-delay="200"
    open-on-hover
    allow-overflow
    :max-height="maxHeight"
    :top="bottom ? false : true"
    :bottom="bottom ? true : false"
    :nudge-top="bottom ? 0 : 50"
    :nudge-bottom="bottom ? 50 : 0"
    :content-class="'tooltip-content ' + contentClass"
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          v-if="hasButtonSlot"
          v-bind="attrs"
          v-on="on">
          <slot  name="button"
          ></slot>
        </div>
        <v-icon
          v-else
          v-bind="attrs"
          :disabled="disabled"
          v-on="on"
          :large="large"
        >
          mdi-information-outline
        </v-icon>
      </template>
      <div v-if="hasContentSlot">
          <slot name="content"></slot>
      </div>
      <v-card v-else>
        <v-card-title><slot v-if="hasIconSlot" name="icon"></slot>{{textContent[contentName].title}}</v-card-title>
        <v-card-text v-html="textContent[contentName].content">
        </v-card-text>
      </v-card>
    </v-menu>
</template>

<script>
import { mapState } from 'vuex';
import size from '@/mixins/size.mixin';

export default {
  name: 'InfoHoverTooltip',
  props:['contentName', 'large', 'disabled', 'contentClass', 'bottom'],
  mixins:[size],
  computed: {
    ...mapState({
      textContent: (state) => state.texts.textContent
    }),
    hasContentSlot() {
      return this.$slots['content']
    },
    hasButtonSlot() {
      return this.$slots['button']
    },
    hasIconSlot() {
      return this.$slots['icon']
    },
    maxWidth() {
      return this.isMobile ? '95%' : '800px'
    },
    maxHeight() {
      return this.isMobile ? '60%' : 'auto'
    }
  }
}
</script>

<style scoped>

</style>
