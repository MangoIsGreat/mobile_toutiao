// 格式化时间的拦截器
import Vue from 'vue'

// 导入dayjs插件
import dayjs from 'dayjs'
// 导入dayjs中用于展示相对时间的插件：
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') // 全局使用简体中文

// 安装dayjs插件
Vue.use(dayjs)
// 在dayjs中引入插件：
dayjs.extend(relativeTime)

Vue.filter('timeFormat', function (str) {
  return dayjs().from(dayjs(str))
})
