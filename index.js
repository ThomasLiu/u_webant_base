const user = require('./lib/model/user')
const global = require('./lib/model/global')
const login = require('./lib/model/login')
const util = require('util_react_web')
const config = require('umi_base_config')
const request = require('util_react_request')
const LS = require('util_storage')

module.exports = {
  user,
  global,
  login,
  model: {
    user,
    global,
    login,
  },
  util,
  config,
  request,
  LS
}