import request from '@/axios/request'
import CFG from '@/utils/cfg'

/**
 * 获取用户信息
 */
export function getUserInfo () {
  return request({
    url: `${CFG.URL('BASE_API')}sys/user/info`,
    method: 'get'
  })
}
