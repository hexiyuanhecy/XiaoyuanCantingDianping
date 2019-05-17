<template>
  <div id="app">
    <router-view class="view"></router-view>
    <router-view class="view" name="subject"></router-view>
    <router-view class="view" name="search"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '~css/iconfont.css';
.content .v-tabs__container {
  height: 35px !important;
}
.favourite .v-tabs__container {
  // height: 35px !important;
}
.v-tabs__div .black--text div{
  height: 30px !important;
}
.black--text .v-tabs__item{
  padding: 0 10px 0;
  font-size: 12px !important;
  color: #111 !important;
}
.v-image__image{
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.md-theme-default a:not(.md-button){
  border-radius: 8px;
}
a:not(.md-button):hover,a:not(.md-button):visited{
  text-decoration: none !important;
}
.md-checkbox.md-theme-default.md-checked .md-checkbox-container{
  background-color: #000 !important;
  border-color:  #000 !important;
}
</style>
