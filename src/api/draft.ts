import weChatRequest from '../utils/request.js';

export async function addDraft(accessToken: string, articles: any[]): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${accessToken}`;
  return weChatRequest.post(url, { articles });
}

export async function getDraft(accessToken: string, mediaId: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/draft/get?access_token=${accessToken}`;
  return weChatRequest.post(url, { media_id: mediaId });
}

export async function deleteDraft(accessToken: string, mediaId: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/draft/delete?access_token=${accessToken}`;
  return weChatRequest.post(url, { media_id: mediaId });
}

export async function updateDraft(
  accessToken: string,
  mediaId: string,
  index: number,
  articles: any
): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/draft/update?access_token=${accessToken}`;
  return weChatRequest.post(url, { media_id: mediaId, index, articles });
}

export async function countDrafts(accessToken: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/draft/count?access_token=${accessToken}`;
  return weChatRequest.get(url);
}

export async function batchGetDraft(
  accessToken: string,
  offset: number = 0,
  count: number = 20,
  noContent: boolean = false
): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/draft/batchget?access_token=${accessToken}`;
  return weChatRequest.post(url, { offset, count, no_content: noContent });
}
