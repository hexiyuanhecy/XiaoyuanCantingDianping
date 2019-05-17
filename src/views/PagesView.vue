<template>
  <div class="pages-view">
    <div class="top">
      <header-bar></header-bar></div>
    <div class="box"></div>
    <router-view></router-view>
    <tab @showTalion="open"></tab>
    <div class="box2"></div>
    <talion-view v-show="talion" @closeTalion="close"></talion-view>
  </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar'
import Tab from '../components/Tab'
import TalionView from '../views/TalionView'

export default {
  name: 'pages-view',
  components: { HeaderBar, Tab, TalionView },
  data () {
    return {
      talion: ''
    }
  },
  methods: {
    open: function () {
      this.talion = 'open'
    },
    close: function () {
      this.talion = ''
    }
  }
}
</script>

<style scoped>
.top{
  /* position: fixed;
  top:0; */
}
.box{
  height: 48px;
}
.box2{
  height: 56px;
}
</style>
