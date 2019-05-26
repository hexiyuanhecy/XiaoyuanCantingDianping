<template>
  <div class="box">
    <v-progress-linear 
      :indeterminate="true" 
      height="2" 
      color="black" ></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.box{
  margin: 5px 15px 30px;
}
</style>
