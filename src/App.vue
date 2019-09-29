<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import 'weui';
import '@/libs/svg2css';

export default {};
</script>

<style lang="less">
* {
  margin: 0;
}
h1,
h2,
h3,
h4,
h5 {
  font-weight: 400;
}
ul {
  list-style: none;
}
body {
  background-color: #ededed;
}
</style>
