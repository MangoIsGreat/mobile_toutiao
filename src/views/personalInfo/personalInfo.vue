<template>
  <div class="personal">
    <van-nav-bar fixed title="个人信息" right-text="保存" left-arrow @click-left="$router.push('/my')" @click-right="save" />
    <van-cell-group>
      <van-cell title="头像" is-link value="内容" >
          <template slot="default">
            <img class="userInfo-photo" :src="userInfo.photo" alt="">
          </template>
      </van-cell>
      <van-cell title="昵称" is-link :value="userInfo.name" />
      <van-cell title="介绍" is-link :value="user.intro" />
    </van-cell-group>
    <van-cell-group class="userInfo-personal">
      <van-cell title="性别" is-link :value="userInfo.gender?'男':'女'" />
      <van-cell title="生日" is-link :value="userInfo.birthday" />
    </van-cell-group>
  </div>
</template>

<script>
import { apiGetSelf, apiGetInfo } from '@/api/user.js'
export default {
  name: 'personalInfo',
  data () {
    return {
      userInfo: {},
      user: {}
    }
  },
  methods: {
    save () {
      window.console.log('save')
    }
  },
  async created () {
    let res = await apiGetSelf()
    this.userInfo = res.data.data

    let userRes = await apiGetInfo()
    this.user = userRes.data.data
  }
}
</script>

<style lang="less" scoped>
.personal {
    margin-top: 46px;
}
.userInfo-photo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.userInfo-personal {
    margin-top: 10px;
}
.van-nav-bar .van-icon {
    color: #fff;
}
.van-nav-bar__text {
    color: #fff;
}
.van-nav-bar__text:active {
    background-color: rgb(61, 155, 246);
    color: #ccc;
}
</style>
