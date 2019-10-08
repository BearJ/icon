const fs = require('fs');
const path = require('path');
const srcDir = path.resolve('./src/assets');
const distDir = path.resolve('./styles/');
const rimraf = require('rimraf');
const svg2css = require('../src/libs/svg2css');
rimraf.sync(distDir);
fs.mkdirSync(distDir);

const ALL_FILE_NAME = 'weui-icon';

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
let convertMap = {};
let svgMap = {};
svgDirs.forEach(svgDir => {
  const dirPath = path.resolve(srcDir, svgDir);
  const svgFiles = fs.readdirSync(dirPath);
  svgMap[svgDir] = {};

  svgFiles.forEach(filePath => {
    const fileName = path.basename(filePath, '.svg');
    const svg = fs.readFileSync(path.resolve(dirPath, filePath), 'utf-8');
    const singleContent = svg2css({
      [`${svgDir}-${fileName}`]: svg,
    });
    convertMap[`${svgDir}-${fileName}`] = svg;

    svgMap[svgDir][fileName] = svg;
    writeFile(svgDir, `${fileName}.css`, singleContent);
    fs.copyFileSync(
      path.resolve(dirPath, filePath),
      path.resolve(distDir, svgDir, `${fileName}.svg`),
    );
  });
});

// 生成一个总的less文件
const allStyle = svg2css(convertMap);
writeFile('.', `${ALL_FILE_NAME}.css`, allStyle);

// 生成一个map
writeFile(
  '.',
  `${ALL_FILE_NAME}.js`,
  `/* eslint-disable */\nmodule.exports = ${JSON.stringify(svgMap)}`,
);
