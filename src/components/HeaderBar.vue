<template>
<div class="toolbar">
  <v-toolbar
    color="white"
    light
    fixed
    dense
    >
    <v-toolbar-side-icon color="balck"></v-toolbar-side-icon>

    <v-toolbar-title :to="{ name: 'School'}"><span class="title">浙江理工</span></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon :to="{ name: 'Search'}">
      <v-icon>search</v-icon>
    </v-btn>
  </v-toolbar>
</div>
</template>

<script>

export default {
  name: 'Toolbar'
}
</script>

<style scoped>
.title{
  font-size: 14px !important
}
.v-btn .v-btn__content .v-icon {
    color: rgba(0,0,0,.54);;
}
.v-btn--active:before, .v-btn:focus:before, .v-btn:hover:before{
  background: none;
}
</style>
