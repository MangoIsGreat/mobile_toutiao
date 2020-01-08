<template>
  <div class="xiozhi">
      <!-- 头部导航栏： -->
      <van-nav-bar fixed title="小智同学" left-arrow @click-left="$router.push('/my')" />
      <!-- 聊天内容区域： -->
      <div class="content">
          <div class="chatBox">
              <!-- 聊天机器人 -->
              <div class="chat robot">
                  <img src="https://img.yzcdn.cn/vant/logo.png" alt="">
                  <div>你好呀</div>
              </div>
              <!-- 用户 -->
              <div class="chat person">
                  <img src="https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2247692397,1189743173&fm=5" alt="">
                  <div>你好呀</div>
              </div>
              <!-- 聊天机器人 -->
              <div class="chat robot">
                  <img src="https://img.yzcdn.cn/vant/logo.png" alt="">
                  <div>好o</div>
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
export default {
  name: 'xiaozhi',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {
      window.console.log('发送')
    }
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
        .chatBox {
            .chat {
                display: flex;
                background-color: #fff;
                padding: 10px 0;
                margin-top: 14px;
                img {
                    padding: 0 10px;
                }
                div {
                    background-color: rgb(223, 239, 250);
                    padding: 9px;
                    border-radius: 5px;
                }
            }
            .robot {
                img {
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                }
            }
            .person {
                flex-direction: row-reverse;
                img {
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                }
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
