<template>
  <div class="list">
    <div class="content">
      <!-- 筛选按钮 -->
      <v-flex xs12 sm12 d-flex>
        <v-select 
          v-model="value1"
          :items="myitems"
          :menu-props="{ maxHeight: '350' }"
          solo
          dense
          flat
          hide-selected
          light
        ></v-select>
        <v-select
          v-model="value2"
          :items="myitems2"
          flat
          solo
          dense
          hide-selected
        ></v-select>
      </v-flex>
      <!-- 评价列表 -->
      <v-container
        fluid
        grid-list-md
      >
        <v-layout row wrap>
          <v-flex
            v-for="(item , index) in items"
            :key="index"
            v-bind="{ [`xs6`]: true}"
          >
            <v-card>
              <router-link tag="div" :item="item" :to="{name: 'DetailView', params: { id: item.es_id,dh_id:item.dh_id }}">
                <div style="border-radius:8px">
                  <v-img
                  :src="item.es_img1"
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
                      <div @click="toStar(item.es_id,index)">
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
                      <v-rating
                        :value="1"
                        length="1"
                        empty-icon="favorite_border"
                        full-icon="star"
                        readonly="readonly"
                        color="yellow"
                        background-color="grey lighten-1"
                      ></v-rating>
                      <div class="">{{item.es_score}}</div>
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
      myitems: ['全部评价', '紫薇阁', '桂花园', '玫瑰园','无辣不欢', '清淡可口', '日韩料理', '杭帮菜品'],
      myitems2: ['收藏降序','最新发表','评分降序'],
      stay: undefined,
      value1: localStorage.getItem('kind') || '全部评价',
      value2: localStorage.getItem('select') || '评分降序'
    }
  },
  computed:{
    // Getting Vuex State from store/modules/activities
    ...mapState({
      estimates: state => state.estimate.estimates
    }),
    items: function () {
      // console.log(this.$store.state.star.es_star)
      var datadata = this.$store.state.estimate.estimates
      var stardate = this.$store.state.star.es_star
      for (let i=0;i<stardate.length; i++){
        for (let j=0;j<datadata.length; j++){
          if(datadata[j].es_id === stardate[i].st_id){
            this.$store.state.estimate.estimates[j].star = 1
          }
        }
      }
      return this.$store.state.estimate.estimates
    }
  },
  watch: {
    value1(val, oldVal) {
      this.getData(val,this.value2)
      localStorage.setItem('kind',val)
    },
    value2(val, oldVal) {
      this.getData(this.value1,val)
      localStorage.setItem('select',val)
    }
  },
  mounted () {
    this.$store.dispatch('getUserStar')
    let t_kind = localStorage.getItem('kind')
    let t_select = localStorage.getItem('select')
    if(t_kind && t_select){
      this.getData(t_kind,t_select)
    }
    else{
      this.getData('全部评价','评分降序')
    }
  },
  methods:{
    toStar (id,index) {
      var info = {
        type: '',
        id: id,
        kind: '1'
      }
      if(this.$store.state.estimate.estimates[index].star === 1){
        // console.log('收藏l')
        info.type = 'removeStar'
        this.$store.dispatch(info).then(res => {
            // this.$store.dispatch('loadMore')
            // console.log(this.$store.state.estimate.events[index].es_star)
            this.$store.state.estimate.estimates[index].es_star -= 1
            // console.log(this.$store.state.estimate.events[index].es_star)
            this.$store.state.estimate.estimates[index].star = 0
        })
      }
      else if(this.$store.state.estimate.estimates[index].star === 0){
        // console.log('未收藏')
        info.type = 'addStar'
        this.$store.dispatch(info).then(res => {
            // this.$store.dispatch('loadMore')
            // console.log(this.$store.state.estimate.events[index].es_star)
            this.$store.state.estimate.estimates[index].es_star += 1
            // console.log(this.$store.state.estimate.events[index].es_star)
            this.$store.state.estimate.estimates[index].star = 1
        })

      }
    },
    getData (kindval,select) {
      let arr1 = ['all', 'dining', 'dining', 'dining','hot', 'rihan', 'sepecialty', 'daily']
      let arr2 = ['es_star','es_date','es_score']
      let index1
      this.myitems.map((val,index) => {
        if(val === kindval) index1 = index
      })
      let index2
      this.myitems2.map((val,index) => {
        if(val === select) index2 = index
      })
      this.$store.dispatch({
        type: 'getSelectEs',
        kind: arr1[index1],
        kindval: kindval,
        select: arr2[index2]
      }).then(res => {
        // this.initPhotoSwipeFromDOM('.my-gallery')
        // console.log(this.eventItemImg)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
// .v-image__image .v-image__image--cover,.v-responsive .v-image{
//   border-radius: 8px !important;
// }
.container.fluid{
  margin-top: -45px!important;

}
.v-list__tile__avatar {
  min-width: 28px !important;
}
.v-list__tile .v-list__tile--link .theme--light {
  color: #111!important;
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
