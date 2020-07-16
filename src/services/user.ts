import request from '@/utils/request';
import settings  from '../../config/defaultSettings';

// export async function query(): Promise<any> {
//   return request('/api/users');
// }

export async function queryCurrent(): Promise<any> {
  return request(`${settings.apiVersion}/account`);
}

// export async function queryNotices(): Promise<any> {
//   return request('/api/notices');
// }
