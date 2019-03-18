<template>
  <div class="return-bar">
    <a href="javascript:history.go(-1);">
      <span class="icon">&#xe8b5;</span>
    </a>
    <div class="title" >{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'return-bar',
  data () {
    return {
      show: true
    }
  },
  props: {
    title: String
  },
  methods: {
    showTalion: function () {
      this.$emit('showTalion')
    },
    shoe: function () {
    }
  }
}
</script>

<style lang="scss" scoped>
.return-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 998;
  display: flex;
  align-items: center;
  height: 4rem;
  padding: 0 2rem;
  background: #00b600;
  border-bottom: 0.1rem solid #ccc;
  vertical-align: middle;
  .icon{
    color: #fff;
    font-size: 2rem;
  }
  .title{
    height: 4rem;
    width: 100%;
    font-size: 1.6rem;
    color: white;
    line-height: 4rem;
    text-align: center;
  }
}
</style>
