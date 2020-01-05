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
        <div @click="onCancel" class="mycancel">取消</div>
      </template>
    </van-search>
    <!-- 联想区域 -->
    <van-cell-group v-if="thinkList.length > 0">
      <van-cell @click="onSearch(item.oldItem)" v-for="(item, index) in thinkList" :key="index" icon="search">
          <template slot="title">
              <span v-html="item.newItem"></span>
          </template>
      </van-cell>
    </van-cell-group>
    <!-- 历史区域 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史">
          <template slot="default">
              <van-icon @click="delAll" name="delete" />
          </template>
      </van-cell>
      <van-cell @click="onSearch(item)" v-for="(item, index) in historyList" :key="index"  icon="search" :title="item">
          <template slot="right-icon">
              <van-icon @click.stop="del(item)" name="cross" />
          </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiThink } from '@/api/search.js'
import { getLocal, setLocal } from '@/utils/local.js'
export default {
  name: 'search',
  data () {
    return {
      value: '',
      //   控制联想区域和历史区域的显示和隐藏
      isThink: false,
      // 存储联想数据：
      thinkList: [],
      // 在全局定义定时器
      timer: null,
      // 搜索历史：
      historyList: []
    }
  },
  methods: {
    onSearch (key) {
      if (this.historyList.length < 0) {
        return
      }
      // 将搜索数据存储到historyList数组中：
      this.historyList.unshift(key)
      // 去重：
      this.historyList = [...new Set(this.historyList)]
      // 将搜索数据存储到localStorage中：
      setLocal('history', this.historyList)
      this.$router.push(`/searchResult/${key}`)
    },
    onCancel () {
      this.value = ''
      this.thinkList = []
    },
    // 联想功能：
    think () {
      // 搜索功能的“防抖”实现
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // 判断搜索内容是否为空：
        if (this.value.length <= 0) {
          this.thinkList = []
          return
        }
        let res = await apiThink(this.value)
        this.thinkList = res.data.data.options
        this.thinkList = this.thinkList.map(item => {
          return {
            oldItem: item,
            newItem: item.split(this.value).join(`<span style="color:red">${this.value}</span>`)
          }
        })
      }, 500)
    },
    // 删除历史数据：
    del (delItem) {
      this.historyList.forEach((item, index) => {
        if (delItem === item) {
          this.historyList.splice(index, 1)
        }
      })
      // 将删除元素后的数组重新保存到本地：
      setLocal('history', this.historyList)
    },
    // 清空搜索历史：
    delAll () {
      // 提示用户：
      this.$dialog.confirm({
        title: '警告',
        message: '你确定要清空历史纪录吗'
      }).then(() => {
        this.historyList = []
        setLocal('history', this.historyList)
      }).catch(() => {

      })
    }
  },
  created () {
    this.historyList = getLocal('history') || []
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
