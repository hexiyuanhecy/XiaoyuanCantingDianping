<template>
  <div class="list">
    <div class="content">
      <v-tabs
        v-model="model"
        centered
        slider-color="black"
        class="primary--text"
      >
        <v-tab
          v-for="(value,i) in myitems"
          :key="i"
          :href="`#tab-${i}`"
          class="black--text"
        >
          {{value}}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="model">
        <v-tab-item
          v-for="(value,i) in myitems"
          :key="i"
          :value="`tab-${i}`"
        >
          <v-container
            fluid
            grid-list-md
          >
            <v-layout row wrap>
              <v-flex
                v-for="(item , index) in items[i]"
                :key="index"
                v-bind="{ [`xs6`]: true}"
              >
                <v-card>
                  <router-link tag="div" :item="item" :to="{name: 'DetailView', params: { id: item.es_id,dh_id:item.dh_id }}">
                    <div style="border-radius:8px">
                      <v-img
                      :src="item.es_main_img"
                      height="230px"
                      tile
                    >
                      <v-container
                        fill-height
                        fluid
                        pa-2
                      >
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <!-- <span class="headline white--text" v-text="item.title"></span> -->
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    </div>
                    <v-card-title dark  class="pb-0">
                        <div class="es_content">{{item.es_content}}</div>
                    </v-card-title>
                  </router-link>
                  <!-- 文字以下 -->
                  <v-card-actions class=" px-0 pt-0">
                    <v-list-tile>
                      <v-list-tile-avatar 
                        color="grey darken-3"
                        size="23"
                        width="10"
                        >
                        <v-img
                          class="elevation-4"
                          :src="item.us_pic"
                        ></v-img>
                      </v-list-tile-avatar>
              
                      <v-layout class="py-0 mt-0">
                        <div class="star">
                          <div @click="toStar(i,item.es_id,index)">
                          <v-rating
                            :value="item.star||0"
                            length="1"
                            empty-icon="favorite_border"
                            full-icon="favorite"
                            readonly="readonly"
                            color="red"
                            background-color="grey lighten-1"
                          ></v-rating></div>
                          <div class="">{{item.es_star}}</div>
                        </div>
                        <!-- <v-icon class="mr-">thumb_up</v-icon>
                        <span class="subheading">45</span> -->
                      </v-layout>

                    </v-list-tile>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-tab-item>
      </v-tabs-items>

    
    </div>
  
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'list',
  props: {
    mold: {
      type: String,
      default: 'basic'
    }
  },
  data () {
    return {
      cards: [
        { title: 'Favorite road trips', src: 'http://192.168.43.224:3001/public/images/school/zstu.jfif', flex: 6 }
      ],
      myitems: ['全部评价','无辣不欢', '清淡可口', '日韩料理', '杭帮菜品'],
      stay: undefined,
      model: 'tab-0'
    }
  },
  computed:{
    // Getting Vuex State from store/modules/activities
    ...mapState({
      events: state => state.estimate.events,
      starItem: state => state.star.es_star
    }),
    items: function () {
      // console.log(this.$store.state.star.es_star)
      var datadata = this.$store.state.estimate.events
      var stardate = this.$store.state.star.es_star
      for(let k in datadata){
        var itemdate = datadata[k]
        for (let i=0;i<stardate.length; i++){
          for (let j=0;j<itemdate.length; j++){
            if(itemdate[j].es_id === stardate[i].st_id){
              this.$store.state.estimate.events[k][j].star = 1
            }
          }
        }
      }
      console.log(this.$store.state.estimate.events)
      return this.$store.state.estimate.events
    },
    // value: function(){
    //   let events = this.events
    //   let items = this.starItem
    //   items.map((item,index) => {
    //     events.map((event,index) => {
    //       // console.log(event)
    //       if(event.es_id === item.st_id){
    //         this.star[event.es_id] = 0
    //         return 0
    //       }
    //       else {
    //         this.star[event.es_id] = 1
    //         return 1
    //       }
    //     })
    //   })
    // }
  },
  filters: {
    subStr: function (value) {
      let newVal = value.replace(/<.*?>/g, '')
      return newVal.slice(0, 30)
    }
  },
  created () {
  },
  mounted () {
    this.getUserStar()
  },
  methods:{
    getUserStar: function () {
      this.$store.dispatch('getUserStar')
    },
    toStar (i,id,index) {
      var info = {
        type: '',
        id: id,
        kind: '1'
      }
      if(this.$store.state.estimate.events[i][index].star === 1){
        // console.log('收藏l')
        info.type = 'removeStar'
        this.$store.dispatch(info).then(res => {
            // this.$store.dispatch('loadMore')
            // console.log(this.$store.state.estimate.events[index].es_star)
            this.$store.state.estimate.events[i][index].es_star -= 1
            // console.log(this.$store.state.estimate.events[index].es_star)
            this.$store.state.estimate.events[i][index].star = 0
        })
      }
      else if(this.$store.state.estimate.events[i][index].star === 0){
        // console.log('未收藏')
        info.type = 'addStar'
        this.$store.dispatch(info).then(res => {
            // this.$store.dispatch('loadMore')
            // console.log(this.$store.state.estimate.events[index].es_star)
            this.$store.state.estimate.events[i][index].es_star += 1
            // console.log(this.$store.state.estimate.events[index].es_star)
            this.$store.state.estimate.events[i][index].star = 1
        })

      }
    }
  }
}
</script>

<style lang='scss' scoped>
.v-image__image .v-image__image--cover,.v-responsive .v-image{
  border-radius: 8px !important;
}
.list {
  img{
    height: 100% ;
  }
}

  ul {
    width: 100%;
    padding: 0.5rem 0;
    margin-top: 0.5rem;
    border-bottom: 1px solid rgb(236, 236, 236);
  }


.hasCover {
  overflow-x: auto;
  white-space: nowrap;
  text-align: center;

  .title {
    display: block;
    line-height: 100%;
    font-size: 0.8rem !important;
    color: #111;
    overflow: hidden;
  }

  li {
    display: inline-block;
    width: 20%;
    margin-left: 0.6rem;
    margin-right: 0.6rem;
    &:first-child {
      padding-left: 0.5rem;
    }
  }

}

.es_content{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #111;
}
.info{
  width: 100%;
}
.star{
  display: flex;
  align-items: center;
}
</style>
