<template>
  <div class="detailsBox">
      <van-nav-bar @click-left="$router.back()" left-arrow fixed title="文章详情" />
      <!-- 文章标题 -->
      <h2 class="detailTitle">{{ articleDetails.title }}</h2>
      <!-- 作者详情： -->
      <van-cell class="autInfo">
        <template slot="title">
          <div class="aut-title">
            <div class="autImg">
              <img :src="articleDetails.aut_photo" alt="">
            </div>
            <div class="autMsg">
              <div>{{ articleDetails.aut_name }}</div>
              <div>{{ articleDetails.pubdate | timeFormat }}</div>
            </div>
            <div class="followed">
              <van-button @click="follow" v-if="articleDetails.is_followed === false" type="info">+ 关注</van-button>
              <van-button @click="unFollow" v-else type="info">已关注</van-button>
            </div>
          </div>
        </template>
      </van-cell>
      <!-- 文章详情： -->
      <van-cell>
        <div v-html="articleDetails.content"></div>
      </van-cell>
      <!-- 点赞&不喜欢 -->
      <van-cell class="like">
        <van-button @click="like" :type="articleDetails.attitude == 1? 'danger' : 'default' " plain hairline round class="checkLike">
          <van-icon class="like-icon" name="like" />&nbsp;&nbsp;&nbsp;&nbsp;点赞
        </van-button>
        <van-button @click="dislike" plain hairline :type="articleDetails.attitude == 0? 'danger' : 'default' " round class="dislike">
          <van-icon class="like-icon" name="delete" />&nbsp;&nbsp;&nbsp;&nbsp;不喜欢
        </van-button>
      </van-cell>
      <!-- 评论区域： -->
      <div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <comment :commList="commentList"></comment>
        </van-list>
      </div>
      <!-- 添加评论组件： -->
      <write></write>
  </div>
</template>

<script>
import comment from './components/comment'
import write from './components/write'
import { getArticleDetails, apiLike, apiCancelLike, apiDislikeArt, apiCancelDislike, apiGetComments } from '@/api/articles'
import { apiFollow, unFollowed } from '@/api/user'
export default {
  name: 'details',
  components: {
    comment,
    write
  },
  data () {
    return {
      artid: 0,
      // 文章详情：
      articleDetails: {},
      // 评论列表数据：
      loading: false,
      finished: false,
      offset: null,
      // 评论数据：
      commentList: {},
      endid: 0
    }
  },
  created () {
    this.artid = this.$route.params.artid
    this.getDetailArticle()
  },
  methods: {
    async getDetailArticle () {
      let res = await getArticleDetails(this.artid)
      this.articleDetails = res.data.data
      window.console.log(res)
    },
    // 关注作者：
    async follow () {
      try {
        let autoId = this.articleDetails.aut_id
        let res = await apiFollow(autoId)
        this.articleDetails.is_followed = true
        window.console.log(res)
        this.$toast.success('恭喜您，关注成功')
      } catch {
        this.$toast.fail('关注失败┭┮﹏┭┮')
      }
    },
    // 取关作者：
    async unFollow () {
      // 获取作者id
      let autoId = this.articleDetails.aut_id
      // 发送请求：
      let res = await unFollowed(autoId)
      window.console.log(res)
    },
    // 点赞功能：
    async like () {
      let attitude = this.articleDetails.attitude
      if (attitude === 1) {
        await apiCancelLike(this.artid)
        this.articleDetails.attitude = -1
      } else {
        await apiLike(this.artid)
        this.articleDetails.attitude = 1
      }
    },
    // 不喜欢功能：
    async dislike () {
      let attitude = this.articleDetails.attitude
      window.console.log(attitude)
      if (attitude === 0) {
        await apiCancelDislike(this.artid)
        this.articleDetails.attitude = -1
      } else {
        await apiDislikeArt(this.artid)
        this.articleDetails.attitude = 0
      }
    },
    // 评论列表加载时间：
    async onLoad () {
      let res = await apiGetComments({
        artId: this.artid,
        offset: this.offset
      })
      this.commentList = [...this.commentList, ...res.data.data.results]
      window.console.log(this.commentList)
      this.offset = res.data.data.end_id
      this.endid = res.data.data.last_id
      if (this.offset === this.endid) {
        this.finished = true
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less">
body {
  background-color: #fff;
}

.detailsBox {
  padding-top: 46px;

  .van-nav-bar .van-icon {
    color: #fff;
  }

  .detailTitle {
    font-weight: 400;
    line-height: 50px;
    text-align: center;
  }

  .autInfo {
    .aut-title {
      display: flex;

      .autImg {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }

      .autMsg {
        flex: 1;
        margin-left: 15px;
      }
    }
  }

  .like {
    .van-cell__value {
      display: flex;
      justify-content: space-around;
    }

    .checkLike {
      padding: 0 26px;
      border-color: #444;
    }

    .dislike {
      padding: 0 26px;
      border-color: #444;
    }
  }
}
</style>
