<template>
  <div class="pages-view">
    <header-bar z></header-bar>
    <router-view></router-view>
    <tab @showTalion="open" class="tab"></tab>
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
.tab{
  position: fixed;
  bottom: 0;
}
</style>
