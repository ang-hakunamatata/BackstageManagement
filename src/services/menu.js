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

// 提交更新表单
export const saveOrUpdate = (data) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

// 获取所有菜单列表
export const getAllMenu = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}
