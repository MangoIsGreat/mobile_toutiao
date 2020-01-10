<template>
  <div class="xiozhi">
      <!-- 头部导航栏： -->
      <van-nav-bar fixed title="小智同学" left-arrow @click-left="$router.push('/my')" />
      <!-- 聊天内容区域： -->
      <div class="content">
          <div class="chatBox">
              <!-- 聊天机器人 -->
              <div v-for="(item, index) in messageList" :key="index" class="chat" :class="{person: item.isrobot === false}">
                  <img src="https://img.yzcdn.cn/vant/logo.png" alt="">
                  <div>{{item.msg}}</div>
              </div>
          </div>
      </div>
      <!-- 底部输入框： -->
      <van-search
        v-model="value"
        show-action
        background="#eee"
        class="reply"
        @search="onSearch">
          <template slot="left-icon">
              <van-icon name="edit" />
          </template>
          <template slot="action">
              <span @click="onSearch">发送</span>
          </template>
      </van-search>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'xiaozhi',
  data () {
    return {
      value: '',
      messageList: [
        { isrobot: true, msg: '你好呀！' }
      ],
      //   创建全局websocket对象：
      socket: null
    }
  },
  methods: {
    onSearch () {
      this.messageList.push({
        isrobot: false,
        msg: this.value
      })
      //   发送消息到服务端：
      //   "message"为绑定的事件：
      this.socket.emit('message', {
        msg: this.value,
        timestamp: Date.now()
      })
      this.value = ''
    }
  },
  created () {
    // 创建socket实例：
    this.socket = io('http://ttapi.research.itcast.cn')
    // 接受数据：
    this.socket.on('message', obj => {
      this.messageList.push({
        isrobot: true,
        msg: obj.msg
      })
    })
  }
}
</script>

<style lang="less" scoped>
.xiozhi {
    margin-top: 46px;

    .van-nav-bar .van-icon {
        color: #fff;
    }
    .content {
        position: fixed;
        top: 46px;
        bottom: 54px;
        width: 100%;
        overflow: auto;
        .chatBox {
            .chat {
                display: flex;
                background-color: #fff;
                padding: 10px 0;
                margin-top: 14px;
                img {
                    padding: 0 10px;
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                }
                div {
                    background-color: rgb(223, 239, 250);
                    padding: 9px;
                    border-radius: 5px;
                }
            }
            .person {
                flex-direction: row-reverse;
            }
        }
    }
    .reply {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
    }
}
</style>
