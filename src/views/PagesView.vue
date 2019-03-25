<template>
  <div class="pages-view">
    <header-bar z></header-bar>
    <tab @showTalion="open"></tab>
    <router-view></router-view>
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

</style>
