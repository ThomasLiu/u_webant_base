// use localStorage to store the authority info, which might be sent  = require('server in actual project.
const LS  = require('./storage');
const localStorageAuthorityKey = 'u-authority';

module.exports = function getAuthority(str) {
  // return localStorage.getItem(localStorageAuthorityKey) || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? LS.getItem(localStorageAuthorityKey) : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['guest'];
}

module.exports = function setAuthority(authority) {
  const uAuthority = typeof authority === 'string' ? [authority] : authority;
  return LS.setItem(localStorageAuthorityKey, JSON.stringify(uAuthority));
}
