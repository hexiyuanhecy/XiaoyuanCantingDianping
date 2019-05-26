<template>
<div class="toolbar">
  <v-toolbar
    color="white"
    light
    fixed
    dense
    >
    <v-toolbar-title @click="select">
      <span class="title">
        <v-icon>place</v-icon>
        {{school}}
      </span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon  @click="search">
      <v-icon>search</v-icon>
    </v-btn>
  </v-toolbar>
</div>
</template>

<script>

export default {
  name: 'Toolbar',
  data () {
    return {
      school: localStorage.getItem('school')||'浙江理工大学'
    }
  },
  methods: {
    select () {
      this.$router.push({ path: '/school'})
    },
    search () {
      this.$router.push({ path: '/search'})
    }
  }
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
.v-toolbar{
  /* box-shadow: none;
  border-bottom: 1px solid rgb(230, 229, 229) !important; */
  box-shadow: 0 3px 7px 1px rgba(0,0,0,.12) !important;
}
</style>
