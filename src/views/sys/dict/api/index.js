/**
 * 字典api
 */

import request from '@/utils/request'

const BASE_DICT_API = `/sys/dict`

/**
 * 获取所有字典，存放在store里
 */
export function getDictList () {
  return request({
    url: `${BASE_DICT_API}/list`,
    method: 'get'
  })
}

export function findPage (params) {
  return request({
    url: `${BASE_DICT_API}`,
    method: 'get',
    params
  })
}

export function insert (entity) {
  return request({
    url: `${BASE_DICT_API}`,
    method: 'post',
    data: entity
  })
}

export function update (entity) {
  return request({
    url: `${BASE_DICT_API}`,
    method: 'put',
    data: entity
  })
}

/**
 * 根据ID删除
 * @param {id} params 字典ID
 */
export function deleteById (params) {
  return request({
    url: `${BASE_DICT_API}`,
    method: 'delete',
    params
  })
}
