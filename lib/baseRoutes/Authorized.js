import React from 'react';
import { Authorized } from 'u_webant';
import { getAuthority } from '../baseUtils/authority';
import Redirect from 'umi/redirect';
import { stringify } from 'qs';

const RenderAuthorized = Authorized

const Authority = getAuthority();
const AuthorizedDiv = RenderAuthorized(Authority);

const getUrl = () => `/Exception/403?${stringify({redirect: encodeURIComponent(window.location.href) })}`

export default ({ children }) => (
  <AuthorizedDiv authority={children.props.route.authority} noMatch={<Redirect to={getUrl()} />}>
    {children}
  </AuthorizedDiv>
);
