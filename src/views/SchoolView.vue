<template>
  <div class="login-view">
    <div class="title"><p>选择学校</p></div>
    <return-bar></return-bar>
  </div>
</template>

<script>
import ReturnBar from '../components/ReturnBar'

export default {
  name: 'school',
  components: { ReturnBar },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  height: 4rem;
  width: 80%;
  position: fixed;
  top: 0;
  z-index: 999;
  font-size: 1.6rem;
  color: white;
  text-align: center;
  margin: 0 10%;
}
</style>
