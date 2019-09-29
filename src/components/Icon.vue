<template>
  <div :class="'weui-icon-' + type + '-' + name" @click="clickIcon"></div>
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
  created() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = svg2css({
      [`${this.type}-${this.name}`]: this.map[this.name],
    });
    document.head.appendChild(style);
  },
  methods: {
    clickIcon(): void {
      const actionSheet = weui.actionSheet(
        [
          {
            label: 'Copy CSS',
            onClick: () => {
              copy(
                svg2css({
                  [`${this.type}-${this.name}`]: this.map[this.name],
                }),
              ).then((): void => {
                weui.toast('Copy!', {
                  duration: 800,
                });
              });
            },
          },
          {
            label: 'Copy SVG',
            onClick: () => {
              copy(this.map[this.name]).then((): void => {
                weui.toast('Copy!', {
                  duration: 800,
                });
              });
            },
          },
        ],
        [
          {
            label: 'Cancel',
            onClick: () => {
              actionSheet.hide();
            },
          },
        ],
      );
    },
  },
});
</script>
