<template>
  <div>
    <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch">
            <template slot="action">
                <div class="mycancel">取消</div>
            </template>
    </van-search>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch (key) {
      window.console.log(key)
    },
    onCancel () {
      window.console.log('oncancel')
    }
  }
}
</script>

<style lang="less">
.mycancel {
    color: #fff;
}

.mycancel:active {
    color: #ccc;
}

.van-search__action:active {
    background-color: #3296fa;
}
</style>
