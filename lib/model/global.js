
module.exports = ({queryNotices, getSystem, getFooter}) => {
  return {
    namespace: 'global',
  
    state: {
      collapsed: false,
      notices: [],
      system: {},
      social: [],
      footerLinks: []
    },
  
    effects: {
      *fetchSystem(_, { call, put }) {
        const { data } = yield call(getSystem);
        const { data: { social, links: footerLinks} } = yield call(getFooter);
        yield put({
          type: 'saveSystem',
          payload: data,
        });
        console.log(social, footerLinks)
        yield put({
          type: 'saveFooter',
          payload: {
            social,
            footerLinks
          },
        });
      },
      *fetchNotices(_, { call, put }) {
        const data = yield call(queryNotices);
        yield put({
          type: 'saveNotices',
          payload: data,
        });
        yield put({
          type: 'user/changeNotifyCount',
          payload: data.length,
        });
      },
      *clearNotices({ payload }, { put, select }) {
        yield put({
          type: 'saveClearedNotices',
          payload,
        });
        const count = yield select(state => state.global.notices.length);
        yield put({
          type: 'user/changeNotifyCount',
          payload: count,
        });
      },
    },
  
    reducers: {
      saveFooter(state, { payload: { social, footerLinks } }) {
        return {
          ...state, social, footerLinks
        };
      },
      saveSystem(state, { payload }) {
        return {
          ...state,
          system: payload,
        };
      },
      changeLayoutCollapsed(state, { payload }) {
        return {
          ...state,
          collapsed: payload,
        };
      },
      saveNotices(state, { payload }) {
        return {
          ...state,
          notices: payload,
        };
      },
      saveClearedNotices(state, { payload }) {
        return {
          ...state,
          notices: state.notices.filter(item => item.type !== payload),
        };
      },
    },
  
    subscriptions: {
      setup({ history }) {
        // Subscribe history(url) change, trigger `load` action if pathname is `/`
        return history.listen(({ pathname, search }) => {
          if (typeof window.ga !== 'undefined') {
            window.ga('send', 'pageview', pathname + search);
          }
        });
      },
    },
  };
}