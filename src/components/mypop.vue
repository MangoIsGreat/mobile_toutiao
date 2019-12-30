<template>
  <div>
    <van-popup :value="value" @input="$emit('input', $event)" position="bottom" :style="{ height: '85%' }" />
  </div>
</template>

<script>
export default {
  props: ['value'],
  name: 'mypop'
}
</script>

<style>
</style>
