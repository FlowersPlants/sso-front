import axios from 'axios'
import store from '@/store'
import router from '@/router'
import CFG from '@/utils/cfg'
import {Message, MessageBox} from 'element-ui'

/**
 * 创建axios实例
 */
const service = axios.create({
  baseURL: `${CFG.URL('BASE_API')}`, // api的base_url
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
    config.headers['Authorization'] = store.getters.token
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
      // 此处catch到的是非2xx范围的返回值
      // console.log(error.status)
      let response = error.response
      console.log('res =>', response)
      if (!response) {
        Message({
          message: `网络异常!!!`,
          type: 'error',
          duration: 3 * 1000
        })
        let error = {code: 0, message: '网络异常。'}
        reject(error)
      } else {
        let data = response.data
        if (!data) data = '请求无响应。'
        switch (response.status) {
          case 500: // 只处理500错误
            if (data.code === 500) {
              // 运行时异常(所有的RuntimeException)
              Message({
                message: `运行时异常: ${data}`,
                type: 'error',
                duration: 3 * 1000
              })
            } else {
              // 业务异常
              Message({
                message: `业务异常: ${data}`,
                type: 'error',
                duration: 3 * 1000
              })
            }
            reject(data)
            break
          case 403:
            Message({
              message: `403 无权访问`,
              type: 'error',
              duration: 3 * 1000
            })
            reject(data)
            break
          case 401:
            // 未登录 unauthorized
            store.dispatch('ClearToken')
            reject(data)
            MessageBox.alert(`未登录或凭证过期,请重新登陆!`, `错误`, {
              confirmButtonText: '登录',
              showCancelButton: false,
              showClose: false,
              type: 'error'
            }).then(() => {
              router.push('/login')
            })
            break
          default: {
            reject(data)
            break
          }
        }
      }
    })
  }
)

export default service
