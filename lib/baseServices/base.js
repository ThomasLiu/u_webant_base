const { request, config }  = require('../baseUtils')

module.exports = async function getI18n(lan) {
  let path = '/i18n'
  if (lan) {
    path = `/i18n/${lan}`
  } 
  return request(`${config.api.base}/${encodeURIComponent(path)}`)
}

module.exports = async function getSystem() {
  const path = '/system'
  return request(`${config.api.base}/${encodeURIComponent(path)}`)
}

module.exports = async function getMenu() {
  const path = '/menu'
  return request(`${config.api.base}/${encodeURIComponent(path)}`)
}

module.exports = async function queryCurrent() {
  return request(`${config.api.base}/current`)
}

module.exports = async function logout() {
  return request(`${config.api.base}/logout`)
}

module.exports = async function getSystemPath(system) {
  const path = `/path/${system}`
  return request(`${config.api.base}/${encodeURIComponent(path)}`)
}
