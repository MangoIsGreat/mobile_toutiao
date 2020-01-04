<template>
  <div class="home">
    <van-nav-bar fixed title="首页" />
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in channelsList" :key="index" :title="item.name">
        <!-- 下拉刷新组件： -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- 数据列表组件： -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell class="mycell" v-for="(subitem, subindex) in item.list" :key="subindex">
              <template slot="title">
                <!-- 文章标题 -->
                <div class="article-title">{{subitem.title}}</div>
                <!-- 图片列表展示 -->
                <van-grid v-if="subitem.cover.type > 0" :border="false" :column-num="3">
                  <van-grid-item v-for="(imageitem, imageindex) in subitem.cover.images" :key="imageindex">
                    <van-image lazy-load :src="imageitem" />
                  </van-grid-item>
                </van-grid>
                <!-- 其他信息 -->
                <div class="other">
                  <div class="info">
                    <span>{{subitem.aut_name}}</span>
                    <span>{{subitem.comm_count}}评论</span>
                    <span>{{subitem.pubdate | timeFormat}}</span>
                  </div>
                  <div class="more">
                    <van-icon class="more-icon" @click="openMore(subitem.art_id)" name="cross" />
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 菜单标签： -->
      <van-icon @click="openPopup" class="menu-icon" name="wap-nav" />
      <!-- 弹出层： -->
      <!-- <mypop :channelsList="channelsList" :value="show" @input="show=$event" @click="show=$event" :active="active" @update:active="active = $event"></mypop> -->
      <!-- 代码改造后： -->
      <mypop
        :channelsList="channelsList"
        :value="show"
        @input="show=$event"
        @click="show=$event"
        :active.sync="active"
      />
      <!-- 更多面板组件： -->
      <more v-model="moreshow" :artid = 'artid' @delarticle="delarticle" />
    </van-tabs>
  </div>
</template>

<script>
// 导入封装好频道列表相关api的脚本文件：
import { apiGetChannel } from '../../api/channels'
import { getLocal } from '../../utils/local'
import store from '../../store/index'
import { getArticlesList } from '../../api/articles'
import mypop from '../../components/mypop'
// 导入more组件：
import more from './components/more'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      // 定义接收getChannelsList请求的数据：
      channelsList: [],
      show: false,
      // 控制more组件显示与隐藏的数据：
      moreshow: false,
      // 要操作的文章的id
      artid: 0
    }
  },
  methods: {
    async onLoad () {
      // 定义一个变量用来存储当前的channelsList数据：
      let currentChannelsList = this.channelsList[this.active]
      // window.console.log(currentChannelsList)
      let id = currentChannelsList.id
      // 发送获取新闻列表的请求：
      let res = await getArticlesList({
        channelid: id,
        timestamp: Date.now()
      })

      // window.console.log(res)
      // 解决列表不触底，持续刷新的bug
      currentChannelsList.list = [
        ...currentChannelsList.list,
        ...res.data.data.results
      ]
      window.console.log(res.data.data.results)
      // 解决上拉加载更多的bug
      if (res.data.data.results.length === 0) {
        currentChannelsList.finished = true
      }
      // 手动设置loading为false
      currentChannelsList.loading = false
    },
    onRefresh () {
      let currentChannelsList = this.channelsList[this.active]
      currentChannelsList.loading = false
      currentChannelsList.finished = false
      currentChannelsList.list = []
      currentChannelsList.isLoading = false
      // 需要重新调用onLoad方法
      this.onLoad()
    },
    // 添加额外的属性：
    addOtherProp () {
      this.channelsList.forEach(item => {
        // 使用$set解决首次加载数据不显示的bug
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'isLoading', false)
        this.$set(item, 'list', [])
      })
    },
    // 打开弹出层：
    openPopup () {
      this.show = true
    },
    // 控制more组件显示与隐藏：
    openMore (artid) {
      this.moreshow = true
      this.artid = artid
    },
    // 删除文章
    delarticle () {
      // 首先需要获取当前所在的页面数据
      let dataList = this.channelsList[this.active].list
      dataList.forEach((item, index) => {
        if (item.art_id === this.artid) {
          dataList.splice(index, 1)
        }
      })
    }
  },
  async created () {
    let user = store.state.user
    try {
      // 判断用户是否登陆
      if (user.token) {
        // 页面一加载便开始发送axios请求：
        let res = await apiGetChannel()
        // 保存请求数据：
        this.channelsList = res.data.data.channels
      } else {
        // 说明用户未登陆
        // 判断是否存在localStorage
        let channels = getLocal('channels')
        if (channels) {
          this.channelsList = channels
        } else {
          // 从服务端获取数据
          let res = await apiGetChannel()
          this.channelsList = res.data.data.channels
        }
      }
    } catch {
      this.$toast.fail('出错啦')
    }
    // 打印channelsList数组的数据：
    // window.console.log(this.channelsList)
    // 添加额外的属性：
    this.addOtherProp()
  },
  components: {
    mypop,
    more
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
  .other {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #b4b4b4;
    font-size: 12px;

    .info {
      span {
        margin-right: 10px;
      }
    }

    .more {
      width: 20px;
      height: 15px;
      border: 1px solid #ccc;
      line-height: 15px;
      text-align: center;
      .more-icon {
        line-height: 15px;
      }
    }
  }
}
</style>
