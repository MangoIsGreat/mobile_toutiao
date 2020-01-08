<template>
  <div class="personal">
    <van-nav-bar fixed title="个人信息" right-text="保存" left-arrow @click-left="$router.push('/my')" @click-right="save" />
    <van-cell-group>
      <van-cell title="头像" @click="showing" is-link value="内容" >
          <template slot="default">
            <img class="userInfo-photo" :src="userInfo.photo" alt="">
          </template>
      </van-cell>
      <van-cell @click="showPop = true" title="昵称" is-link :value="userInfo.name" />
      <van-cell title="介绍" is-link :value="user.intro" />
    </van-cell-group>
    <van-cell-group class="userInfo-personal">
      <van-cell title="性别" is-link :value="userInfo.gender?'男':'女'" />
      <van-cell title="生日" is-link :value="userInfo.birthday" />
    </van-cell-group>
    <van-popup v-model="showPop" position="bottom" :style="{ height: '8%' }">
      <van-field required v-model="userInfo.name" />
    </van-popup>
    <!-- 头像弹出层： -->
    <van-popup :close-on-click-overlay="false" v-model="show" :style="{ width: '85%', borderRadius: '5px' }">
      <div class="titleImgTitle">
        <div @click="openImg">从相册中获取</div>
        <input ref="selectPhoto" class="inputFile" @change="updatePhoto" type="file">
        <div>拍照</div>
        <div @click="show = false">取消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { apiGetSelf, apiGetInfo, apiEditUserInfo, apiUpdateUserImg } from '@/api/user.js'
// 实现图片预览功能：
import Vue from 'vue'
import { ImagePreview } from 'vant'

Vue.use(ImagePreview)
export default {
  name: 'personalInfo',
  data () {
    return {
      userInfo: {},
      user: {},
      showPop: false,
      show: false
    }
  },
  methods: {
    async save () {
      await apiEditUserInfo({
        name: this.userInfo.name,
        gender: this.userInfo.gender,
        intro: this.user.intro,
        birthday: this.userInfo.birthday
      })
    },
    // 打开头像弹出层
    showing () {
      this.show = true
    },
    openImg () {
      let showMsg = this.$refs.selectPhoto
      showMsg.click()
    },
    // 实现图片预览：
    updatePhoto () {
      // 获取图片文件对象：
      let updatePhoto = this.$refs.selectPhoto.files[0]
      // 将图片文件对象转成base64编码：
      var reader = new FileReader()

      if (updatePhoto) {
        reader.readAsDataURL(updatePhoto)
      }

      reader.addEventListener('load', () => {
        // 预览图片：
        ImagePreview({
          images: [
            reader.result
          ],
          onClose: this.selectUpdate
        })
      })
    },
    // 确定是否更新头像：
    selectUpdate () {
      this.$dialog.confirm({
        message: '您确定要更换头像吗？'
      }).then(async () => {
        let updatePhoto = this.$refs.selectPhoto.files[0]
        let res = await apiUpdateUserImg(updatePhoto)
        this.userInfo.photo = res.data.data.photo
        this.show = false
      }).catch(() => {
        this.show = false
      })
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
.titleImgTitle {
  div {
    font-size: 16px;
    line-height: 34px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    color: #333;
  }
}

.inputFile {
  display: none;
}
</style>
