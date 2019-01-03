
const util = require('util_react_web')

module.exports = ({queryCurrent, reloadAuthorized, LS}) => {
  return {
    namespace: 'user',

    state: {
      currentUser: {},
      UTOKEN: '',
    },

    effects: {
      *fetchCurrent(_, { call, put }) {
        const { data, token } = yield call(queryCurrent);
        const { url: {fixLan} } = util
        const storage = LS || localStorage
        let currentAuthority = 'guest';
        let status = false;

        yield put({
          type: 'saveCurrentUser',
          payload: { 
            currentUser: data, 
            UTOKEN: token
          },
        });
        if (data) {
          const { lastLanguage, roles, isLock } = data
          storage.setItem('lang_type', fixLan( { lan: lastLanguage} ));
          if (roles) {
            currentAuthority = 'logined'
            if (data.roles) {
              currentAuthority = data.roles
            }
            status = isLock ? 'exception' : 'normal'
          }
        }
        yield put({
          type: 'login/changeLoginStatus',
          payload: {
            status,
            currentAuthority
          },
        });
        reloadAuthorized();
      },
    },

    reducers: {
      saveCurrentUser(state, { payload: {currentUser, UTOKEN} }) {
        return {
          ...state,
          currentUser: currentUser || {},
          UTOKEN
        };
      },
      changeNotifyCount(state, action) {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            notifyCount: action.payload,
          },
        };
      },
    },
  };
}