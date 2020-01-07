<template>
  <div>
    <van-popup :value="value" @input="$emit('input', $event)" position="bottom" :style="{ height: '80%' }">
      <comment :replyShow="false" :data="currentData"></comment>
      <van-cell title="书写评论列表："></van-cell>
      <!-- 评论列表组件： -->
      <van-list class="comm-reply" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <comment :replyShow="false" v-for="(item, index) in commReplyList" :key="index" :data="item"></comment>
      </van-list>
      <!-- 添加评论组件： -->
      <write :commId="currentData.com_id" @addReply="addReply" :isReply="true" />
    </van-popup>
  </div>
</template>

<script>
import comment from './comment'
import write from './write'
import bus from '@/utils/bus.js'
import { apiCommentReply } from '@/api/articles.js'
export default {
  props: ['value'],
  components: {
    comment,
    write
  },
  data () {
    return {
      // 虚拟的需要回复的评论数据：
      currentData: {},
      // 评论列表组件数据：
      loading: false,
      finished: false,
      // 文章评论回复的数据：
      offset: null,
      endId: 0,
      commReplyList: []
    }
  },
  methods: {
    // 评论列表加载事件：
    async onLoad () {
      // 发送获取评论回复列表的请求：
      let res = await apiCommentReply({
        commId: this.currentData.com_id.toString(),
        offset: this.offset
      })
      this.offset = res.data.data.last_id
      this.endId = res.data.data.end_id
      this.commReplyList = res.data.data.results
      if (this.offset === this.endId) {
        this.finished = true
      }
      this.loading = false
    },
    // 添加文章评论的回复数据：
    addReply (obj) {
      this.commReplyList.unshift(obj)
      // 让评论回复数实时递增：
      this.currentData.reply_count += 1
    }
  },
  created () {
    // 接受eventBus中传递过来的评论数据：
    bus.$on('showComment', value => {
      this.currentData = value
      // 解决bug1：回复页面组件中数据共享的问题：
      this.loading = false
      this.finished = false
      this.offset = null
      this.endId = 0
      this.commReplyList = []
    })
  }
}
</script>

<style>
.comm-reply {
  margin-bottom: 54px;
}
</style>
