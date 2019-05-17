<template>
  <div class="favourite">
    <return-bar title="我的收藏"></return-bar>
    <v-tabs
        v-model="model"
        centered
        fixed-tabs
        slider-color="black"
        class="primary--text"
      >
        <v-tab
          v-for="(value,k) in myitems"
          :key="k"
          :href="`#tab-${k}`"
          class="black--text"
        >
          <span class="blacktext" v-text="value"></span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="model">
        <v-tab-item value="tab-0" >
          <div class="content">
            <esjianjie v-for="(value,index) in getitems()[1]" :key="index" :item="value" :i='index' :k='-1'></esjianjie>
          </div>
        </v-tab-item>

        <v-tab-item value="tab-1" >
          <div class="content hall">
              <hall class="hallall mx-1 my-2" v-for="(item, index) in getitems()[2]" :key="index" :item='item'></hall>
            
         </div>
        </v-tab-item>

        <v-tab-item value="tab-2">
          <div class="content">
            <!-- <esjianjie v-for="(value,index) in 3" :key="index" :item="value" :i='index'></esjianjie> -->
            <router-link tag="div" v-for="(item, index) in getitems()[3]" :key="index"  :to="{name: 'GonglueDetail', params: { id: item.gl_id }}">
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
           </div>
        </v-tab-item>
      </v-tabs-items>

    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ReturnBar from '../components/ReturnBar'
import Esjianjie from '../components/Card'
import Hall from '../components/Hall'
export default {
  name: 'estimate',
  components: { 
    ReturnBar, 
    Esjianjie,
    Hall
  },
  data () {
    return {
      myitems: ['评价','店铺', '攻略'],
      model: 'tab-0'
    }
  },
  computed:{
    ...mapState({
      events: state => state.estimate.events[0],
      gonglueItems: state=> state.gonglue.gonglueData,
      hallItems: state=> state.hall.obj[0],
      starItem: state => state.star.es_star
    })
  },
  methods:{
    ...mapActions([
      'getDiningHall',
      'getGonglue',
      'gerEstimateStar',
      'getUserStar'
    ]),
    check (stardata,esdata,type) {
      let arr = []
      if(type === 1){
        for (let i=0;i<stardata.length; i++){
          for (let j=0;j<esdata.length; j++){
            if(esdata[j].es_id === stardata[i].st_id){
              arr.push(esdata[j])
            }
          }
        }
      }
      else if(type === 2){
        for (let i=0;i<stardata.length; i++){
          for (let j=0;j<esdata.length; j++){
            if(esdata[j].dh_id === stardata[i].st_id){
              arr.push(esdata[j])
            }
          }
        }
      }
      else{
        for (let i=0;i<stardata.length; i++){
          for (let j=0;j<esdata.length; j++){
            if(esdata[j].gl_id === stardata[i].st_id){
              arr.push(esdata[j])
            }
          }
        }
      }
      return arr
    },
    getitems: function () {
      let items = {
        1: [],
        2: [],
        3: []
      }
      var stares = this.$store.state.star.es_star
      var stardh = this.$store.state.star.dh_star
      var stargl = this.$store.state.star.gl_star
      var esdata = this.$store.state.estimate.us_es
      var dhdata = this.$store.state.hall.obj[0]
      var gldata = this.$store.state.gonglue.gonglueData
      items[1] = this.check(stares,esdata,1)
      items[2] = this.check(stardh,dhdata,2)
      items[3] = this.check(stargl,gldata,3)
      // console.log(stares)
      // console.log(dhdata)
      // console.log(items[3])
      return items
    }
  },
  mounted () {
    // this.getUserStar()
    this.getDiningHall()
    this.$store.dispatch('getUserStar')
    this.$store.dispatch('getGonglue')
    this.gerEstimateStar()
    this.getitems()
    // console.log(this.$store.state.star.es_star)
    window.reload()
  }
}
</script>

<style lang="scss" scoped>
.blacktext{
  font-size: 14px;
  letter-spacing: 10px;
}
.v-window-item{
  padding-bottom: 20px;
}
.content{
  margin: 10px 15px 20px;
  .hall{}
}
.gonglue-content-info{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
