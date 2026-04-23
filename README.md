# wechat-openapi-sdk

微信开放平台 API 二次封装 SDK，支持基础接口、素材管理、草稿管理、发布能力等常用接口。

## 功能特点

- 💪 TypeScript 支持，提供完整的类型定义
- 📦 模块化设计，按功能分类便于管理
- 🔄 自动处理 access_token 管理
- ⚡ 基于 axios 封装，支持请求重试
- 📝 ES6 语法支持，简洁易用

## 关注公众号

![公众号二维码](./公众号.jpg)

## 安装

```bash
npm install wechat-openapi-sdk
```

## 快速开始

```javascript
import { getStableToken, uploadMedia, addDraft, publish } from 'wechat-openapi-sdk';

// 1. 获取 access_token
const token = await getStableToken('your_appid', 'your_secret');
console.log('access_token:', token.access_token);

// 2. 上传临时素材
const media = await uploadMedia(token.access_token, mediaData, 'image');

// 3. 创建草稿
const draft = await addDraft(token.access_token, articles);

// 4. 发布草稿
const result = await publish(token.access_token, draft.media_id);
```

## API 文档

### 1. 基础接口

#### 获取稳定版 access_token

```javascript
const result = await getStableToken(appid, secret, forceRefresh);
```

**参数说明：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appid | string | 是 | AppID |
| secret | string | 是 | AppSecret |
| forceRefresh | boolean | 否 | 是否强制刷新，默认 false |

**返回示例：**

```json
{
  "access_token": "ACCESS_TOKEN",
  "expires_in": 7200
}
```

#### 获取普通 access_token

```javascript
const result = await getAccessToken(appid, secret);
```

#### 获取微信 API 域名 IP

```javascript
const result = await getApiDomainIp(accessToken);
```

#### 获取微信 callback IP

```javascript
const result = await getCallbackIp(accessToken);
```

#### 清空 API 调用额度

```javascript
const result = await clearQuota(accessToken, appid);
```

#### 查询 API 额度

```javascript
const result = await getApiQuota(accessToken, cgiPath);
```

#### 查询 rid 信息

```javascript
const result = await getRidInfo(accessToken, rid);
```

---

### 2. 素材管理

#### 上传临时素材

```javascript
const result = await uploadMedia(accessToken, mediaData, type);
```

**参数说明：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| accessToken | string | 是 | 接口调用凭证 |
| mediaData | any | 是 | 媒体文件数据 |
| type | string | 否 | 媒体文件类型，可选值：image、voice、video、thumb |

#### 获取临时素材

```javascript
const result = await getMedia(accessToken, mediaId);
```

#### 新增永久素材

```javascript
const result = await addMaterial(accessToken, mediaData, type);
```

#### 获取永久素材

```javascript
const result = await getMaterial(accessToken, mediaId);
```

#### 删除永久素材

```javascript
const result = await deleteMaterial(accessToken, mediaId);
```

#### 修改永久图文素材

```javascript
const result = await updateNews(accessToken, newsData);
```

#### 获取素材总数

```javascript
const result = await getMaterialCount(accessToken);
```

#### 批量获取素材列表

```javascript
const result = await batchGetMaterial(accessToken, type, offset, count);
```

#### 上传图文消息内的图片

```javascript
const result = await uploadImg(accessToken, mediaData);
```

#### 新增永久图文素材

```javascript
const result = await addNews(accessToken, articles);
```

---

### 3. 草稿管理

#### 新建草稿

```javascript
const result = await addDraft(accessToken, articles);
```

#### 获取草稿

```javascript
const result = await getDraft(accessToken, mediaId);
```

#### 删除草稿

```javascript
const result = await deleteDraft(accessToken, mediaId);
```

#### 修改草稿

```javascript
const result = await updateDraft(accessToken, mediaId, index, articles);
```

#### 获取草稿总数

```javascript
const result = await countDrafts(accessToken);
```

#### 批量获取草稿列表

```javascript
const result = await batchGetDraft(accessToken, offset, count, noContent);
```

---

### 4. 发布能力

#### 发布草稿

```javascript
const result = await publish(accessToken, mediaId);
```

#### 查询发布状态

```javascript
const result = await getPublishStatus(accessToken, publishId);
```

#### 删除已发布内容

```javascript
const result = await deletePublish(accessToken, articleId, index);
```

#### 获取已发布文章

```javascript
const result = await getArticle(accessToken, articleId);
```

#### 批量获取已发布列表

```javascript
const result = await batchGetArticle(accessToken, offset, count, noContent);
```

---

## 注意事项

1. **access_token 管理**
   - access_token 有效期为 7200 秒（2 小时）
   - 建议使用 `getStableToken` 接口获取凭证，比普通接口更稳定
   - 妥善保管 access_token，避免暴露

2. **接口调用频率**
   - 部分接口有调用频率限制
   - 建议添加错误处理和重试机制

3. **安全建议**
   - AppSecret 不要暴露在前端代码中
   - 使用环境变量管理敏感信息

4. **错误处理**

```javascript
try {
  const result = await getStableToken(appid, secret);
  if (result.errcode) {
    console.error('请求失败:', result.errmsg);
    return;
  }
  console.log('access_token:', result.access_token);
} catch (error) {
  console.error('网络错误:', error);
}
```

---

## 项目结构

```
wechat-openapi-sdk/
├── src/
│   ├── api/
│   │   ├── basic.ts      # 基础接口
│   │   ├── material.ts   # 素材管理
│   │   ├── draft.ts      # 草稿管理
│   │   └── publish.ts    # 发布能力
│   ├── utils/
│   │   └── request.ts    # 请求封装
│   └── index.ts          # 统一导出
└── dist/                 # 编译输出
```

## 开发

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 开发测试
npm run dev
```

## License

MIT
