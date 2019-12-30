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
                <van-icon v-if="displayIcon" class="mychannelList-icon" name="clear" />
            </van-grid-item>
    </van-grid>
      <!-- 频道推荐部分 -->
      <van-cell>
        <template slot="title">频道推荐</template>
      </van-cell>
      <!-- 频道推荐列表 -->
      <van-grid>
            <van-grid-item v-for="(item, index) in 12" :key="index" text="前端" />
    </van-grid>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ['value', 'channelsList'],
  name: 'mypop',
  data () {
    return {
      displayIcon: false
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    }
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
