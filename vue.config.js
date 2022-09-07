const { defineConfig } = require('@vue/cli-service')
const { NaiveUiResolver } = require('unplugin-vue-components/resolvers')
const { name } = require('./package.json')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081, // 端口要写死，因为主应用中配置子应用列表时用的是写死的端口配置
    allowedHosts: 'auto', // 关闭主机检查，保证子应用可以被主应用fetch到
    headers: {
      'Access-Control-Allow-Origin': '*', // 配置跨域请求头，解决开发环境跨域问题
    },
  },
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack')({
        imports: ['vue', 'vue-router', 'pinia'],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        dts: false,
        // eslint报错解决
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      require('unplugin-vue-components/webpack')({
        // 指定组件位置，默认是src/components
        dirs: ['src/components'],
        // ui库解析器
        resolvers: [NaiveUiResolver()],
        extensions: ['vue'],
        // ts配置文件生成位置
        dts: false,
      }),
      require('unplugin-vue-define-options/webpack')(),
    ],
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoading: 'jsonp', // webpack5 舍弃了 jsonpFunction 配置，换做这种能跑通
    },
  },
})
