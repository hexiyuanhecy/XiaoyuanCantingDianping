<template>
  <div class="home-view has-header">
    <list mold="thumbnail" :items="items"></list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import List from '../components/List'
import Loading from '../components/Loading'
import axios from 'axios'

export default {
  name: 'home-view',
  components: { List, Loading },
  data () {
    return {
      title: '',
      items: []
    }
  },
  computed: {
    // Getting Vuex State from store/modules/activities
    ...mapState({
      events: state => state.activities.events
    })
  },
  methods: {
    // Using vue-infinite-loading
    onInfinite () {
      setTimeout(() => {
        this.loadMore()
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      }, 1000)
    },
    // Dispatching Actions
    ...mapActions([
      'loadMore'
    ]),
    // MY testdata
    getHomeInfo () {
      axios.get('/api/list.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      if (res) {
        this.items = res
        console.log(res)
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style lang="scss" scoped>
.sub-nav {
  margin: 0 1.8rem;
  padding-top: 0.2rem;
}
</style>
