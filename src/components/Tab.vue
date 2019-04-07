<template>
  <v-card height="56px">
    <v-bottom-nav
      active.sync="1"
      value="true"
      fixed
      shift
    >
      <v-btn @click="home">
        <span class="tabs">热门</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn color="" flat value="hall" @click="hall">
        <span class="tabs">分类</span>
        <v-icon>widgets</v-icon>
      </v-btn>
      <v-btn color="" flat value="gonglue" @click="gonglue">
        <span class="tabs">喜欢</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn color="" flat value="presonal" @click="personal">
        <span class="tabs">我的</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
  name: 'Homeview',
  data () {
    return {
      activeBtn: Number, String
    }
  },
  methods: {
    home () {
      this.$router.push('home')
      document.cookie = 'activeBtn=' + 0
    },
    hall () {
      this.$router.push('hall')
      document.cookie = 'activeBtn=' + 1
    },
    gonglue () {
      this.$router.push('gonglue')
      document.cookie = 'activeBtn=' + 2
    },
    personal () {
      this.$router.push('personal')
      document.cookie = 'activeBtn=' + 3
    }
  },
  mounted: function () {
    let activeBtnTemp = Number(document.cookie.split(';')[0].split('=')[1])
    // console.log(typeof activeBtnTemp)
    if (activeBtnTemp !== '') {
      this.activeBtn = activeBtnTemp
    } else this.activeBtn = 0
  }
}
</script>

<style scoped>
.tabs{
  font-size: 12px !important
}
</style>
