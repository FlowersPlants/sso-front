import axios from 'axios'
import store from '@/store'
import router from '@/router'
// import CFG from '@/utils/cfg'
import {Message, MessageBox} from 'element-ui'

/**
 * 创建axios实例
 */
const service = axios.create({
  baseURL: `http://localhost:8899/`, // api的base_url
  timeout: 500000, // request timeout
  withCredentials: true, // 跨域请求时是否需要凭证，默认false
  maxRedirects: 0
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  config => {
    config.headers.post['X-Requested-With'] = 'XMLHttpRequest'
    // config.headers['Authorization'] = store.getters.token
    return config
  },
  error => {
    Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  response => response,
  error => {
    return new Promise((resolve, reject) => {
      let response = error.response
      if (!response) {
        Message({
          message: '请求错误!!',
          type: 'error',
          duration: 3 * 1000
        })
        let error = {code: 0, message: '请求错误。'}
        reject(error)
      } else {
        let data = response.data
        if (!data) data = {code: -100, message: '请求无响应。'}
        // 此处处理具体的错误，如401、403、500
        switch (response.status) {
          case 500:
            // 此处还存在后台自定义错误码，可以处理
            Message({
              type: 'error',
              message: '服务器内部错误'
            })
            reject(data)
            break
          case 403:
            Message({
              type: 'error',
              message: '403 禁止访问'
            })
            reject(data)
            break
          case 404:
            Message({
              type: 'error',
              message: '路径找不到'
            })
            reject(data)
            break
          case 401:
            // 检查是否登录
            store.dispatch('CheckLogin')
            MessageBox.alert(`未登录或凭证过期,请重新登陆!`, `错误`, {
              confirmButtonText: '登录',
              showCancelButton: false,
              showClose: false,
              type: 'error'
            }).then(() => {
              router.push('/login')
            })
            break
        }
      }
    })
  }
)

export default service
