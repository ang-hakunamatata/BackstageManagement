import axios from 'axios'

// 引入Vuex数据
import store from '@/store/index.js'
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

export default request
