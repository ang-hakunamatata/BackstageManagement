import request from '@/utils/request.js'

// 获取分页资源列表信息
export const getResourcePages = (data) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}
