/**
 * 用户API
 */

import request from '@/utils/request'
import CFG from '@/utils/cfg'

const BASE_USER_API = `${CFG.URL('BASE_API')}sys/user`

/**
 * 获取用户信息，登录时调用
 */
export function getUserInfo () {
  return request({
    url: `${BASE_USER_API}/info`,
    method: 'get'
  })
}

/**
 * 用户管理列表，分页
 * @param {current, pageSize, user} params
 */
export function findPage (params) {
  return request({
    url: `${BASE_USER_API}`,
    method: 'get',
    params
  })
}

/**
 * 用户新增
 * @param {*} entity
 */
export function insert (entity) {
  return request({
    url: `${BASE_USER_API}`,
    method: 'post',
    data: entity
  })
}

/**
 * 修改
 * @param {*} entity
 */
export function update (entity) {
  return request({
    url: `${BASE_USER_API}`,
    method: 'put',
    data: entity
  })
}

/**
 * 根据ID删除用户
 * @param {*} params 用户ID
 */
export function deleteUser (params) {
  return request({
    url: `${BASE_USER_API}`,
    method: 'delete',
    params
  })
}

/**
 * 冻结、禁用、启用、修改密码
 */
