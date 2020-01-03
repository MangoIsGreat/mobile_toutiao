<template>
  <div class="mypop">
    <van-popup
      class="mypop-van-popup"
      :value="value"
      @input="$emit('input', $event)"
      position="bottom"
      :style="{ height: '85%' }"
    >
    <!-- xx关闭按钮 -->
      <van-cell>
        <template slot="title">
          <van-icon @click="close" name="cross" />
        </template>
      </van-cell>
      <!-- 我的频道和编辑频道 -->
      <van-cell>
        <template slot="title">我的频道</template>
        <template slot="default">
          <van-button class="mydefault" v-if="!displayIcon" @click="displayIcon = true" plain size="mini" round type="primary">编辑</van-button>
          <van-button class="mydefault" v-else @click="displayIcon = false" plain size="mini" round type="primary">完成</van-button>
        </template>
      </van-cell>
      <!-- 我的频道列表： -->
      <van-grid>
            <van-grid-item class="mychannel" v-for="(item, index) in channelsList" name="clear" :key="index">
                <span class="mychannelList">{{item.name}}</span>
                <van-icon @click="delChannel(item)" v-if="displayIcon && index !== 0" class="mychannelList-icon" name="clear" />
            </van-grid-item>
    </van-grid>
      <!-- 频道推荐部分 -->
      <van-cell>
        <template slot="title">频道推荐</template>
      </van-cell>
      <!-- 频道推荐列表 -->
      <van-grid>
            <van-grid-item @click="addChannels(item)" v-for="(item, index) in allOtherChannels" :key="index" :text="item.name" />
    </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannel, resetChannelList } from '../api/channels'
import { setLocal } from '../utils/local'
export default {
  props: ['value', 'channelsList'],
  name: 'mypop',
  data () {
    return {
      displayIcon: false,
      otherChannels: []
    }
  },
  computed: {
    allOtherChannels () {
      let ids = this.channelsList.map(item => {
        return item.id
      })

      return this.otherChannels.filter(item => {
        return !ids.includes(item.id)
      })
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    },
    async getAllChannel () {
      let res = await getAllChannel()
      this.otherChannels = res.data.data.channels
    },
    // 添加频道
    async addChannels (item) {
      // 添加额外属性
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'isLoading', false)
      this.$set(item, 'list', [])
      this.channelsList.push(item)
      //   首先要先判断是否已经登录：
      let user = this.$store.state.user
      if (user.token) {
        let channels = this.channelsList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await resetChannelList(channels)
      } else {
        setLocal('channels', this.channelsList)
      }
    },
    // 删除频道：
    async delChannel (obj) {
      this.channelsList.forEach((item, index) => {
        if (item.id === obj.id) {
          this.channelsList.splice(index, 1)
        }
      })

      // 需要判断用户是否已经登陆：
      let user = this.$store.state.user
      if (user.token) {
        // 生成频道数组：
        let channels = []
        this.channelsList.slice(1).forEach((item, index) => {
          channels.push({
            id: item.id,
            seq: index + 2
          })
        })
        // 将频道列表数据保存到服务器：
        await resetChannelList(channels)
      } else {
        // 用户未登录则保存到本地：
        setLocal('channels', this.channelsList)
      }
    }
  },
  created () {
    this.getAllChannel()
  }
}
</script>

<style lang="less">
.mypop {
  .mypop-van-popup {
    .mydefault {
      color: red;
      border: 1px solid red;
    }
  }
  .mychannel {
      position: relative;
      .mychannelList {
          color: #646566;
          font-size: 12px;
      }
      .mychannelList-icon {
          position: absolute;
          right: 3px;
          top: 3px;
          color: #ccc;
      }
  }
}
</style>
