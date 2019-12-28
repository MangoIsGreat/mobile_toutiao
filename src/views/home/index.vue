<template>
  <div class="home">
    <van-nav-bar fixed title="首页" />
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in channelsList" :key="index" :title="item.name">
        <!-- 下拉刷新组件： -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 数据列表组件： -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item, index) in list" :key="index" :title="item" />
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
// import { async } from 'q'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      // list列表数据：
      list: [],
      loading: false,
      finished: false,
      // 下拉刷新数据：
      isLoading: false,
      // 定义接收getChannelsList请求的数据：
      channelsList: []
    }
  },
  methods: {
    onLoad () {
      window.console.log('onLoad')
      // onLoad()事件加载时默认会把loading设置为true
      // 手动添加20条数据：
      let arr = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19
      ]
      // 将list[]和arr[]两个数组的数据合并：
      this.list = [...this.list, ...arr]
      // 手动设置loading为false
      this.loading = false
      if (this.list.length > 100) {
        // 手动设置finished为true
        this.finished = true
      }
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
    }
  },
  async created () {
    try {
      // 页面一加载便开始发送axios请求：
      let res = await apiGetChannel()
      // 保存请求数据：
      this.channelsList = res.data.data.channels
    } catch {
      this.$toast.fail('出错了')
    }
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
