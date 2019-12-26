<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="obj.phone" label="手机号" placeholder="请输入手机号" />

      <van-field v-model="obj.code" label="验证码" placeholder="请输入验证码" />
    </van-cell-group>
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

<style>
</style>
