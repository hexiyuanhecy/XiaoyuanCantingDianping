<template>
  <div class="return-bar">
    <v-toolbar
      color="white"
      light
      fixed
      dense>
        <v-btn icon class="" href="javascript:history.go(-1);">
          <v-icon class="body-3">arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title class="body-2">{{title}}{{title2}}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: 'return-bar',
  data () {
    return {
      show: true
    }
  },
  props: {
    title: String,
    title2: String
  },
  methods: {
    showTalion: function () {
      this.$emit('showTalion')
    },
    shoe: function () {
    }
  }
}
</script>

<style lang="scss" scoped>
.v-btn .v-btn__content .v-icon {
    color: rgba(0,0,0,.54);;
}
.box{
  height: 48px;
}
</style>
