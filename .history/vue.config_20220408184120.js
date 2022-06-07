module.exports = {
    publicPath: './',
    devServer: { //线上不存在跨域问题
        open: true,
        // port: 8088,
        // port: 8089,
        port:8081,
        // 代理 仅仅只是你在开发环境中(写代码时)要使用的解决跨域，
        // 仅仅只是用来测试数据接入的
        // 跨域问题，千万不要问任何人，只需你自己对接 写 后台接口开发者！！！
        proxy: {
            '/api': {
                // target: 'http://musicapi.h5sm.com',
                target: 'http://h5.dream520.work',
                changeOrigin: true,
                pathRewrite: { "^/api" : "" },
            }
        }
    }
}
