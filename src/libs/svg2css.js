/* eslint-disable */
const commonStyle =
`display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background-color: currentColor;`;

const singleFileTmpl =
`.weui-icon-[name] {
  ${commonStyle}
  -webkit-mask: url("data:image/svg+xml;charset=utf-8,[svg]") center center / contain no-repeat;
}`;

const allFileHeaderTmpl =
`[class^='weui-icon-'] {
  ${commonStyle}
  -webkit-mask: none center center / contain no-repeat;
}
`;

const allFileTmpl =
`.weui-icon-[name] {
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,[svg]");
}`;
/* eslint-disable */


function encodeSVG(svg) {
  return encodeURIComponent(svg)
  .replace(/%20/g, ' ')
  .replace(/%3D/g, '=')
  .replace(/%3A/g, ':')
  .replace(/%2F/g, '/')
  .replace(/%22/g, "'");
}

function svg2css(svgMaps) {
  const svgNames = Object.keys(svgMaps);
  if (svgNames.length === 1) {
    const svgName = svgNames[0];

    return singleFileTmpl
    .replace(/\[name]/g, svgName)
    .replace(/\[svg]/g, encodeSVG(svgMaps[svgName]));
  } else {
    let allStyle = allFileHeaderTmpl;

    svgNames.forEach((svgName) => {
      allStyle += allFileTmpl
      .replace(/\[name]/g, svgName)
      .replace(/\[svg]/g, encodeSVG(svgMaps[svgName]))
      .concat('\n');
    });

    return allStyle;
  }
}

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.svg2css = factory();
  }
}(typeof window === 'object' ? window : this, function () {
  return svg2css;
}));
