<template>
  <div class="hall-view has-header mybox">
    <scroller title="桂花园" :items="guihuayuan"></scroller>
    <scroller title="面食主义" :items="noodles"></scroller>
    <scroller title="营养早餐" :items="breakfast"></scroller>
    <scroller title="无肉不欢" :items="meat"></scroller>
    <div class="all" @click="go">查看全部店铺</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Scroller from '../components/Scroller'
import Types from '../components/Types'

export default {
  name: 'hall-view',
  components: { Scroller, Types },
  data () {
    return {}
  },
  computed: {
    // Getting Vuex State from store/modules/hall
    ...mapState({
      guihuayuan: state => state.hall.guihuayuan,
      breakfast: state => state.hall.breakfast,
      noodles: state => state.hall.noodles,
      meat: state => state.hall.meat,
      all: state => state.hall.all
    })
  },
  methods: {
    // Dispatching getDiningHall
    getDiningHall: function () {
      this.$store.dispatch('getDiningHall')
      console.log('getDiningHall')
    },
    go: function () {
      this.$router.push('/hallall/全部餐厅')
    }
  },
  created () {
    // Getting halls data on created
    this.getDiningHall()
  }
}
</script>

<style scoped>
.mybox{
  /* margin-bottom: 5.5rem; */
}
.all{
  text-align: center;
  color: #777;
  font-size: 0.9rem;
  margin-top: 10px;
  margin-bottom: 20px;
}
.v-icon.v-icon.v-icon--link{
  padding: 2px !important;
}
</style>
