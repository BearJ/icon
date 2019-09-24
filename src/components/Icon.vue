<template>
  <div :class="'weui-icon-' + type + '-' + name" @click="showCSSText"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import copy from 'clipboard-copy';
import weui from 'weui.js';

export default Vue.extend({
  props: {
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    map: {
      type: Object as () => Record<string, string>,
    },
  },
  methods: {
    showCSSText(): void {
      copy(this.map[this.name]).then((): void => {
        weui.toast('Copy!', {
          duration: 800,
        });
      });
    },
  },
});
</script>
