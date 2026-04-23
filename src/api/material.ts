import weChatRequest from '../utils/request.js';

export async function uploadMedia(
  accessToken: string,
  mediaData: any,
  type: string = 'image'
): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${accessToken}&type=${type}`;
  return weChatRequest.post(url, mediaData);
}

export async function getMedia(accessToken: string, mediaId: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/media/get?access_token=${accessToken}&media_id=${mediaId}`;
  return weChatRequest.get(url);
}

export async function addMaterial(
  accessToken: string,
  mediaData: any,
  type: string = 'image'
): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${accessToken}&type=${type}`;
  return weChatRequest.post(url, mediaData);
}

export async function getMaterial(accessToken: string, mediaId: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=${accessToken}`;
  return weChatRequest.post(url, { media_id: mediaId });
}

export async function deleteMaterial(accessToken: string, mediaId: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=${accessToken}`;
  return weChatRequest.post(url, { media_id: mediaId });
}

export async function updateNews(accessToken: string, newsData: any): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/material/update_news?access_token=${accessToken}`;
  return weChatRequest.post(url, newsData);
}

export async function getMaterialCount(accessToken: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=${accessToken}`;
  return weChatRequest.get(url);
}

export async function batchGetMaterial(
  accessToken: string,
  type: string,
  offset: number = 0,
  count: number = 20
): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${accessToken}`;
  return weChatRequest.post(url, { type, offset, count });
}

export async function uploadImg(accessToken: string, mediaData: any): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=${accessToken}`;
  return weChatRequest.post(url, mediaData);
}

export async function addNews(accessToken: string, articles: any[]): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=${accessToken}`;
  return weChatRequest.post(url, { articles });
}
