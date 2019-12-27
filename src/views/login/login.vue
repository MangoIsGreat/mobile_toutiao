<template>
  <div class="login-page">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="obj.phone" placeholder="请输入手机号">
        <template slot="left-icon">
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>

      <van-field v-model="obj.code" placeholder="请输入验证码">
        <template slot="left-icon">
          <i class="iconfont icon-icon--"></i>
        </template>
        <van-button color="#ededed" round slot="button" size="mini" type="primary">获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn-login">
      <van-button type="default" color="#6db4fb" size="large">登录</van-button>
    </div>
    <!-- <div class="footer">隐私条款</div> -->
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      obj: {
        phone: '',
        code: ''
      }
    }
  }
}
</script>

<style lang="less">
body {
  height: 100%;
  background-color: #f5f7f9;
  position: relative;
  .login-page {

    .van-cell-group {
      .van-cell {
        padding-left: 5px;

        .van-field__control::placeholder {
          color: #cecece;
        }
      }
      .icon-shouji {
        font-size: 24px;
        padding-left: 8px;
        margin-right: 7px;
      }

      .icon-icon-- {
        font-size: 30px;
        margin: 5px;
      }

      .van-button {
        line-height: 20px;

        .van-button__text {
          padding: 4px 10px;
          line-height: 20px;
          color: #666;
        }
      }
    }

    .btn-login {
      padding: 52px 32px 0;

      .van-button--large {
        border-radius: 5px;
      }
    }

    // .footer {
    //   position: absolute;
    //   bottom: 10px;
    // }
  }
}
</style>
