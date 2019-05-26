<template>
  <div>  
    <return-bar :title="'选择学校'"></return-bar>
    <v-flex xs12 sm6 offset-sm3>
    <div class="items mx-3 py-2"
      v-for="(item,index) in items" 
      :key="index" 
      v-text="item.sc_name"
      @click="selected(item.sc_name)"></div>
    </v-flex>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReturnBar from '../components/ReturnBar'

export default {
  name: 'searchview',
  components:{
    ReturnBar
  },
  computed: {
    ...mapState({
      items: state => state.school.schoolData
    })
  },
  methods: {
    selected (val) {
      this.$router.push({ path: '/pages/home'})
      localStorage.setItem('school',val)
    }
  },
  mounted () {
    this.$store.dispatch('getSchoolData').then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.items {
  border-bottom: 1px solid rgb(228, 226, 226);
}
</style>
