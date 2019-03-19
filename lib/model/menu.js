
module.exports = ({ getMenu, getSystemPath, Authorized }) => {

  const { check } = Authorized;

  // Conversion router to menu.
  function formatter(data, parentAuthority) {
    return data
      .map(item => {
        if (!item.name || !item.path) {
          return null;
        }

        let locale = item.name;
        const { name } = item;
        const result = {
          ...item,
          name,
          locale,
          authority: item.authority || parentAuthority,
        };
        if (item.children) {
          const children = formatter(item.children, item.authority);
          // Reduce memory usage
          result.children = children;
        }
        return result;
      })
      .filter(item => item);
  }

  /**
   * get SubMenu or Item
   */
  const getSubMenu = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      return {
        ...item,
        children: filterMenuData(item.children), // eslint-disable-line
      };
    }
    return item;
  };

  /**
   * filter menuData
   */
  const filterMenuData = menuData => {
    if (!menuData) {
      return [];
    }
    return menuData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => check(item.authority, getSubMenu(item)))
      .filter(item => item);
  };
  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  const getBreadcrumbNameMap = menuData => {
    const routerMap = {};

    const flattenMenuData = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          flattenMenuData(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    flattenMenuData(menuData);
    return routerMap;
  };

  return {
    namespace: 'menu',

    state: {
      menuData: {},
      breadcrumbNameMap: {},
      allMenu: []
    },

    effects: {
      *getMenuData({ payload }, { call, put }) {
        const { authority } = payload;
        const { data } = yield call(getMenu);
        const keys = Object.keys(data)
        const menuData = {}
        let allMenu = []
        for(let i = 0; i < keys.length; i++) {
          const key = keys[i]
          const typeItem = data[key]
          if(typeItem.length > 0) {
            menuData[key] = filterMenuData(formatter(typeItem, authority))
            if(key !== 'inside') {
              allMenu = [
                ...menuData[key],
                ...allMenu
              ]
            }
          }
        }
        const breadcrumbNameMap = getBreadcrumbNameMap(allMenu);

        const { data: url } = yield call(getSystemPath, "loginweb");
        if (!menuData.inside) {
          menuData.inside = []
        }
        const redirectUrlParams = new URL(window.location.href);
        const origin = redirectUrlParams.origin;
        menuData.inside.push({
          path: `${url}/setting?redirect=${encodeURIComponent(origin)}`,
          icon: 'user',
          name: 'base.account.center',
        })
        menuData.inside.push({
          path: 'logout',
          icon: 'logout',
          name: 'base.logout',
        })
      
        yield put({
          type: 'save',
          payload: { menuData, breadcrumbNameMap, allMenu},
        });
      },
    },

    reducers: {
      save(state, action) {
        return {
          ...state,
          ...action.payload,
        };
      },
    },
  };
}
