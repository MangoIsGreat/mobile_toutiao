<template>
  <div class="home">
    <van-nav-bar fixed title="首页" />
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in channelsList" :key="index" :title="item.name">
        <!-- 下拉刷新组件： -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- 数据列表组件： -->
          <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item, index) in item.list" :key="index" :title="item.aut_name" />
            {{active}}
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 菜单标签： -->
      <van-icon class="menu-icon" name="wap-nav" />
    </van-tabs>
  </div>
</template>

<script>
// 导入封装好频道列表相关api的脚本文件：
import { apiGetChannel } from '../../api/channels'
import { getLocal } from '../../utils/local'
import store from '../../store/index'
import { getArticlesList } from '../../api/articles'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      // list列表数据：
      // list: [],
      // loading: false,
      // finished: false,
      // 下拉刷新数据：
      // isLoading: false,
      // 定义接收getChannelsList请求的数据：
      channelsList: []
    }
  },
  methods: {
    async onLoad () {
      // 定义一个变量用来存储当前的channelsList数据：
      let currentChannelsList = this.channelsList[this.active]
      // window.console.log(currentChannelsList)
      let id = currentChannelsList.id
      // 发送获取新闻列表的请求：
      let res = await getArticlesList({
        channelid: id,
        timestamp: Date.now()
      })

      // window.console.log(res)
      // 解决列表不触底，持续刷新的bug
      currentChannelsList.list = [...currentChannelsList.list, ...res.data.data.results]
      // 解决上拉加载更多的bug
      if (res.data.data.results.length === 0) {
        currentChannelsList.finished = true
      }
      // 手动设置loading为false
      currentChannelsList.loading = false
    },
    onRefresh () {
      window.console.log('onRefresh')
      setTimeout(() => {
        // 重置数据
        this.list = []
        // 手动设置loading为false
        this.loading = false
        // 手动设置finished为false
        this.finished = false
        // 手动设置isLoading为false
        this.isLoading = false
        this.onLoad()
      }, 1000)
    },
    // 添加额外的属性：
    addOtherProp () {
      this.channelsList.forEach((item) => {
        // 使用$set解决首次加载数据不显示的bug
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'isLoading', false)
        this.$set(item, 'list', [])
      })
    }
  },
  async created () {
    let user = store.state.user
    try {
      // 判断用户是否登陆
      if (user.token) {
        // 页面一加载便开始发送axios请求：
        let res = await apiGetChannel()
        // 保存请求数据：
        this.channelsList = res.data.data.channels
      } else {
        // 说明用户未登陆
        // 判断是否存在localStorage
        let channels = getLocal('channels')
        if (channels) {
          this.channelsList = channels
        } else {
          // 从服务端获取数据
          let res = await apiGetChannel()
          this.channelsList = res.data.data.channels
        }
      }
    } catch {
      this.$toast.fail('出错啦')
    }
    // 打印channelsList数组的数据：
    window.console.log(this.channelsList)
    // 添加额外的属性：
    this.addOtherProp()
  }
}
</script>

<style lang="less">
.home {
  margin-bottom: 50px;
  margin-top: 90px;

  .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 999;
    width: 90%;
  }

  .menu-icon {
    position: fixed;
    top: 46px;
    right: 0;
    z-index: 999;
    width: 10%;
    line-height: 44px;
    text-align: center;
  }
}
</style>
