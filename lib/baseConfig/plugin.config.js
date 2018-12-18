// Change theme plugin

const AntDesignThemePlugin  = require('antd-theme-webpack-plugin');
const path  = require('path');

module.exports = config => {
  // 将所有 less 合并为一个供 themePlugin使用
  const outFile = path.join(__dirname, '../.temp/site.less');
  const stylesDir = path.join(__dirname, '../src/');

  config.plugin('ant-design-theme').use(AntDesignThemePlugin, [
    {
      antDir: require.resolve('antd').replace('lib/index.js', ''),
      stylesDir,
      varFile: require.resolve('antd/lib/style/themes/default.less'),
      mainLessFile: outFile, //     themeVariables: ['@primary-color'],
      indexFileName: 'index.html',
    },
  ]);
};
