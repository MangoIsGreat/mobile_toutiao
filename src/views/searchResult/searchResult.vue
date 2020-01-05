<template>
  <div class="searchbox">
    <van-nav-bar @click-left="back" left-arrow fixed title="搜索结果" />
    <!-- 下拉刷新组件： -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- list列表组件： -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- 单元格组： -->
        <van-cell-group v-for="(item, index) in searchList" :key="index">
          <h4 class="searchTitle">{{ item.title }}</h4>
          <van-grid v-if="item.cover.type >= 0" :border="false" :column-num="3">
            <van-grid-item v-for="(imgItem, imgIndex) in item.cover.images" :key="imgIndex">
              <van-image lazy-load :src="imgItem" />
            </van-grid-item>
          </van-grid>
          <div class="authorBox">
            <span>{{ item.aut_name }}</span>
            <span>{{ item.comm_count }}评论</span>
            <span>{{ item.pubdate | timeFormat }}</span>
          </div>
          <van-grid>
            <van-grid-item @click="comment" icon="comment-o" text="评论" />
            <van-grid-item @click="like" icon="like-o" text="点赞" />
            <van-grid-item icon="share" text="分享" />
          </van-grid>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { apiGetSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  data () {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      // 搜索结果数据：
      searchList: [],
      // 搜索的参数值：
      key: '',
      // 页数:
      page: 0,
      // 每页数量：
      per_page: 10
    }
  },
  methods: {
    back () {
      // 返回到上一个路由
      this.$router.back()
    },
    // 下拉刷新方法：
    onRefresh () {
      this.loading = false
      this.finished = false
      // 搜索结果数据：
      this.searchList = []
      this.isLoading = false
      // 重新加载：
      this.onLoad()
    },
    // 加载方法：
    async onLoad () {
      this.page = this.page + 1
      let res = await apiGetSearchResult({
        page: this.page,
        perPage: this.per_page,
        q: this.key
      })
      // window.console.log(res)
      this.searchList = [...this.searchList, ...res.data.data.results]
      if (res.data.data.results.length <= 0) {
        this.finished = true
      }
      this.loading = false
    },
    // 评论的方法：
    comment () {
      let user = this.$store.state.user
      // 判断用户是否已经登陆（根据token进行判断）
      if (!user.token) {
        // 未登录则跳转到登陆页面：
        this.$router.push('/login')
        // 并且终止后面代码的运行：
        return
      }
      window.console.log('用户一登陆')
    },
    like () {
      if (!this.$login()) {
        // 如果未登陆，跳转到登陆界面，同时阻止程序继续向下运行
        return
      }
      window.console.log('搜藏成功')
    }
  },
  created () {
    this.key = this.$route.params.key
  }
}
</script>

<style lang="less">
.searchbox {
  padding-top: 46px;

  .van-pull-refresh {
    padding: 0 12px;
    background-color: #fff;

    .searchTitle,
    .van-grid {
      margin-top: 20px;
    }

    .authorBox {
      span {
        margin-right: 10px;
        font-size: 14px;
        color: #666;
      }
    }

    .van-hairline--top {
      display: flex;
      .van-grid-item {
        flex: 1;

        .van-grid-item__content--center {
          display: flex;
          flex-direction: row;

          .van-icon {
            font-size: 18px;
          }

          .van-grid-item__text {
            margin: 0;
            padding-left: 5px;
          }
        }
      }
    }
  }
  .van-nav-bar .van-icon {
    color: #fff;
  }
}
// 清楚默认样式：
h4 {
  margin: 0;
}
</style>
