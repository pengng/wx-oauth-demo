const path = require('path');
const isDev = think.env === 'development';

// 示例代码 [[
const OAuth = require('wechat-oauth-middleware');

// thinkjs 风格的中间件 [[
const oauthMidware = (options) => {
  const oauth = OAuth(options);
  return oauth.forward(oauth.koa);
};
// thinkjs 风格的中间件 ]]

module.exports = [
  {
    // 使用中间件
    handle: oauthMidware,
    options: {
      appId: 'wx4f33bb08e679e5c7',
      appSecret: '927f58b7cb2f13e1c7a30d2c220bbba1',
      scope: OAuth.SCOPE_USER_INFO
    },
    match: '/auth' // 使用方式：前端页面使用 location.href = 'http://thinkjs服务器:端口号/auth?referer=' + encodeURIComponent(location.href)
  },
  // 示例代码 ]]
  {
    handle: 'meta',
    options: {
      logRequest: true,
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
