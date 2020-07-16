import { encode, decode } from 'base64-utf8';
import qs from 'qs';
import * as R from 'ramda';

const { GITHUB_REPO_NAME } = process.env;

// 获取用户会话信息
export const getUserSession = () => localStorage.getItem(`${GITHUB_REPO_NAME}-token`) || null;

/**
 * 存储用户会话信息
 */
export const saveUserSession = token => {
  localStorage.setItem(`${GITHUB_REPO_NAME}-token`, token);
};

/**
 * 清空用户会话信息
 */
export const clearUserSession = () => {
  localStorage.clear();
};

// 获取用户会话信息
export const getUserInfo = () => {
  const userInfo = localStorage.getItem(`${GITHUB_REPO_NAME}-user-info`);
  if (userInfo) {
    return JSON.parse(decode(userInfo));
  }
  return null;
};

/**
 * 存储用户会话信息
 */
export const saveUserInfo = userInfo => {
  const strInfo = JSON.stringify(userInfo);
  localStorage.setItem(`${GITHUB_REPO_NAME}-user-info`, encode(strInfo));
};

// hk01:login: get token if the return URL has access_token param
export const getUrlToken = () => {
  const { search } = window.location;
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const { access_token } = query;
  return !R.isNil(access_token) ? access_token : null;
};

// hk01:login: go to backend auth logic with callback URL
export const backendAuth = (originUrl = '') => {
  const { API_URL } = process.env;
  const { search } = window.location;
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const { redirect } = query;

  if (!R.isNil(redirect)) originUrl = redirect;

  const cbUrl = encodeURIComponent(`${originUrl}`);
  window.location.href = `${API_URL}/v1/auth/login?callback=${cbUrl}`;
}