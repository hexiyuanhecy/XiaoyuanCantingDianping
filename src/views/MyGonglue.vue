<template>
    <div class="content-list">
    <return-bar title="我的攻略"></return-bar>
      <div class="content">
        <div v-if="!items" class="none">您未发表任何攻略...</div>
        <div v-else class="gonglue">
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
        </router-link></div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Estimate from '../components/Card'
import ReturnBar from '../components/ReturnBar'

export default {
  name: 'myestimate',
  components: { Estimate, ReturnBar },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      items: state => state.gonglue.user_gl
    })
  },
  mounted () {
      this.$store.dispatch('getUserGonglue')
  },
  methods: {
    datea (date) {
      return date.substring(0, 10)
    }
  }
}
</script>

<style lang="scss" scoped>
.none{
  text-align: center;
  margin-top: 50px;
}
.zoomImage{
  width:32%;
  height:0;
  padding-bottom: 25%;
  border-radius: 5px;
  overflow:hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  background-size:cover;
}
.box{
  display: flex; 
  justify-content: space-between;
  margin: 5px 15px 8px 5px;
}
.avatar{
  flex-grow: 2;
  img{
    border-radius: 50%;
  }
}
.content{
  flex-grow: 9;
  align-items: center;
  .user-info{
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .date{
      color: #777;
      font-size: 12px;
    }
  }
  .star{
    z-index: 1;
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
  .detail-img{
    padding-bottom: 10px;
    ul{
      list-style-type: none;
      padding-left: 0;
    }
    li{
      display: flex;
      div{
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
}
.gonglue{
  margin-top: 10px;
}
</style>
