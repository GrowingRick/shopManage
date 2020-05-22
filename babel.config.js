// 项目发布阶段用得到的 babel 插件
const productionPlugins = []
if (process.env.NODE_ENV === 'production') {
  productionPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布产品时候的插件数组
    ...productionPlugins,
    '@babel/plugin-syntax-dynamic-import'
  ]
}
