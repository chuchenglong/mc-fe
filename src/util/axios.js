import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from '@/router'
// import { Message } from 'element-ui';
import {Message,Loading} from 'element-ui'

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
})

http.interceptors.request.use(config => {
  if (Vue.cookie.get('token') == null) {
    config.headers['token'] = ''
  } else {
    config.headers['token'] = Vue.cookie.get('token')
  }
  Loading.service({text:"Loading..."})
  return config
}, error => {
  Message.error('请求超时!')
  return Promise.reject(error)
})

http.interceptors.response.use(config => {
  Loading.service().close();
  return config.data
}, error => {
  Loading.service().close();
  if (error.response.status == 302) {
    Message.error('您的登录已超时，请重新登录！')
    router.push({path:'/'})
  } else if (error.response.status == 403) {
    Message.error('权限不足,请联系管理员!！')
  } else if (error.response.status == 504 || error.response.status == 404) {
    Message.error('服务器被未知怪兽吃了⊙﹏⊙∥！')
  } else if (error.response.status == 500) {
    Message.error('系统异常，请稍后重试！')
  } else {
    Message.error('未知错误，也许等会就好了！')
  }
  return Promise.reject(error)
})

http.handleParams = (data = {}, contentType = 'json') => {
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
