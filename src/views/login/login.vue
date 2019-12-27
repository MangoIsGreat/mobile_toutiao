<template>
  <div class="login-page">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="obj.mobile" :error-message="errPhoneMsg" placeholder="请输入手机号">
        <template slot="left-icon">
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>

      <van-field v-model="obj.code" :error-message="errCodeMsg" placeholder="请输入验证码">
        <template slot="left-icon">
          <i class="iconfont icon-icon--"></i>
        </template>
        <van-button color="#ededed" round slot="button" size="mini" type="primary">获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn-login">
      <van-button type="default" color="#6db4fb" @click="login" size="large">登录</van-button>
    </div>
    <!-- <div class="footer">隐私条款</div> -->
  </div>
</template>

<script>
// 导入用户请求验证的文件：
import { apiLogin } from '../../api/user'

export default {
  name: 'login',
  data: function () {
    return {
      obj: {
        mobile: '',
        code: ''
      },
      errPhoneMsg: '',
      errCodeMsg: ''
    }
  },
  methods: {
    async login () {
      if (!this.test()) {
        // 如果验证不通过终止程序：
        return
      }

      // 否则执行后续代码：
      try {
        let res = await apiLogin(this.obj)
        window.console.log(res)
      } catch {
        window.console.log('登陆失败┭┮﹏┭┮')
      }
    },
    // 封装一个验证的方法：
    test () {
      // 定义验证手机号格式的正则表达式：
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/

      // 定义一个存储登陆状态的数组：
      let testArr = []
      if (this.obj.mobile.trim().length !== 11 || !reg.test(this.obj.mobile.trim())) {
        this.errPhoneMsg = '手机号格式错误'
        testArr.push(false)
      } else {
        this.errPhoneMsg = ''
        testArr.push(true)
      }

      if (this.obj.code.trim().length !== 6) {
        this.errCodeMsg = '验证码格式错误'
        testArr.push(false)
      } else {
        this.errCodeMsg = ''
        testArr.push(true)
      }

      // 返回登陆信息的验证状态：
      return !testArr.includes(false)
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
