<template>
  <div class="user">
    <!-- 用户个人信息区域: -->
    <div>
      <div v-if="isLogin" class="myInfo">
        <div class="userInfo">
          <div class="uImg">
            <img @click="$router.push('/personalInfo')" :src="userInfo.photo" alt="">
          </div>
          <div class="uName">{{ userInfo.name }}</div>
          <div class="today">
            <div>今日阅读</div>
            <div>1分钟</div>
          </div>
        </div>
        <div class="activity">
          <div>
            <div>{{ userInfo.art_count }}</div>
            <div>动态</div>
          </div>
          <div>
            <div>{{ userInfo.follow_count }}</div>
            <div>关注</div>
          </div>
          <div>
            <div>{{ userInfo.fans_count }}</div>
            <div>粉丝</div>
          </div>
        </div>
      </div>
      <div v-else class="noLogin">
        <div @click="$router.push('/checkLogin')" class="userImg">
          <van-icon class="noLogin-user" name="user-o" />
        </div>
        <div class="today">
          <div>今日阅读</div>
          <div>1分钟</div>
        </div>
      </div>
    </div>
    <!-- 收藏区域： -->
    <div class="collect">
      <van-grid :column-num="3">
        <van-grid-item class="collection" icon="star-o" text="收藏" />
        <van-grid-item class="history" icon="clock-o" text="历史" />
        <van-grid-item class="production" icon="records" text="作品" />
      </van-grid>
    </div>
    <!-- 消息通知区域： -->
    <div class="message">
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link />
    </div>
  </div>
</template>

<script>
import { apiGetInfo } from '@/api/user.js'
export default {
  name: 'my',
  data () {
    return {
      isLogin: true,
      // 用户信息：
      userInfo: {}
    }
  },
  async created () {
    // 判断用户是否登陆：
    let user = this.$store.state.user
    if (user.token) {
      this.isLogin = true
      let res = await apiGetInfo()
      this.userInfo = res.data.data
    } else {
      this.isLogin = false
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  background-color: rgb(244, 245, 248);
  .myInfo {
    padding: 30px 20px;
    background-color: rgb(61, 155, 246);
    .userInfo {
      display: flex;
      position: relative;
      .uImg {
        margin: 0 20px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
      .uName {
        color: #fff;
        font-size: 20px;
      }
      .today {
        position: absolute;
        right: -20px;
        top: 0;
        background-color: rgba(0, 0, 0, .4);
        border-radius: 50px 0 0 50px;
        padding: 5px 14px;
        text-align: center;
        div {
          color: #fff;
          font-size: 12px;
          line-height: 18px;
        }
      }
    }

    .activity {
      margin-top: 20px;
      display: flex;
      text-align: center;
      div {
        flex: 1;
        color: #fff;
      }
    }
  }

  .noLogin {
    height: 186px;
    background-color: rgb(61, 155, 246);
    overflow: hidden;
    .userImg {
      width: 60px;
      height: 60px;
      background-color: #fff;
      border-radius: 50%;
      margin: 30px auto;
      display: flex;
      justify-content: center;
      .noLogin-user {
        line-height: 60px;
        font-size: 30px;
      }
    }
    .today {
        position: absolute;
        right: 0px;
        top: 30px;
        background-color: rgba(0, 0, 0, .4);
        border-radius: 50px 0 0 50px;
        padding: 5px 14px;
        text-align: center;
        div {
          color: #fff;
          font-size: 12px;
          line-height: 18px;
        }
      }
  }

  .collect {
    .collection {
      color: rgb(233, 112, 116);
    }
    .history {
      color: rgb(231, 170, 83);
    }
    .production {
      color: rgb(139, 163, 225);
    }
  }

  .message {
    margin-top: 10px;
  }
}
</style>
