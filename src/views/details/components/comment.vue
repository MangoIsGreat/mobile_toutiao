<template>
  <van-cell>
      <template slot="title">
          <div v-for="(item, index) in commList" :key="index" class="commentBox">
              <div class="comImg">
                <img :src="item.aut_photo" alt="">
              </div>
              <div class="comInfo">
                  <div class="comInfo-uname">{{item.aut_name}}</div>
                  <div class="comInfo-content">{{item.content}}</div>
                  <div class="comInfo-other">
                      <span class="comInfo-time">{{item.pubdate | timeFormat}}</span>
                      <van-button @click="showPop" class="reply" size="mini" round type="info">{{item.reply_count}} 回复</van-button>
                  </div>
              </div>
              <div class="comLoveIcon">
                <van-icon name="like" /> {{item.like_count}}
              </div>
              </div>
      </template>
  </van-cell>
</template>

<script>
export default {
  props: ['commList'],
  methods: {
    // 展示评论面板的方法：
    showPop () {
      this.$emit('showPop', true)
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
