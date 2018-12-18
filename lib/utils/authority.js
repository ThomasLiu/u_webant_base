// use localStorage to store the authority info, which might be sent from server in actual project.
import LS from './storage';
const localStorageAuthorityKey = 'u-authority';

export function getAuthority(str) {
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

export function setAuthority(authority) {
  const uAuthority = typeof authority === 'string' ? [authority] : authority;
  return LS.setItem(localStorageAuthorityKey, JSON.stringify(uAuthority));
}
