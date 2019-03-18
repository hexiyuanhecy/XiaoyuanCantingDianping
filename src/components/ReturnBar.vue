<template>
  <div class="return-bar">
    <a href="javascript:history.go(-1);">
      <span class="icon">&#xe8b5;</span>
    </a>
    <div v-if="show">评论详情</div>
  </div>
</template>

<script>
export default {
  name: 'return-bar',
  data () {
    return {
      show: false
    }
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
  .icon{
    color: #fff;
    font-size: 2rem;
  }


}
</style>
