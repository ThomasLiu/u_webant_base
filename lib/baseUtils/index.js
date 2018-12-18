const { parse }  = require('qs');
const request  = require('./request');
const LS  = require('./storage');
const Delay  = require('./delay');
const config  = require('./config');

const getPageQuery = () => parse(window.location.href.split('?')[1])

const where = () => {
  const ua = window.navigator.userAgent.toLowerCase();

  if(ua.match(/MicroMessenger/i)){
    return 'wechat'
  } if ((ua.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return 'mobile'
  }
  return 'pc'
}

module.exports = {
  request,
  getPageQuery,
  LS,
  Delay,
  where,
  config
}