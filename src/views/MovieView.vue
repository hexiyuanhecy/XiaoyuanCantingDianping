<template>
  <div class="movie-view has-header mybox">
    <scroller title="热门餐厅"></scroller>
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
import DownloadApp from '../components/DownloadApp'

export default {
  name: 'movie-view',
  components: { Scroller, Types, DownloadApp },
  data () {
    return {}
  },
  computed: {
    // Getting Vuex State from store/modules/movie
    ...mapState({
      hotMovies: state => state.movie.hotMovies,
      topMovies: state => state.movie.topMovies,
      newMovies: state => state.movie.newMovies,
      movieTags: state => state.movie.movieTags
    })
  },
  methods: {
    // Dispatching getMovie
    getMovie: function () {
      this.$store.dispatch('getMovie')
    }
  },
  created () {
    // Getting movies data on created
    this.getMovie()
  }
}
</script>

<style scoped>
.mybox{
  margin-bottom: 5.5rem;
}
</style>

