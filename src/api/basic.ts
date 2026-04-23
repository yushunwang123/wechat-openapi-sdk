import weChatRequest from '../utils/request.js';

export interface StableTokenRequest {
  grant_type: string;
  appid: string;
  secret: string;
  force_refresh?: boolean;
}

export interface StableTokenResponse {
  access_token: string;
  expires_in: number;
  errcode?: number;
  errmsg?: string;
}

export async function getStableToken(
  appid: string,
  secret: string,
  forceRefresh: boolean = false
): Promise<StableTokenResponse> {
  const url = 'https://api.weixin.qq.com/cgi-bin/stable_token';
  const requestData: StableTokenRequest = {
    grant_type: 'client_credential',
    appid,
    secret,
    force_refresh: forceRefresh,
  };

  return weChatRequest.post<StableTokenResponse>(url, requestData);
}

export async function getAccessToken(
  appid: string,
  secret: string
): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
  return weChatRequest.get(url);
}

export async function getApiDomainIp(accessToken: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/get_api_domain_ip?access_token=${accessToken}`;
  return weChatRequest.get(url);
}

export async function getCallbackIp(accessToken: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=${accessToken}`;
  return weChatRequest.get(url);
}

export async function clearQuota(accessToken: string, appid: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/clear_quota?access_token=${accessToken}`;
  return weChatRequest.post(url, { appid });
}

export async function getApiQuota(accessToken: string, cgiPath: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/openapi/quota/get?access_token=${accessToken}`;
  return weChatRequest.post(url, { cgi_path: cgiPath });
}

export async function getRidInfo(accessToken: string, rid: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/openapi/rid/get?access_token=${accessToken}`;
  return weChatRequest.post(url, { rid });
}
