<template>
  <div class="home">
    <Header
      title="WeUI Icon ( Beta )"
      desc="weui-icon 是一套同微信原生视觉体验一致的基础图标库，由微信官方设计团队为微信内网页量身设计，令用户的使用感知更加统一。"
    ></Header>
    <ul class="icon-list">
      <li :key="svgTypeName" v-for="(typeSvgIcons, svgTypeName) in svgIcons">
        <h4>{{ svgTypeName }}</h4>
        <label
          class="icon-wrap"
          v-for="(svgText, svgName) in typeSvgIcons"
          :key="svgName"
          :for="svgTypeName + '|' + svgName"
        >
          <input
            :id="svgTypeName + '|' + svgName"
            type="checkbox"
            name="icon"
            :value="svgTypeName + '|' + svgName"
            v-model="checkedNames"
          />
          <Icon :type="svgTypeName" :name="svgName" :map="typeSvgIcons"></Icon>
        </label>
      </li>
    </ul>
    <a href="javascript:" class="weui-btn weui-btn_primary" @click="download">
      Download {{ checkedNames.length ? 'Selected' : 'All' }}
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import weui from 'weui.js';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Header from '@/components/Header.vue';
import Icon from '@/components/Icon.vue';
import svgIcons from '@/../styles/weui-icon.js';

export default Vue.extend({
  components: {
    Header,
    Icon,
  },
  data() {
    return {
      svgMap: {},
      svgIcons,
      checkedNames: [],
    };
  },
  beforeCreate() {
    const style = document.createElement('style');
    const svgMap: Record<string, string> = {};
    for (const type in svgIcons) {
      for (const name in svgIcons[type]) {
        if (svgIcons[type].hasOwnProperty(name)) {
          svgMap[`${type}-${name}`] = svgIcons[type][name];
        }
      }
    }

    style.type = 'text/css';
    style.innerHTML = svg2css(svgMap);
    document.head.appendChild(style);
  },
  methods: {
    getSVGMap(): Record<string, string> {
      if (this.$data.checkedNames.length) {
        const svgMap: Record<string, string> = {};
        this.$data.checkedNames.forEach((value: string) => {
          const [type, name] = value.split('|');
          svgMap[`${type}-${name}`] = this.$data.svgIcons[type][name];
        });
        return svgMap;
      } else {
        return this.svgMap;
      }
    },
    download(): void {
      const actionSheet = weui.actionSheet(
        [
          {
            label: 'Download CSS',
            onClick: () => {
              const blob = new Blob([svg2css(this.getSVGMap())], {
                type: 'text/plain;charset=utf-8',
              });
              saveAs(blob, 'weui-icon.css');
            },
          },
          {
            label: 'Download SVG',
            onClick: () => {
              const zip = new JSZip();
              const svgMap = this.getSVGMap();

              for (const name in svgMap) {
                if (svgMap.hasOwnProperty(name)) {
                  zip.file(`weui-icon-${name}.svg`, svgMap[name]);
                }
              }
              zip.generateAsync({ type: 'blob' }).then(function(content: Blob) {
                saveAs(content, 'weui-icon.zip');
              });
            },
          },
          {
            label: 'Download CSS & SVG',
            onClick: () => {
              const zip = new JSZip();
              const svgMap = this.getSVGMap();
              const svgFolder = zip.folder('svg');

              for (const name in svgMap) {
                if (svgMap.hasOwnProperty(name)) {
                  svgFolder.file(`weui-icon-${name}.svg`, svgMap[name]);
                }
              }
              zip.file('weui-icon.css', svg2css(svgMap));
              zip.generateAsync({ type: 'blob' }).then(function(content: Blob) {
                saveAs(content, 'weui-icon.zip');
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

<style scoped lang="less">
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
  width: 200px;
}
.icon-wrap {
  position: relative;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: #777;
  }

  input[type='checkbox'] {
    position: absolute;
    visibility: hidden;

    &:checked + [class^='weui-icon-'] {
      color: #07c160;
    }
  }
}
</style>
