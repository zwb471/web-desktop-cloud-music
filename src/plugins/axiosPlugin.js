"use strict";

import axios from "axios";
import {Modal} from "ant-design-vue"


// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: "http://musicapi.h5sm.com",
  baseURL: "http://h5.dream520.work",
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
      if (response.status && response.status === 200) {
        return response
      }
      return Promise.reject(response);
    },
    function(error) {
      // console.log(error.response)
      if (error.response)   {
        let res = error.response;
        // console.log(res)
        // console.log(error.message)
        switch (res.status) {
          case 301:

            Modal.warn({
              title: "请先登录",
              content: res.statusText + '，' + error.message
            })
            break;
          case 400:
            Modal.warn({
              title: "资源不在收藏列表中",
              content: res.statusText + '，' + error.message
            })
            break;
          case 401:
            Modal.warn({
              title: "请先登录",
              content: res.statusText + '，' + error.message
            })
            break;
          case 403:
            Modal.warn({
              title: "权限不足,拒绝访问",
              content: res.statusText + '，' + error.message
            })
            break;
          case 404:
            Modal.warn({
              title: "请求资源不存在",
              content: res.statusText + '，' + error.message
            })
            break;
          case 405:
            Modal.warn({
              title: "不允许的方法",
              content: res.statusText + '，' + error.message
            })
            break;

          case 500:
            Modal.warn({
              title: "服务器开小差啦",
              content: res.statusText + '，' + error.message
            })
            break;
          case 501:
            Modal.warn({
              title: "帐号不存在",
              content: res.statusText + '，' + error.message
            })
            break;
          case 502:
            Modal.warn({
              title: "密码错误",
              content: res.statusText + '，' + error.message
            })
            break;
          case 504:
            Modal.warn({
              title: "网络请求失败",
              content: res.statusText + '，' + error.message
            })
            break;
          default:
            Modal.error(res.statusText || error.message)
        }
      } else {
        Modal.error({
          title: '请求失败',
          content: '请检查网络连接状态'
        })
      }

      return Promise.reject(error.response);
    }
);

const axiosPlugin = {
  install : function(Vue) {
    Vue.config.globalProperties.$axios = _axios
    window.$axios = _axios;
  }
}



export default axiosPlugin;
