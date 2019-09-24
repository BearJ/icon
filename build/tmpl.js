/* eslint-disable */
const commonStyle =
`display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background-color: currentColor;`
;

const singleFileTmpl =
`.weui-icon-[dir]-[name] {
  ${commonStyle}
  -webkit-mask: url("data:image/svg+xml;charset=utf-8,[svg]") center center / contain no-repeat;
}`
;

const allFileHeaderTmpl =
`[class^='weui-icon-'] {
  ${commonStyle}
  -webkit-mask: none center center / contain no-repeat;
}`
;

const allFileTmpl =
`.weui-icon-[dir]-[name] {
  -webkit-mask-image: url("data:image/svg+xml;charset=utf-8,[svg]");
}`
;
module.exports = {
  singleFileTmpl, allFileHeaderTmpl, allFileTmpl
};
/* eslint-disable */
