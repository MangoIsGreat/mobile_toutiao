<template>
  <div>
    <!-- 搜索框区域 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      background="#3296fa"
      @search="onSearch"
    >
      <template slot="action">
        <div class="mycancel">取消</div>
      </template>
    </van-search>
    <!-- 联想区域 -->
    <van-cell-group v-if="isThink">
      <van-cell icon="search" title="程序员为什么那么帅" />
      <van-cell icon="search" title="程序员为什么高薪" />
      <van-cell icon="search" title="程序员为什么喜欢穿格子衫" />
    </van-cell-group>
    <!-- 历史区域 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史">
          <template slot="default">
              <van-icon name="delete" />
          </template>
      </van-cell>
      <van-cell  icon="search" title="黑马吴彦祖">
          <template slot="right-icon">
              <van-icon name="cross" />
          </template>
      </van-cell>
      <van-cell  icon="search" title="鸡冻">
          <template slot="right-icon">
              <van-icon name="cross" />
          </template>
      </van-cell>
      <van-cell  icon="search" title="java">
          <template slot="right-icon">
              <van-icon name="cross" />
          </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      value: '',
      //   控制联想区域和历史区域的显示和隐藏
      isThink: false
    }
  },
  methods: {
    onSearch (key) {
      this.$router.push(`/searchResult/${key}`)
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
