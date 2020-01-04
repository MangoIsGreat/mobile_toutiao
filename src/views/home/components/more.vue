<template>
  <div>
    <van-dialog :value="value" :showConfirmButton="false">
        <van-cell-group>
            <template slot="title">
              <van-icon @click="$emit('input', false)" name="cross" />
            </template>
            <van-cell icon="failure" title="不感兴趣" />
            <van-cell icon="warning-o" is-link title="反馈垃圾内容" />
            <van-cell icon="delete" title="拉黑作者" />
        </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {}
  }
}
</script>

<style>
</style>
