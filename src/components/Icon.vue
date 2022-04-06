<template>
  <div :class="nameWithPrefix" :title="nameWithPrefix"></div>
</template>

<script lang="ts">
import Vue from 'vue';

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
  computed: {
    nameWithPrefix() {
      return 'weui-icon-' + this.type + '-' + this.name;
    },
  },
});
</script>
