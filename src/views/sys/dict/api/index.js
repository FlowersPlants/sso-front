import request from '@/axios/request'
import CFG from '@/utils/cfg'

export function findList () {
  return request({
    url: `${CFG.URL('BASE_API')}dict`,
    method: 'get'
  })
}
