<template>
  <div class="login-view">
    <h1>
      <a href="javascript:history.go(-1);">返回</a>
    </h1>
    <div><h1>选择学校</h1></div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'school',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.login-view {
  h1 {
    a {
      position: absolute;
      left: 1.8rem;
      top: 0;
      color: #42bd56;
      font-size: 1.5rem;
      font-weight: normal;
    }
  }
}
</style>
