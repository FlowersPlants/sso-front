import request from '@/utils/request'

/**
 * 登录
 * post方式，并且返回json格式数据
 * @param params {account, password} 账号和密码
 */
export function login (params) {
  return request({
    url: `/auth/login`,
    method: 'post',
    data: params
  })
}

/**
 * 退出登录
 */
export function logout () {
  return request({
    url: `/auth/logout`,
    method: 'delete'
  })
}
