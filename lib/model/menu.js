const isEqual = require('lodash/isEqual')
const util = require('util_react_web')

module.exports = ({ getMenu, getSystemPath, Authorized, intl, memoizeOne }) => {

  const { check } = Authorized;

  // Conversion router to menu.
  function formatter(data, parentAuthority, parentName) {
    return data
      .map(item => {
        if (!item.name || !item.path) {
          return null;
        }

        let locale = 'menu';
        if (parentName) {
          locale = `${parentName}.${item.name}`;
        } else {
          locale = `menu.${item.name}`;
        }
        const name = intl.get(locale) || intl.get(item.name) || item.name;
        const result = {
          ...item,
          name,
          locale,
          authority: item.authority || parentAuthority,
        };
        if (item.children) {
          const children = formatter(item.children, item.authority, locale);
          // Reduce memory usage
          result.children = children;
        }
        return result;
      })
      .filter(item => item);
  }

  const memoizeOneFormatter = memoizeOne(formatter, isEqual);

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

  const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

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
        const { string: { getIntl }} = util
        for(let i = 0; i < keys.length; i++) {
          const key = keys[i]
          const typeItem = data[key]
          if(typeItem.length > 0) {
            menuData[key] = filterMenuData(memoizeOneFormatter(typeItem, authority))
            if(key !== 'inside') {
              allMenu = [
                ...menuData[key],
                allMenu
              ]
            }
          }
        }
        const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(allMenu);

        const { data: url } = yield call(getSystemPath, "loginweb");
        if (!menuData.inside) {
          menuData.inside = []
        }
        menuData.inside.push({
          path: `${url}/setting`,
          icon: 'user',
          name: getIntl(intl, 'account.center', 'Account Center'),
        })
        menuData.inside.push({
          path: 'logout',
          icon: 'logout',
          name: getIntl(intl, 'logout', 'Logout'),
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
