<template>
  <div class="return-bar">
    <v-toolbar
      color="white"
      light
      fixed
      dense>
        <v-btn icon class="" href="javascript:history.go(-1);">
          <v-icon class="body-3" color="black">arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title class="body-2">{{title}}{{title2}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn  flat small v-if="showbtn" @click="submit()">
          发表
        </v-btn>
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
    title2: String,
    showbtn: undefined,
    type: String
  },
  methods: {
    showTalion: function () {
      this.$emit('showTalion')
    },
    submit: function () {
      if(this.type === 'gonglue'){

      }
      else{

      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.box{
  height: 48px;
}
.v-toolbar{
  /* box-shadow: none;
  border-bottom: 1px solid rgb(230, 229, 229) !important; */
  box-shadow: 0 3px 7px 1px rgba(0,0,0,.12) !important;
}

.v-btn--small{
  font-size: 14px;
}
</style>
