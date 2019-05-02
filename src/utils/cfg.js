/**
 * 公共参数配置
 */
const cfg = {
  dev: {
    BASE_API: `192.168.0.102:8899/`,
    WEB_INFO: {
      SITE_TITLE: 'SSO单点登录',
      LOGO: '.static/img/logo.png'
    },
    NavMenu: [
      { label: '首页', href: '/home', parentId: '0' },
      { label: '操作帮助', href: 'https://***.com', parentId: '1' },
      { label: '联系我们', href: 'mailto://*@*.com', parentId: '2' }
    ]
  },
  sit: {
    BASE_API: `192.168.0.102:8899/`,
    WEB_INFO: {
      SITE_TITLE: 'SSO单点登录',
      LOGO: '.static/img/logo.png'
    },
    NavMenu: [
      { label: '首页', href: '/home', parentId: '0' },
      { label: '操作帮助', href: 'https://***.com', parentId: '1' },
      { label: '联系我们', href: 'mailto://*@*.com', parentId: '2' }
    ]
  },
  prop: {
    BASE_API: `192.168.0.102:8899/`,
    WEB_INFO: {
      SITE_TITLE: 'SSO单点登录',
      LOGO: '.static/img/logo.png'
    },
    NavMenu: [
      { label: '首页', href: '/home', parentId: '0' },
      { label: '操作帮助', href: 'https://***.com', parentId: '1' },
      { label: '联系我们', href: 'mailto://*@*.com', parentId: '2' }
    ]
  }
}

const config = cfg[process.env.ENV_CONFIG]
const PROXY = 'http://'
const WS_PROXY = 'ws://'

export default {
  ...config,
  URL: (key, proxyType = 'http') => `${proxyType === 'ws' ? WS_PROXY : PROXY}${config[key]}`
}
