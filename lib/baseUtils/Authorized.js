const RenderAuthorized  = require('u_webant/lib/Authorized');
const { getAuthority }  = require('./authority');

let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

module.exports = { reloadAuthorized };
module.exports = Authorized;
