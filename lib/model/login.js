
const qs = require('qs')
const { stringify } = qs;

module.exports = ({logout, getSystemPath, setAuthority, reloadAuthorized, LS}) => {
  return {
    namespace: 'login',

    state: {
      status: undefined,
    },

    reducers: {
      changeLoginStatus(state, { payload: { currentAuthority, status} }) {
        setAuthority(currentAuthority);
        return { ...state, status };
      },
    },

    effects: {
      *logout(_, { put, call }) {
        yield call(logout);

        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        yield put({
          type: 'user/saveCurrentUser',
          payload: {},
        });
        LS.removeItem('U_token');
        reloadAuthorized();

        const { data } = yield call(getSystemPath, 'loginweb');
        window.location.href = `${data}/user/login?${stringify({redirect: window.location.href})}`
      },

    }
  }
}