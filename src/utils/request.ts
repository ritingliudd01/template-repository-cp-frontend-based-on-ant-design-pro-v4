/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message } from 'antd';
import { notification } from 'antd';
import { showError } from './utils';
import { getUserSession } from './session';
import * as errorCode from '@/locales/zh-TW/error';
import { useIntl, history } from 'umi';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `請求錯誤 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的網絡發生異常，無法連接服務器',
      message: '網絡異常',
    });
  }

  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

const code = errorCode.default;
const isError = (key: any) => {
  console.log(key)
  const { formatMessage } = useIntl();
  if (typeof key !== 'undefined' && key !== 0) {
    if (`error.${key}` in code) {
      showError(formatMessage({ id: `error.${key}` }));
    } else {
      showError(formatMessage({ id: `error.other` }));
    }
  }
};

request.interceptors.response.use(async (response, _request) => {
  if (_request.responseType === 'blob') {
    return response;
  }
  message.config({
    maxCount: 1,
    duration: 2,
  });
  const { status } = response;

  if (status === 401) {
    history.replace('/login');
    return null;
  }

  const data = await response.clone().json();
  if (data.code === 53000) {
    history.replace('/login');
    return null;
  }

  if (data.code === 43007) {
    const { formatMessage } = useIntl();
    showError(formatMessage({ id: 'error.43007' }));
    history.replace('/login');
    return null;
  }

  data && data.code && isError(data.code);

  return response;
});

//export default request;

// hk01:utils:request: add Authorization with valid token in header
export default (url: string, options = {}) => {
  const { headers = {} } = options;
  options.headers = {
    ...headers,
    Authorization: getUserSession(),
  };
  return request(url, options);
};
