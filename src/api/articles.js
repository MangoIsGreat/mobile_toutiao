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

// 暴露接口：
export {
  getArticlesList,
  apiDislike,
  apiReport
}
