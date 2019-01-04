/**
 * 菜单api
 */

import request from '@/axios/request'
import CFG from '@/utils/cfg'

const BASE_MENU_API = `${CFG.URL('BASE_API')}sys/menu`

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

export function deleteMenu (id) {
  return request({
    url: `${BASE_MENU_API}/${id}`,
    method: 'delete'
  })
}

export function getAuthMenuByRoleId (roleId) {
  return request({
    url: `${BASE_MENU_API}/${roleId}`,
    method: 'get'
  })
}
