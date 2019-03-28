<template>
<div class="toolbar">
  <v-toolbar
    absolute
    color="white"
    light
    fixed
    dense
    >
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title><span class="title">浙江理工</span></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
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
  font-size: 14px !important}
</style>
