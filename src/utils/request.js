import axios from 'axios'

// 引入Vuex数据
import store from '@/store/index.js'
// 引入Message组件
import { Message } from 'element-ui'
import router from '../router'

import qs from 'qs'
// cerete 创建 axios 实例
const request = axios.create({
  timeout: 2000
})

function getBaseURL (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}

// 请求拦截器
request.interceptors.request.use((config) => {
  // 判断 config.url 的前缀，来进行请求 baseURL 的设置
  config.baseURL = getBaseURL(config.url)

  // 统一设置 Token 信息
  const { user } = store.state
  // console.log(store.state)
  // console.log(user)
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

function redirectLogin () {
  // 跳转到登录页
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 存储是否正在更新 Token 的状态
let isRefreshing = false
// 存储因为等待 Token 刷新而挂起的请求
let requests = []

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码 2xx 会执行这里
  console.log('响应成功了', response)
  return response
}, function (error) {
  // console.log(error)
  console.dir(error)
  if (error.response) {
    // 请求发送成功，响应接收完毕，但状态码为失败的情况
    //  判断失败的状态码情况（主要处理 401 的情况）
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      // Token 无效（过期）处理
      // 1.无Token信息
      if (!store.state.user) {
        // 跳转到登录页
        redirectLogin()
        return Promise.reject(error)
      }
      // 检测是否已经存在了正在刷新 Token 的请求
      if (isRefreshing) {
        // 将当前失败的请求，存储到请求列表中
        // token更新完毕后遍历统一发送
        return requests.push(() => {
          // 当前函数调用后，会自动发送本次失败的请求
          request(error.config)
        })
      }
      isRefreshing = true
      // 2.Token无效（错误Token，过期Token）
      // - 发送请求，获取新的 acess_token
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // 刷新Token失败
        if (res.data.state !== 1) {
          // 清除无效的用户信息
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }
        // 刷新 token 成功
        //  - 将刷新后的token数据存储到vuex中
        store.commit('setUser', res.data.content)
        //  - 重新发送失败的请求（根据 requests 发送所有失败的请求）
        //  - error.config本次失败的请求的配置对象
        // return request(err.config)
        requests.forEach(callback => callback())
        //  - 发送完毕，清除 requests 内容即可
        requests = []
        // console.log(res)
        return request(error.config)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        // 请求发送完毕，响应处理完毕，将刷新状态更改为 false 即可
        // 无论成功失败 finally 都会执行
        isRefreshing = false
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，但是未收到响应
    // console.log(error.request)
    Message.error('请求超时，请重试')
  } else {
    // 意料之外的错误
    // console.log('Error', error.message)
    Message.error(error.message)
  }
  // 将本次请求的错误对象继续向后抛出，让接收响应的处理函数进行操作
  return Promise.reject(error)
})

export default request
