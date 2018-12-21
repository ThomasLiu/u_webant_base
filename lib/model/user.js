
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
        yield put({
          type: 'saveCurrentUser',
          payload: { 
            currentUser: data, 
            UTOKEN: token
          },
        });
        const { url: {fixLan} } = util
        const storage = LS || localStorage
        storage.setItem('lang_type', fixLan( { lan: data.lastLanguage} ));

        let currentAuthority = 'guest';
        let status = false;
        if (data && data.roles) {
          currentAuthority = 'user'
          if (data.roles) {
            currentAuthority = data.roles
          }
          status = data.isLock ? 'exception' : 'normal'
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