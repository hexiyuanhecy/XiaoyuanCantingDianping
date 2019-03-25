<template>
  <div class="page-container md-elevation-1">
    <md-app md-mode="reveal" class="headerbar md-elevation-1">
      <md-app-toolbar class="">
        <md-button class="md-icon-button">
          <md-icon class="icon location">&#xe8ba;</md-icon>
        </md-button>
        <span class="md-title ">浙江理工大学</span>
        <md-button class="md-icon-button">
          <md-icon>more_vert</md-icon>
        </md-button>
      </md-app-toolbar>
    </md-app>
  </div>
</template>

<!--<template>
  <div class="header-bar">
    <router-link tag="h1" class="title" :to="{ name: 'School'}">
      <span class="icon location">&#xe8ba;</span>
      浙江理工大学
    </router-link>
    <span v-if="show" class="icon" @click="showTalion">&#xe870;</span>
  </div>
</template>
-->

<script>
export default {
  name: 'header-bar'
}

</script>

<style lang='scss' scoped>
.md-title{
  color :black;
  font-size : 14px;
  margin-left : 6px;
}
</style>
