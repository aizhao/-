module.exports = {
  publicPath: "./", // 打包路径，使用相对路径生成的dist文件夹下的index可以打开
  outputDir: "dist", // 输出文件目录
  productionSourceMap: false, // 取消生成map文件
  lintOnSave: false, // 配置关闭eslint  (代码会有红色热浪提示错 但不影响代码运行)
  // webpack-dev-server 相关配置
  devServer: {
    open: true, // 自动打开浏览器
    host: "0.0.0.0",
    /* 设置为0.0.0.0则所有的地址均能访问 */
    port: 8080, // 端口号
    https: false, // 是否使用https协议
    // hotOnly: false, // 是否开启热更新
    // proxy: null // 设置代理
    // disableHostCheck: true, // 开启可以用自己的域名

    //【【【【【【【【【【【【【【【【【【【【【注意修改和配置代理后，一定要重启项目 否则无效或404】】】】】】】】】】】】】】】】】
    //【【【【【【【【【【【【【【【【【【【【【注意修改和配置代理后，一定要重启项目 否则无效或404】】】】】】】】】】】】】】】】】
    proxy: {
      //【【【【【【【【【【【【【【【 注意修改和配置代理后，一定要重启项目 否则无效或404】】】】】】】】】】】】】】】】】
      // 配置多个代理
      "/login": {
        target: "http://music.cyrilstudio.top/", //这里的是.cn还是.com 只会影响你本地启动项目时候会调用哪个数据库的数据，而不会影响测试和线上环境调用对应的接口的。（一般都是本地调用.cn；等本地需要调试线上bug时候，改成.com重启项目看线上bug）
        changeOrigin: true, //是否跨域
        secure: false, //如果是https请求 需要设置为true
        logLevel: "debug",
        //ws: true,//是否要代理 websocket
      },
      "/recommend": {
        target: "http://music.cyrilstudio.top/", //这里的是.cn还是.com 只会影响你本地启动项目时候会调用哪个数据库的数据，而不会影响测试和线上环境调用对应的接口的。（一般都是本地调用.cn；等本地需要调试线上bug时候，改成.com重启项目看线上bug）
        changeOrigin: true, //是否跨域
        secure: false, //如果是https请求 需要设置为true
        logLevel: "debug",
        //ws: true,//是否要代理 websocket
      },

      // 此处若使用 "/api1" 类似命名可能会导致请求时只截取api部分接口出现404错误，因此命名时尽量避免此类命名方式。
      // 既命名不要相似 有/api 就不要再出现/api2
    },
  },
};
