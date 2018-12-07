import CFG from './cfg'

/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {
  let reqUrl = url
  if (url.indexOf('#') !== -1 && url.indexOf('http') === -1) {
    const port = reqUrl.substr(reqUrl.indexOf(':'))
    reqUrl = `/ifrm/urlPath?src=${CFG.URL('BASE_API')}${port}${reqUrl.replace('#', '').replace(port, '')}&name=${name}`
  } else if (url.indexOf('http') !== -1) {
    reqUrl = `/ifrm/urlPath?src=${reqUrl}&name=${name}`
  } else {
    reqUrl = `${reqUrl}`
  }
  return reqUrl
}
