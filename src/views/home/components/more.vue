<template>
  <div>
    <van-dialog :value="value" :showConfirmButton="false">
        <van-cell-group>
            <van-cell>
              <template slot="title">
                <van-icon @click="$emit('input', false)" name="cross" />
              </template>
            </van-cell>
            <van-cell @click="dislike" icon="failure" title="不感兴趣" />
            <van-cell icon="warning-o" is-link title="反馈垃圾内容" />
            <van-cell icon="delete" title="拉黑作者" />
        </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// 导入不喜欢文章的接口
import { apiDislike } from '@/api/articles'
export default {
  props: ['value', 'artid'],
  data () {
    return {}
  },
  methods: {
    async dislike () {
      // 关闭更多组件弹窗
      this.$emit('input', false)
      // 让父组件删除对应的文章
      this.$emit('delarticle')

      let res = await apiDislike(this.artid)
      window.console.log(res)
    }
  }
}
</script>

<style>
</style>
