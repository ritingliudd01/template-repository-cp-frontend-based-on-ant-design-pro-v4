// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxySettings from './proxy';
const readTextFile = require('read-text-file');

const { ENV } = process.env;

// hk01:config:env: import env settings and inject them into process.env
const envDevelopment = readTextFile.readSync(`${__dirname}/../.env.development`);
const envStaging = readTextFile.readSync(`${__dirname}/../.env.staging`);
const envProduction = readTextFile.readSync(`${__dirname}/../.env.production`);

const text2json = (text: string) => {
  let ret = `{"${text.trim().replace(/=/gi, '":"').replace(/\n/gi, '","').replace(/\//gi, '\/')}"}`;
  //console.log(ret)
  //ret = `{${ret.substr(0, ret.length - 2)}}`;
  return JSON.parse(ret);
}

const envs = {
  development: text2json(envDevelopment),
  staging: text2json(envStaging),
  production: text2json(envProduction)
};

// hk01:config:proxy: update proxy's target with env's API_URL for local development only
const PROXY_TARGET = envs.development.API_URL;
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
      ENV: ENV || 'development', // 默认为本地开发环境
      ...envs[ENV || 'development'],
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
