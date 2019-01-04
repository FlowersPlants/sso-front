/**
 * 角色api
 */

import request from '@/axios/request'
import CFG from '@/utils/cfg'

const BASE_ROLE_API = `${CFG.URL('BASE_API')}sys/role`

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

export function update (entity) {
  return request({
    url: `${BASE_ROLE_API}`,
    method: 'put',
    data: entity
  })
}

export function deleteRole (id) {
  return request({
    url: `${BASE_ROLE_API}/${id}`,
    method: 'delete'
  })
}
