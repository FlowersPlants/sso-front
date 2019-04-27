/**
 * 菜单api
 */

import request from '@/utils/request'

const BASE_MENU_API = `/sys/menu`

/**
 * 获取菜单树
 */
export function getMenuTree () {
  return request({
    url: `${BASE_MENU_API}/tree`,
    method: 'get'
  })
}

export function insert (entity) {
  return request({
    url: `${BASE_MENU_API}`,
    method: 'post',
    data: entity
  })
}

export function update (entity) {
  return request({
    url: `${BASE_MENU_API}`,
    method: 'put',
    data: entity
  })
}

export function deleteMenu (params) {
  return request({
    url: `${BASE_MENU_API}`,
    method: 'delete',
    params
  })
}

/**
 * 根据角色ID获取菜单
 * @param {roleId} params 角色ID
 */
export function getAuthMenuByRoleId (params) {
  return request({
    url: `${BASE_MENU_API}`,
    method: 'get',
    params
  })
}
