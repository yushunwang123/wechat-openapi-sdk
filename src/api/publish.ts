import weChatRequest from '../utils/request.js';

export async function publish(accessToken: string, mediaId: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/freepublish/submit?access_token=${accessToken}`;
  return weChatRequest.post(url, { media_id: mediaId });
}

export async function getPublishStatus(accessToken: string, publishId: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/freepublish/get?access_token=${accessToken}`;
  return weChatRequest.post(url, { publish_id: publishId });
}

export async function deletePublish(accessToken: string, articleId: string, index: number = 0): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/freepublish/delete?access_token=${accessToken}`;
  return weChatRequest.post(url, { article_id: articleId, index });
}

export async function getArticle(accessToken: string, articleId: string): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/freepublish/getarticle?access_token=${accessToken}`;
  return weChatRequest.post(url, { article_id: articleId });
}

export async function batchGetArticle(
  accessToken: string,
  offset: number = 0,
  count: number = 20,
  noContent: boolean = false
): Promise<any> {
  const url = `https://api.weixin.qq.com/cgi-bin/freepublish/batchget?access_token=${accessToken}`;
  return weChatRequest.post(url, { offset, count, no_content: noContent });
}
