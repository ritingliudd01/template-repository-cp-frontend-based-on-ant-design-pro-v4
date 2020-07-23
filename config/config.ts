// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxySettings from './proxy';
const readTextFile = require('read-text-file');

// hk01:config:env: import env settings and inject them into process.env
const text2json = (text: string) => {
  let ret = `{"${text
    .trim()
    .replace(/=/gi, '":"')
    .replace(/\n/gi, '","')
    .replace(/\//gi, "/")}"}`;
  return JSON.parse(ret);
};
const envDevelopment = readTextFile.readSync(".env");
const ENV = text2json(envDevelopment);

// hk01:config:proxy: update proxy's target with env's API_URL for local development only
const PROXY_TARGET = ENV.API_URL;
const API_VERSION = defaultSettings.apiVersion;
const proxy = proxySettings['development'];
proxy[API_VERSION].target = PROXY_TARGET;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // hk01:config:language: default traditional Chinese
    default: 'zh-TW',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: false,
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      //path: '/user',
      path: '/login',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          //path: '/user/login',
          path: '/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          //authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              //authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              path: '/formily',
              name: 'formily',
              icon: 'edit',
              routes: [
                {
                  path: '/formily/linked',
                  name: 'linked',
                  routes: [
                    {
                      path: '/formily/linked/one2many',
                      name: 'one2many',
                      component: './formily/linked/one2many',
                    },
                    {
                      path: '/formily/linked/many2one',
                      name: 'many2one',
                      component: './formily/linked/many2one',
                    },
                    {
                      path: '/formily/linked/multideps',
                      name: 'multideps',
                      component: './formily/linked/multideps',
                    },
                    {
                      path: '/formily/linked/chained',
                      name: 'chained',
                      component: './formily/linked/chained',
                    },
                    {
                      path: '/formily/linked/cyclic',
                      name: 'cyclic',
                      component: './formily/linked/cyclic',
                    },
                    {
                      path: '/formily/linked/validation',
                      name: 'validation',
                      component: './formily/linked/validation',
                    },
                    {
                      path: '/formily/linked/validationlinked',
                      name: 'validationlinked',
                      component: './formily/linked/validationlinked',
                    },
                    {
                      path: '/formily/linked/async',
                      name: 'async',
                      component: './formily/linked/async',
                    },
                    {
                      path: '/formily/linked/dynamic',
                      name: 'dynamic',
                      component: './formily/linked/dynamic',
                    },
                    {
                      path: '/formily/linked/arraytable',
                      name: 'arraytable',
                      component: './formily/linked/arraytable',
                    },
                    {
                      path: '/formily/linked/arraytabledynamic',
                      name: 'arraytabledynamic',
                      component: './formily/linked/arraytabledynamic',
                    },
                    {
                      path: '/formily/linked/linkoutside',
                      name: 'linkoutside',
                      component: './formily/linked/linkoutside',
                    },
                  ]
                },
                {
                  path: '/formily/layout',
                  name: 'layout',
                  routes: [
                    {
                      path: '/formily/layout/inline',
                      name: 'inline',
                      component: './formily/layout/inline',
                    },
                    {
                      path: '/formily/layout/complex',
                      name: 'complex',
                      component: './formily/layout/complex',
                    },
                    {
                      path: '/formily/layout/grid',
                      name: 'grid',
                      component: './formily/layout/grid',
                    },
                    {
                      path: '/formily/layout/steps',
                      name: 'steps',
                      component: './formily/layout/steps',
                    },
                    {
                      path: '/formily/layout/tabs',
                      name: 'tabs',
                      component: './formily/layout/tabs',
                    },
                    {
                      path: '/formily/layout/responsive',
                      name: 'responsive',
                      component: './formily/layout/responsive',
                    },
                  ]
                }
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy,
  manifest: {
    basePath: '/',
  },
  define: {
    'process.env': {
      // hk01:config:env: process.env
      // GITHUB_REPO_NAME used as namespace for localStorage items
      GITHUB_REPO_NAME:'partner-cp',
      ...ENV,
    },
  },
  chainWebpack: config => {

    // Do not start with /
    const subFolderInDist = 'static/';
    const outputFileNames = ['filename', 'chunkFilename'];

    // hk01:config:build: dist js & css files into subFolderInDist
    const outputStore = config.output.store;
    outputFileNames.map(ele => {
      const value = subFolderInDist + outputStore.get(ele);
      outputStore.set(ele, value);
    });

    const cssFileNames = {};
    const extractCssStrore = config.plugins.store.get('extract-css').store;
    const args = extractCssStrore.get('args')[0];
    outputFileNames.map(ele => {
      const val = subFolderInDist + args[ele];
      cssFileNames[ele] = val;
    });
    extractCssStrore.set('args', [cssFileNames]);
  }
});
