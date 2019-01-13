/**
 * 字典api
 */

import request from '@/axios/request'
import CFG from '@/utils/cfg'

const BASE_DICT_API = `${CFG.URL('BASE_API')}sys/dict`

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

export function deleteById (id) {
  return request({
    url: `${BASE_DICT_API}/${id}`,
    method: 'delete'
  })
}
