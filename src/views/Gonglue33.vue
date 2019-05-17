<template>
    <div class="content-list">
      <v-btn 
        color="primary" 
        fab 
        small 
        dark
        fixed
        bottom
        right
        :to="{ name: 'EditGonglue'}"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <router-link tag="div" v-for="(item, index) in items" :key="index"  :to="{name: 'GonglueDetail', params: { id: item.gl_id }}">
        <md-card>
          <md-card-media-cover md-text-scrim>
            <md-card-media md-ratio="16:9">
              <img :src="item.gl_main_img" alt="Skyscraper">
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <span class="md-title">{{item.gl_name}}</span>
                <span class="md-subhead">{{item.us_name}}</span>
                <p class="gonglue-content-info" v-text="item.info"></p>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
        <br>
      </router-link>
      <!-- <gongluelist mold="quote" v-for="(item, index) in items" :key="index"></gongluelist> -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Gongluelist from '../components/Gongluelist'

export default {
  name: 'gongluelist',
  components: { Gongluelist },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      items: state => state.gonglue.gonglueData
    })
  },
  mounted () {
      this.$store.dispatch('getGonglue')
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.md-card-media.md-ratio-16-9{
  border-radius: 8px !important;
}
.gonglue-content-info{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.theme--dark.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
    margin-bottom: 5rem;
    border-radius: 50%;
}
</style>
