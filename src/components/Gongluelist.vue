<template>

</template>

<script>
export default {
  name: 'card',
  props: {
    mold: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
