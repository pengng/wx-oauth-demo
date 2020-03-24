const path = require('path');
const isDev = think.env === 'development';

// 示例代码 [[
const OAuth = require('wechat-oauth-middleware');

// thinkjs 风格的中间件 [[
const oauthMidware = (options) => {
  const oauth = OAuth(options);
  return oauth.forward(oauth.koa);
}
// thinkjs 风格的中间件 ]]

module.exports = [
  {
    // 使用中间件
    handle: oauthMidware,
    options: {
      appId: 'wx74205b421dc1f3eb',
      appSecret: '227dcfc1bb8a9e1b371ed15c981e5c8d',
      scope: OAuth.SCOPE_USER_INFO
    },
    match: '/auth' // 使用方式：前端页面使用 location.href = 'http://thinkjs服务器:端口号/auth?referer=' + encodeURIComponent(location.href)
  },
  // 示例代码 ]]
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
