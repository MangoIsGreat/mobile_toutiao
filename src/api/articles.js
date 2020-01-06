// 这里封装所有与文章与关的api
import http from '../utils/http'

function getArticlesList ({ channelid, timestamp }) {
  return http({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: {
      channel_id: channelid,
      timestamp: timestamp,
      with_top: 0
    }
  })
}

// 对文章不感兴趣:
function apiDislike (artid) {
  return http({
    url: '/article/dislikes',
    method: 'POST',
    data: {
      target: artid
    }
  })
}

// 举报文章：
function apiReport ({ artid, type }) {
  http({
    url: '/article/reports',
    method: 'POST',
    data: {
      target: artid,
      type: type,
      remark: ''
    }
  })
}

// 获取新闻文章详情：
function getArticleDetails (artid) {
  return http({
    url: `/articles/${artid}`
  })
}

// 点赞功能的实现：
function apiLike (artId) {
  return http({
    url: '/article/likings',
    method: 'post',
    data: {
      target: artId
    }
  })
}

// 不喜欢功能的实现：
function apiDislikeArt (artId) {
  return http({
    url: '/article/dislikes',
    method: 'post',
    data: {
      target: artId
    }
  })
}

// 取消对文章点赞：
function apiCancelLike (artId) {
  return http({
    url: `/article/likings/${artId}`,
    method: 'delete'
  })
}

// 取消对文章不喜欢：
function apiCancelDislike (artId) {
  return http({
    url: `/article/likings/${artId}`,
    method: 'delete'
  })
}

// 获取评论或评论回复：
function apiGetComments ({ artId, offset }) {
  return http({
    url: '/comments',
    method: 'get',
    params: {
      type: 'a',
      source: artId,
      limit: 10,
      offset: offset
    }
  })
}

// 暴露接口：
export {
  getArticlesList,
  apiDislike,
  apiReport,
  getArticleDetails,
  apiLike,
  apiDislikeArt,
  apiCancelLike,
  apiCancelDislike,
  apiGetComments
}
