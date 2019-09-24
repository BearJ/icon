<template>
  <div class="home">
    <Header
      title="WeUI Icon"
      desc="weui-icon 是一套同微信原生视觉体验一致的基础图标库，由微信官方设计团队为微信内网页量身设计，令用户的使用感知更加统一。"
    ></Header>
    <ul class="icon-list">
      <li :key="svgTypeName" v-for="(typeSvgIcons, svgTypeName) in svgIcons">
        <h4>{{ svgTypeName }}</h4>
        <div>
          <Icon
            v-for="(svgStyle, svgName) in typeSvgIcons"
            :key="svgName"
            :type="svgTypeName"
            :name="svgName"
            :map="typeSvgIcons"
          ></Icon>
        </div>
      </li>
    </ul>
    <a
      href="javascript:"
      class="weui-btn weui-btn_primary"
      @click="downloadAll"
    >
      Download All
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import Icon from '@/components/Icon.vue';
import svgIcons from '@/../styles/weui-icon.js';

let allStyle: string = '';
export default Vue.extend({
  components: {
    Header,
    Icon,
  },
  data() {
    return {
      svgIcons,
    };
  },
  beforeCreate() {
    allStyle = svgIcons['weui-icon'];
    delete svgIcons['weui-icon'];

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = allStyle;
    document.head.appendChild(style);
  },
  methods: {
    downloadAll() {
      const eleLink = document.createElement('a');
      const blob = new Blob([allStyle]);
      eleLink.download = 'weui-icon.css';
      eleLink.style.display = 'none';
      eleLink.href = URL.createObjectURL(blob);
      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
    },
  },
});
</script>

<style scoped lang="less">
[class^='weui-icon-'] {
  margin: 10px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:active {
    color: rgba(0, 0, 0, 0.5);
  }
}
li {
  margin-bottom: 16px;
}
h4 {
  font-size: 20px;
}
.icon-list {
  padding: 0 30px;
}
.weui-btn {
  margin-top: 40px;
  font-weight: 400;
}
</style>
