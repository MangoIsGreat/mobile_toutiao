// 与搜索与关的所有接口
import http from '@/utils/http'

// 联想功能：
function apiThink (q) {
  return http({
    url: `/suggestion?q=${q}`
  })
}

// 搜索结果：
function apiGetSearchResult ({ page, perPage, q }) {
  return http({
    url: `/search?page=${page}&per_page=${perPage}&q=${q}`
  })
}

// 暴露接口：
export {
  apiThink,
  apiGetSearchResult
}
