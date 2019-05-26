<template>
  <div class="search-view has-header">
    <return-bar :title="'搜索'"></return-bar>
    <br>
    <v-autocomplete
      v-model="select"
      cache-items
      light
      class="mx-3"
      flat
      hide-no-data
      hide-details
      label="搜索"
      solo-inverted
    ></v-autocomplete>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReturnBar from '../components/ReturnBar'

export default {
  name: 'searchview',
  components: {ReturnBar},
  data () {
    return {
      queryStr: '',
      loading: false,
        items: [],
        search: null,
        select: null,
        states: [
          'Alabama',
          'Alaska',
          'American Samoa',
          'Arizona',
          'Arkansas',
          'California']
    }
  },
  computed: {
    ...mapState({
      queryRes_movie: state => state.search.queryRes_movie
    })
  },
  methods: {
  },
  created: function () {
  }
}
</script>

<style lang="scss" scoped>

</style>
