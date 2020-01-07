<template>
  <div>
    <van-popup :value="value" @input="$emit('input', $event)" position="bottom" :style="{ height: '80%' }">
      <comment :data="currentData"></comment>
      <van-cell title="书写评论列表："></van-cell>
      <!-- 评论列表组件： -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <comment :data="currentData"></comment>
      </van-list>
      <!-- 添加评论组件： -->
      <write />
    </van-popup>
  </div>
</template>

<script>
import comment from './comment'
import write from './write'
import bus from '@/utils/bus.js'
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
      finished: false
    }
  },
  methods: {
    // 评论列表加载事件：
    onLoad () {
      window.console.log('loading')
    }
  },
  created () {
    // 接受eventBus中传递过来的评论数据：
    bus.$on('showComment', value => {
      this.currentData = value
    })
  }
}
</script>

<style>

</style>
