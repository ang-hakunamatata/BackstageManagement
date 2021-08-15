import axios from 'axios'

// cerete 创建 axios 实例
const request = axios.create({
  timeout: 2000
})

export default request
