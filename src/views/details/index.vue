<template>
  <div class="detailsBox">
      <van-nav-bar @click-left="$router.back()" left-arrow fixed title="文章详情" />
      <!-- 文章标题 -->
      <h1 class="detailTitle">this的指向问题</h1>
  </div>
</template>

<script>
export default {
  name: 'details'
}
</script>

<style lang="less">
.detailsBox {
  padding-top: 46px;

  .van-nav-bar .van-icon {
    color: #fff;
  }

  .detailTitle {
    font-weight: 400;
    line-height: 50px;
    text-align: center;
  }
}
</style>
