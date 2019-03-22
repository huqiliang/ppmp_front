// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
];

const asideMenuConfig = [
  {
    name: '统计分析',
    path: '/analysis',
    icon: 'home2',
  },
  // {
  //   name: '项目列表',
  //   path: '/schedule',
  //   icon: 'copy',
  // },
  // {
  //   name: '服务器配置',
  //   path: '/conversion',
  //   icon: 'cascades',
  // },
  {
    name: '服务器列表',
    path: '/serverList',
    icon: 'cascades',
  },
  {
    name: '项目列表',
    path: '/projectList',
    icon: 'home',
  },
];

export { headerMenuConfig, asideMenuConfig };
