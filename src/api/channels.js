// 在这里封装与频道相关的api
import http from '../utils/http'

function apiGetChannel () {
  return http({
    url: '/user/channels'
  })
}

function getAllChannel () {
  return http({
    url: '/channels'
  })
}

function resetChannelList (channels) {
  return http({
    url: '/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}

// 暴露接口函数：
export {
  apiGetChannel,
  getAllChannel,
  resetChannelList
}
