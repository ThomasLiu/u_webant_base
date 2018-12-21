# u_webant_base
提供一些基础的model及工具less


### menu
需要传入参数 `getMenu`, `getSystemPath`, `Authorized`
- Authorized 「{ check }
- getSystemPath(system)
需要返回样例
```
{
  data: 'http://hiredchina.com'
}
```
- getMenu
需要返回样例
```
{
  "data": {
    "left": [{
      path: '/user',
      name: 'user',
      routes: [
        { path: '/user', name: '/user/login' },
        { path: '/user/login', name: './User/Login' },
      ],
    }],
    "inside": [{
      path: '/list/table-list',
      name: 'searchtable',
    }, {
      path: '/form',
      icon: 'form',
      name: 'form',
      routes: [
        {
          path: '/form/basic-form',
          name: 'basicform',
        },
        {
          path: '/form/step-form',
          name: 'stepform',
          routes: [
            {
              path: '/form/step-form/info',
              name: 'info',
            },
            {
              path: '/form/step-form/confirm',
              name: 'confirm',
            }
          ],
        },
        {
          path: '/form/advanced-form',
          name: 'advancedform',
          authority: ['admin'],
        },
      ],
    }],
    "right": [{
      path: '/dashboard',
      name: 'dashboard',
      icon: 'dashboard',
      routes: [
        {
          path: '/dashboard/analysis',
          name: 'analysis',
          component: './Dashboard/Analysis',
        },
        {
          path: '/dashboard/monitor',
          name: 'monitor',
          component: './Dashboard/Monitor',
        },
        {
          path: '/dashboard/workplace',
          name: 'workplace',
          component: './Dashboard/Workplace',
        },
      ],
    }]
  }
}
```

### global
需要传入参数 `queryNotices`, `getSystem`, `getFooter`
- queryNotices TODO
- getSystem 
需要返回
```
{
  "data": {
      "nameKey": "loginapi",
      "titleKey": "login",
      "keyworkKey": "login",
      "descriptionKey": "login",
      "logoUrl": "http://image.hiredchina.com/logo.jpg",
      "miniLogoUrl": "http://image.hiredchina.com/FpxXVRh34w3zIfxyMG-app_bLRpd",
      "copyrightKey": "",
      "recordCode": ""
    }
}
```
- getFooter
需要返回
```
{
  "data": {
    social: [
      {
        icon: 'facebook',
        href: 'https://www.facebook.com/HiredChina',
      },
      {
        icon: 'linkedin',
        href: 'https://www.linkedin.com/company-beta/5051303/',
      },
      ...
    ],
    links: [
      {
        key: 'For Job Seekers',
        title: 'For Job Seekers',
        href: 'https://pro.ant.design',
        blankTarget: true,
        sub: [
          {
            key: 'Find Jobs',
            title: 'Find Jobs',
            href: 'https://github.com/ant-design/ant-design-pro',
            blankTarget: true,
          },
          {
            key: 'Upload Resume',
            title: 'Upload Resume',
            href: 'https://github.com/ant-design/ant-design-pro',
            blankTarget: true,
          },
          ...
        ]
      },
      {
        key: 'For Employers',
        title: 'For Employers',
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
        sub: [
          {
            key: 'Post Jobs',
            title: 'Post Jobs',
            href: 'https://github.com/ant-design/ant-design-pro',
            blankTarget: true,
          },
          {
            key: 'Search Resumes',
            title: 'Search Resumes',
            href: 'https://github.com/ant-design/ant-design-pro',
            blankTarget: true,
          },
          {
            key: 'Executive Service',
            title: 'Executive Service',
            img: 'http://www.hiredchina.com/img/consulting.jpeg',
          },
          ...
        ]
      },
      ...
    ]
  }
}
```


### login
需要传入参数 `logout`, `getSystemPath`, `setAuthority`, `reloadAuthorized`, `LS`

### user
需要传入参数 `queryCurrent`, `reloadAuthorized`, `LS`
