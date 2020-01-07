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
import { apiAddComment, apiAddCommReplay } from '@/api/articles'
export default {
  props: ['isReply', 'commId'],
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async onSearch () {
      // 给文章添加评论时：
      if (this.isReply === false) {
        let res = await apiAddComment({
          artId: this.$route.params.artid,
          commContent: this.value
        })
        let commData = res.data.data.new_obj
        this.$emit('addComment', commData)
        this.value = ''
      } else {
        // 给评论添加回复时：
        let res = await apiAddCommReplay({
          commId: this.commId.toString(),
          content: this.value,
          artId: this.$route.params.artid
        })
        // 保存添加的评论回复信息：
        let addReplyValue = res.data.data.new_obj
        // 将保存的信息传递给reply组件：
        this.$emit('addReply', addReplyValue)
        // 清空输入框：
        this.value = ''
      }
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
