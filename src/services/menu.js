import request from '@/utils/request.js'

// 获取编辑菜单列表
export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    // url: `/boss/menu/getEditMenuInfo?${id}`,
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}
