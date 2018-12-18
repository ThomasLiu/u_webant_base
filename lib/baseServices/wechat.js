const { request, config }  = require('../baseUtils')

module.exports = async function url(playload) {
  const path = `${config.api.wechat}/url`
  return request(path, {
    method: 'POST',
    body: playload
  })
}

module.exports = async function jsConfig() {
  const path = `${config.api.wechat}/js`
  return request(path)
}
