<template>
  <div class="write">
    <van-search
      v-model="value"
      placeholder="请输入评论内容"
      show-action
      @search="onSearch">
      <template slot="left-icon">
        <van-icon name="edit" />
      </template>
      <template slot="action">
        <div @click="onSearch">评论</div>
      </template>
    </van-search>
  </div>
</template>

<script>
import { apiAddComment } from '@/api/articles'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async onSearch () {
      let res = await apiAddComment({
        artId: this.$route.params.artid,
        commContent: this.value
      })
      let commData = res.data.data.new_obj
      this.$emit('addComment', commData)
      this.value = ''
    }
  }
}
</script>

<style lang="less">
.write {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .van-search {
      background-color: #ccc!important;
    }
}
</style>
