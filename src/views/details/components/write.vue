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
        搜索
      </template>
    </van-search>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch (key) {
      window.console.log(key)
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
