<template>
  <div class="header-bar">
    <router-link tag="h1" class="title" :to="{ name: 'School'}">
      <span class="icon location">&#xe8ba;</span>
      浙江理工大学
    </router-link>
    <span class="icon" @click="showTalion">&#xe870;</span>
  </div>
</template>

<script>
export default {
  name: 'header-bar',
  data () {
    return {}
  },
  methods: {
    showTalion: function () {
      this.$emit('showTalion')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 998;
  display: flex;
  align-items: center;
  height: 4.8rem;
  padding: 0 2rem;
  background: #00b600;
  border-top: none;
  border-bottom: 0.1rem solid #ccc;
  .title {
    flex: 1;
    min-width: 4.6rem;
    max-height: 2.2rem;
    margin-right: 1.8rem;
    font-size: 14px;
    line-height: 3.2rem;
    color: #fff;
    word-break: break-all;
  }

  ul {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }

  li {
    display: inline-block;
    font-size: 1.6rem;
    margin-right: 1.2rem;
  }
  .icon{
    color: #fff;
  }
}
</style>
