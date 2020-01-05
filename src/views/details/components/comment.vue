<template>
  <van-cell>
      <template slot="title">
          <div v-for="(item, index) in 10" :key="index" class="commentBox">
              <div class="comImg">
                <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=10507900,3660235464&fm=26&gp=0.jpg" alt="">
              </div>
              <div class="comInfo">
                  <div class="comInfo-uname">137564</div>
                  <div class="comInfo-content">哈哈哈哈</div>
                  <div class="comInfo-other">
                      <span class="comInfo-time">两周前</span>
                      <van-button class="reply" size="mini" round type="info">回复3</van-button>
                  </div>
              </div>
              <div class="comLoveIcon">
                <van-icon name="like" />0
              </div>
              </div>
      </template>
  </van-cell>
</template>

<script>
export default {

}
</script>

<style lang="less">
.commentBox {
    display: flex;
    margin-top: 10px;
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
</style>
