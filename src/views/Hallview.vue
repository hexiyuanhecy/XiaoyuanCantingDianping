<template>
  <div class="movie-view has-header mybox">
    <scroller title="无辣不欢" :items="hotMovies"></scroller>
    <scroller title="热门餐厅"></scroller>
    <scroller title="热门餐厅"></scroller>
    <scroller title="热门餐厅"></scroller>
    <scroller title="热门餐厅"></scroller>
    <scroller title="热门餐厅"></scroller>
    <scroller title="热门餐厅"></scroller>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Scroller from '../components/Scroller'
import Types from '../components/Types'

export default {
  name: 'movie-view',
  components: { Scroller, Types },
  data () {
    return {}
  },
  computed: {
    // Getting Vuex State from store/modules/movie
    ...mapState({
      hotMovies: state => state.movie.hotMovies
      // topMovies: state => state.movie.topMovies,
      // newMovies: state => state.movie.newMovies,
      // movieTags: state => state.movie.movieTags
    })
  },
  methods: {
    // Dispatching getDiningHall
    getDiningHall: function () {
      this.$store.dispatch('getDiningHall')
      console.log('getDiningHall')
    }
  },
  created () {
    // Getting movies data on created
    this.getDiningHall()
  }
}
</script>

<style scoped>
.mybox{
  margin-bottom: 5.5rem;
}
</style>

