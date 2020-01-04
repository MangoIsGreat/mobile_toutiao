<template>
  <div>
    <van-dialog :value="value" :showConfirmButton="false">
      <van-cell-group>
        <van-cell-group v-if="isReport === false">
          <van-cell>
            <template slot="title">
              <van-icon @click="$emit('input', false)" name="cross" />
            </template>
          </van-cell>
          <van-cell @click="dislike" icon="failure" title="不感兴趣" />
          <van-cell @click="showReport" icon="warning-o" is-link title="反馈垃圾内容" />
          <van-cell icon="delete" title="拉黑作者" />
        </van-cell-group>
        <van-cell-group v-if="isReport === true">
          <van-cell>
            <template slot="title">
              <van-icon @click="isReport = false" name="arrow-left" />
            </template>
          </van-cell>
          <van-cell @click="report(item.id)" v-for="(item, index) in reportList" :key="index" :title="item.name" />
        </van-cell-group>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// 导入不喜欢文章的接口
import { apiDislike, apiReport } from '@/api/articles'
export default {
  props: ['value', 'artid'],
  data () {
    return {
      isReport: false,
      reportList: [
        { id: 0, name: '其他问题' },
        { id: 1, name: '标题夸张' },
        { id: 2, name: '低俗色情' },
        { id: 3, name: '错别字多' },
        { id: 4, name: '旧闻重复' },
        { id: 5, name: '广告软文' },
        { id: 6, name: '内容不实' },
        { id: 7, name: '涉嫌违法犯罪' },
        { id: 8, name: '侵权' }
      ]
    }
  },
  methods: {
    async dislike () {
      // 关闭更多组件弹窗
      this.$emit('input', false)
      // 让父组件删除对应的文章
      this.$emit('delarticle')

      await apiDislike(this.artid)
    },
    // 举报文章：
    async report (type) {
      try {
        await apiReport({
          artid: this.artid,
          type: type
        })
        this.$toast.success('反馈成功')
      } catch (error) {
        this.$toast.fail('反馈失败')
      }
      this.$emit('input', false)
      this.isReport = false
    },
    // 展示反馈垃圾内容面板：
    showReport () {
      this.isReport = true
    }
  }
}
</script>

<style>
</style>
