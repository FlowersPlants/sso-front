/**
 * 角色api
 */

import request from '@/utils/request'

const BASE_ROLE_API = `/sys/role`

/**
 * 获取角色列表
 */
export function findPage (params) {
  return request({
    url: `${BASE_ROLE_API}`,
    method: 'get',
    params
  })
}

export function insert (entity) {
  return request({
    url: `${BASE_ROLE_API}`,
    method: 'post',
    data: entity
  })
}

/**
 * 角色授权接口
 * @param {id, menuIds} roleDto 角色dto对象
 */
export function insertRoleMenu (roleDto) {
  return request({
    url: `${BASE_ROLE_API}/auth`,
    method: 'post',
    data: roleDto
  })
}

/**
 * 成员用户：角色的用户分配接口
 * @param {id, userIds} roleDto  角色dto对象
 */
export function insertRoleUsers (roleDto) {
  return request({
    url: `${BASE_ROLE_API}/assign`,
    method: 'post',
    data: roleDto
  })
}

export function update (entity) {
  return request({
    url: `${BASE_ROLE_API}`,
    method: 'put',
    data: entity
  })
}

export function deleteRole (params) {
  return request({
    url: `${BASE_ROLE_API}`,
    method: 'delete',
    params
  })
}
