/*
* @Author: Administrator
* @Date:   2020-06-28 16:32:42
* @Last Modified by:   Administrator
* @Last Modified time: 2020-06-28 21:14:52
*/
module.exports = {
  // runtimeCompiler: true,
  publicPath: '/', // 设置打包文件相对路径
  devServer: {
    // open: process.platform === 'darwin',
    host: 'localhost',
    port: 8080,
    open: true, //配置自动启动浏览器 
    https:false,
    hotOnly:false,
    //接口代理
      proxy: {
        '/news': {
          target: 'http://v.juhe.cn/toutiao',//设置要代理访问的接口---这是头条的接口
          changeOrigin: true,
          pathRewrite: {
            '^/news': ''//重写访问地址，在请求时可以省略target的地址，直接以/news开头
          }
        },
        '/api': {
          target: 'http://localhost:3000',//设置要代理访问的接口----这是我自己的接口
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''  //重写访问地址，在请求时可以省略target的地址，直接以/api开头
          }
        }
      }


   }, 
}