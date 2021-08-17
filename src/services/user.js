import request from '@/utils/request.js'
import qs from 'qs'

import store from '@/store/index.js'

// 用户登录接口
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo',
    headers: {
      Authorization: store.state.user.access_token
    }
  })
}
