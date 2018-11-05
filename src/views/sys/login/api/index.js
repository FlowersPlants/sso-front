import request from '@/axios/request'

/**
 * 登录
 * post方式，并且数据是json格式；
 * 但是有一个问题：json格式后台接收不到
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
    url: `/logout`,
    method: 'delete'
  })
}
