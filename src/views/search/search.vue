<template>
  <div>
    <!-- 搜索框区域 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      background="#3296fa"
      @search="onSearch"
      @input="think"
    >
      <template slot="action">
        <div class="mycancel">取消</div>
      </template>
    </van-search>
    <!-- 联想区域 -->
    <van-cell-group v-if="thinkList.length > 0">
      <van-cell @click="onSearch(item)" v-for="(item, index) in thinkList" :key="index" icon="search" :title="item" />
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
import { apiThink } from '@/api/search.js'
export default {
  name: 'search',
  data () {
    return {
      value: '',
      //   控制联想区域和历史区域的显示和隐藏
      isThink: false,
      // 存储联想数据：
      thinkList: []
    }
  },
  methods: {
    onSearch (key) {
      this.$router.push(`/searchResult/${key}`)
    },
    onCancel () {
      window.console.log('oncancel')
    },
    // 联想功能：
    async think () {
      let res = await apiThink(this.value)
      this.thinkList = res.data.data.options
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
