<template>
  <v-card height="56px">
    <v-bottom-nav
      active.sync="1"
      value="true"
      fixed
      shift
    >
      <v-btn color="black" flat value="home" :to="{name: 'HomeView'}">
        <span class="tabs">热门评论</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn color="black" flat value="hall" :to="{name: 'Hallview'}">
        <span class="tabs">店铺分类</span>
        <v-icon>widgets</v-icon>
      </v-btn>
      <v-btn color="black" flat value="gonglue" :to="{name: 'Gonglue33'}">
        <span class="tabs">看看攻略</span>
        <v-icon>book</v-icon>
      </v-btn>
      <v-btn color="black" flat value="presonal" :to="{name: 'Personalview'}">
        <span class="tabs">个人中心</span>
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
  mounted: function () {}
}
</script>

<style scoped>
.tabs{
  font-size: 12px !important
}
</style>
