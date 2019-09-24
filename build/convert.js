const fs = require('fs');
const path = require('path');
const srcDir = path.resolve('./src/assets');
const distDir = path.resolve('./styles/');
const rimraf = require('rimraf');
const { singleFileTmpl, allFileHeaderTmpl, allFileTmpl } = require('./tmpl');
rimraf.sync(distDir);
fs.mkdirSync(distDir);

const ALL_FILE_NAME = 'weui-icon';

function encodeSVG(svg) {
  return encodeURIComponent(svg.replace(/<\?xml.+\?>|<!DOCTYPE.+]>/g, ''))
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%22/g, "'");
}
function writeFile(fileDirPath, fileName, content) {
  const fileDir = path.resolve(distDir, fileDirPath);
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }

  fs.appendFileSync(path.resolve(fileDir, fileName), '');
  fs.writeFileSync(path.resolve(fileDir, fileName), content, 'utf-8');
}

// 根据assets的svg文件，生成对应的less文件
const svgDirs = fs.readdirSync(srcDir);
let allStyle = '';
let map = {};
svgDirs.forEach(svgDir => {
  const dirPath = path.resolve(srcDir, svgDir);
  const svgFiles = fs.readdirSync(dirPath);
  map[svgDir] = {};

  svgFiles.forEach(filePath => {
    const fileName = path.basename(filePath, '.svg');
    const svg = fs.readFileSync(path.resolve(dirPath, filePath), 'utf-8');
    const singleContent = singleFileTmpl
      .replace(/\[dir]/g, svgDir)
      .replace(/\[name]/g, fileName)
      .replace(/\[svg]/g, encodeSVG(svg));

    writeFile(svgDir, `${fileName}.css`, singleContent);
    fs.copyFileSync(
      path.resolve(dirPath, filePath),
      path.resolve(distDir, svgDir, `${fileName}.svg`),
    );

    map[svgDir][fileName] = singleContent;
    allStyle += allFileTmpl
      .replace(/\[dir]/g, svgDir)
      .replace(/\[name]/g, fileName)
      .replace(/\[svg]/g, encodeSVG(svg))
      .concat('\n');
  });
});

// 生成一个总的less文件
allStyle = `${allFileHeaderTmpl}\n${allStyle}`;
writeFile('.', `${ALL_FILE_NAME}.css`, allStyle);

// 生成一个map
map[ALL_FILE_NAME] = allStyle;
writeFile(
  '.',
  `${ALL_FILE_NAME}.js`,
  `module.exports = ${JSON.stringify(map)}`,
);
