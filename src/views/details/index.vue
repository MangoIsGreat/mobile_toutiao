<template>
  <div class="detailsBox">
      <van-nav-bar @click-left="$router.back()" left-arrow fixed title="文章详情" />
      <!-- 文章标题 -->
      <h2 class="detailTitle">this的指向问题</h2>
      <!-- 作者详情： -->
      <van-cell class="autInfo">
        <template slot="title">
          <div class="aut-title">
            <div class="autImg">
              <img src="http://img5.imgtn.bdimg.com/it/u=389433887,3486657666&fm=26&gp=0.jpg" alt="">
            </div>
            <div class="autMsg">
              <div>作者名称</div>
              <div>发布时间</div>
            </div>
            <div class="followed">
              <van-button type="info">+ 关注</van-button>
            </div>
          </div>
        </template>
      </van-cell>
      <!-- 文章详情： -->
      <van-cell>
        <div v-for="(item, index) in 10" :key="index">内容区域</div>
      </van-cell>
      <!-- 点赞&不喜欢 -->
      <van-cell class="like">
        <van-button plain hairline round class="checkLike">
          <van-icon class="like-icon" name="like" />&nbsp;&nbsp;&nbsp;&nbsp;点赞
        </van-button>
        <van-button plain hairline round class="dislike">
          <van-icon class="like-icon" name="delete" />&nbsp;&nbsp;&nbsp;&nbsp;不喜欢
        </van-button>
      </van-cell>
      <!-- 评论区域： -->
      <div>
        <comment></comment>
      </div>
      <!-- 添加评论组件： -->
      <write></write>
  </div>
</template>

<script>
import comment from './components/comment'
import write from './components/write'
export default {
  name: 'details',
  components: {
    comment,
    write
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
      border-color: red;
      color: red;
    }
  }
}
</style>
