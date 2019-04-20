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
