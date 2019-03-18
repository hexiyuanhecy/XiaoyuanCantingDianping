<template>
     <swiper :options="swiperOption">
        <swiper-slide>123</swiper-slide>
        <swiper-slide>12333</swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
export default {
  name: 'swiper',
  data () {
    return {
      swiperOption: {}
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
