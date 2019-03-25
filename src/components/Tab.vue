<template>
  <div class="phone-viewport">
      <md-bottom-bar md-sync-route md-type="shift" class="md-default">
        <md-bottom-bar-item :to="{ name: 'HomeView'}" id="home" md-label="首页" md-icon="home" ></md-bottom-bar-item>
        <md-bottom-bar-item id="pages" md-label="推荐" md-icon="pages"></md-bottom-bar-item>
        <md-bottom-bar-item id="posts" md-label="喜欢" md-icon="favorite"></md-bottom-bar-item>
        <md-bottom-bar-item id="favorites" md-label="我的" md-icon="person"></md-bottom-bar-item>
      </md-bottom-bar>
      <!-- <md-bottom-bar md-sync-route>
        <md-bottom-bar-item to="" md-label="Home" md-icon="home"></md-bottom-bar-item>
        <md-bottom-bar-item id="pages" md-label="推荐" md-icon="pages" to=""></md-bottom-bar-item>
        <md-bottom-bar-item id="posts" md-label="喜欢" md-icon="favorite"></md-bottom-bar-item>
        <md-bottom-bar-item id="favorites" md-label="我的" md-icon="person"></md-bottom-bar-item>
      </md-bottom-bar> -->
    </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.md-default{
 color : black !important;
 background : #fff !important;

}
</style>
