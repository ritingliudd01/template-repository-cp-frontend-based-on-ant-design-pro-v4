import { Settings as ProSettings } from '@ant-design/pro-layout';

// hk01:config:defaultsettings: apiVersion
type DefaultSettings = ProSettings & {
  pwa: boolean;
  apiVersion: string;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  //navTheme: 'dark',
  primaryColor: '#1890ff',
  layout: 'side',
  //layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'CP - HK01',
  pwa: false,
  iconfontUrl: '',
  apiVersion: '/api/v1',
};

export type { DefaultSettings };

export default proSettings;
