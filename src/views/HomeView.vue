<template>
  <div class="home-view has-header">
    <div class="height">
      <v-carousel hide-controls hide-delimiters interval="3000"
          height="200" class="tu">
        <v-carousel-item
           v-for="(item,i) in gonglue"
          :key="i"
          :src="item.gl_main_img"
          touch
          >
          <!-- <md-card class="wenzi">
            <md-card-media-cover md-text-scrim>
              <md-card-area>
                <md-card-header> -->
                  <router-link tag="div" class="wenzi white--text" :to="{name: 'GonglueDetail', params: { id: i }}">
                    <br><br><br>
                    <div class="md-subhead" >{{item.info}}</div>
                    <div class="md-title" >{{item.gl_name}}</div>
                  </router-link>
                <!-- </md-card-header>
              </md-card-area>
            </md-card-media-cover>
          </md-card> -->
        </v-carousel-item>
      </v-carousel>
    </div>
    <list mold="thumbnail" :items="events"></list>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
      <loading slot="spinner"></loading>
    </infinite-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import List from '../components/List'
import Loading from '../components/Loading'

export default {
  name: 'home-view',
  components: { List, InfiniteLoading, Loading },
  data () {
    return {}
  },
  computed: {
    // Getting Vuex State from store/modules/activities
    ...mapState({
      events: state => state.estimate.events,
      items: state => state.star.es_star,
      gonglue: state => state.gonglue.gonglueData
    })
  },
  methods: {
    // Using vue-infinite-loading
    onInfinite () {
      setTimeout(() => {
        // this.loadMore()
        // this.$refs.infiniteLoading.$emit('$InfiniteLoading:')
      }, 1000)
    },
    // Dispatching Actions
    ...mapActions([
      'loadMore'
    ]),
    getUserInfo: function () {
      this.$store.dispatch('getUserInfo')
    },
    loadMore: function () {
      this.$store.dispatch('loadMore')
    }
  },
  mounted () {
    this.$store.dispatch('getGonglue')
    let fresh = localStorage.getItem('home')
    if(fresh){
      this.$router.go(0)
      localStorage.removeItem('home')
    }
    this.onInfinite()
    this.getUserInfo()
    this.loadMore()
  }
}
</script>

<style scoped>

.sub-nav {
  margin: 0 1.8rem;
  padding-top: 0.2rem;
}
.v-image{
    border-radius: 5px !important;
}
.tu{
  /* position: relative; */
}
.wenzi{
  text-align: left;
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  width: 95%;
  margin: 20px;
  margin-bottom: 50px;
}
.md-subhead{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
