<template>
  <van-popup :value="value" @input="$emit('input', $event)" position="bottom" :style="{ height: '80%' }">
      这是评论组件
  </van-popup>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style>

</style>
