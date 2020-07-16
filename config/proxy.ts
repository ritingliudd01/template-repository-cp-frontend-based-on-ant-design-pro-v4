/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

import settings from './defaultSettings';

const { apiVersion } = settings;

// hk01:config:proxy: set proxy settings for development env only
export default {
  // dev: {
  //   '/api/': {
  //     target: 'https://preview.pro.ant.design',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  // },
  // test: {
  //   '/api/': {
  //     target: 'https://preview.pro.ant.design',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  // },
  // pre: {
  //   '/api/': {
  //     target: 'your pre url',
  //     changeOrigin: true,
  //     pathRewrite: { '^': '' },
  //   },
  // },
  development: {
    [apiVersion]: {
      target: '',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  }
};
