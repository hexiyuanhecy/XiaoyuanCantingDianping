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
      <router-link tag="div" v-for="(item, index) in items" :key="index" to="/gonglue_detail">
        <md-card>
          <md-card-media-cover md-text-scrim>
            <md-card-media md-ratio="16:9">
              <img :src="item.src" alt="Skyscraper">
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <span class="md-title">学姐带你吃遍浙理！</span>
                <span class="md-subhead">无名之人</span>
                <p class="gonglue-content-info">下沙食堂哪家强，当数浙理的饭堂，今天就让学姐带你来品味一下浙理的网红餐厅！</p>
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
import Gongluelist from '../components/Gongluelist'

export default {
  name: 'status',
  components: { Gongluelist },
  data () {
    return {
      items: [
        {src: 'http://192.168.43.224:3001/public/images/estimate/11.jpg'},
        {src: 'http://192.168.43.224:3001/public/images/estimate/12.jpg'},
        {src: 'http://192.168.43.224:3001/public/images/estimate/13.jpg'},
        {src: 'http://192.168.43.224:3001/public/images/estimate/14.jpg'},
        {src: 'http://192.168.43.224:3001/public/images/estimate/15.jpg'},
        {src: 'http://192.168.43.224:3001/public/images/estimate/16.jpg'}
      ]
    }
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
