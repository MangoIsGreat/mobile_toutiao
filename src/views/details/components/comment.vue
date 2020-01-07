<template>
  <van-cell>
      <template slot="title">
          <div class="commentBox">
              <div class="comImg">
                <img :src="data.aut_photo" alt="">
              </div>
              <div class="comInfo">
                  <div class="comInfo-uname">{{data.aut_name}}</div>
                  <div class="comInfo-content">{{data.content}}</div>
                  <div class="comInfo-other">
                      <span class="comInfo-time">{{data.pubdate | timeFormat}}</span>
                      <van-button v-if="replyShow" @click="showPop" class="reply" size="mini" round type="info">{{data.reply_count}} 回复</van-button>
                  </div>
              </div>
              <div class="comLoveIcon">
                <van-icon name="like" /> {{data.like_count}}
              </div>
              </div>
      </template>
  </van-cell>
</template>

<script>
import bus from '@/utils/bus.js'
export default {
  props: ['data', 'replyShow'],
  methods: {
    // 展示评论面板的方法：
    showPop () {
      this.$emit('showPop', true)
      bus.$emit('showComment', this.data)
    }
  }
}
</script>

<style lang="less">
.commentBox {
    display: flex;
    margin-top: 10px;
    margin-bottom: 54px;
    .comImg {
        img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
        }
    }
    .comInfo {
        flex: 1;
        margin-left: 15px;
        .comInfo-uname {
            color: #666;
        }
        .comInfo-content {
            margin: 4px 0;
        }
        .comInfo-other {
            line-height: 26px;
            .comInfo-time {
                margin-right: 10px;
            }
            .reply {
                background-color: #ccc;
                border: none;
                color: #555;
                line-height: 22px;
                span {
                    line-height: 16px;
                    padding: 3px 5px;
                }
            }
        }
    }
}

.commentBox .comInfo .comInfo-other .reply span {
    padding: 3px 12px;
    font-size: 12px;
    text-align: center;
}
</style>
