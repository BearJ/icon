<template>
  <div class="header">
    <h1>{{ title }}</h1>
    <p>{{ desc }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: String,
    desc: String,
  },
});
</script>

<style scoped lang="less">
.header {
  padding: 40px;
}

h1 {
  font-size: 30px;
  font-weight: 300;
  line-height: 1;
  margin-bottom: 15px;
}

p {
  color: rgba(0, 0, 0, 0.5);
  text-align: left;
  font-size: 14px;
}
</style>
