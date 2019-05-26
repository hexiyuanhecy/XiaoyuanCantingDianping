<template>
<!-- 餐厅列表 -->
  <div class="hall-view">
    <return-bar :title="titletitle"></return-bar>
    <div class="select">
      <v-btn depressed :disabled='a' small block outline @click="getDiningHall('dh_star',1)">收藏降序</v-btn>
      <v-btn depressed :disabled='b' small block outline @click="getDiningHall('dh_score',1)">评分降序</v-btn>
    </div>
      <v-flex xs12 sm6 offset-sm3 class="hallall mx-1 my-2" v-for="(item, index) in items" :key="index">
        <router-link  :to="'/hallinfo/' + item.dh_id">
          <div class="card">
            <!-- 作图 -->
            <div class="img">
              <div class="zoomImage"  :style="{backgroundImage:'url('+item.dh_main_img+')'}"></div>
            </div>
            <!-- 右详情  -->
            <div class="info" :style="{background:RandomColor()}">
              <div class="title">{{item.dh_name}}</div>
                <div class="dh-info">{{item.dh_info}}</div>
                  <div class="pingfen">
                    <v-rating 
                      v-model="item.dh_score" 
                      small 
                      dense
                      half-increments 
                      size="1"
                      color="white darken-3">
                    </v-rating>
                    <span class="score">{{item.dh_score}}</span>
                  </div>
                    <span class="score white--text">收藏人数：{{item.dh_star}}</span>
            </div>
          </div>
        </router-link>
      </v-flex>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReturnBar from '../components/ReturnBar'
import Loading from '../components/Loading'
import HallInfo from '../components/HallInfo'

export default {
  name: 'hall-all',
  components: { ReturnBar, Loading, HallInfo },
  props: ['ddd'],
  data () {
    return {
      showLoading: true,
      items: undefined,
      id: this.$route.params.id,
      titletitle: undefined,
      title: ['全部餐厅','桂花园', '玫瑰园', '紫薇阁', '面食主义', '营养早餐', '无肉不欢'],
      title2: ['全部餐厅','桂花园', '玫瑰园', '紫薇阁', 'noodles', 'breakfast', 'meat'],
      b: false,
      a: true
   }
  },
  computed: {
    // ...mapState({
    //   guihuayuan: state => state.hall.guihuayuan,
    //   breakfast: state => state.hall.breakfast,
    //   noodles: state => state.hall.noodles,
    //   meat: state => state.hall.meat,
    //   all: state => state.hall.all
    // })
  },
  methods: {
    RandomColor () {
      let r, g, b
      r = Math.floor(Math.random() * 151 + 50)
      g = Math.floor(Math.random() * 151 + 80)
      b = Math.floor(Math.random() * 151 + 50)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    getDiningHall: function (select,num) {
      this.$store.dispatch({ 
        type: 'getHall_kind',
        dining:this.title2[this.id],
        select: select})
        .then(res =>{
          let id = this.id
          this.items = res
          this.titletitle = this.title[id]
          if(num === 1){
            this.a = !this.a
            this.b = !this.b
          }
        })
    }
  },
  mounted () {
    this.getDiningHall('dh_star')
  },
  updated () {
  }
}
</script>

<style lang="scss" scoped>
.select{
  display: flex;
  justify-content: space-between;
}
.hall-view{
  margin-top: 15px;
  max-width: 414px;
}
.card{
  display: flex;
  // margin: 0px 15px 10px 15px;
  justify-content: center;
  .img{
    width: 112px;
    .zoomImage{
      width:100%;
      height:0;
      padding-bottom: 100%;
      border-radius: 10px 0 0 10px;
      overflow:hidden;
      background-position: center center;
      background-repeat: no-repeat;
      -webkit-background-size:cover;
      -moz-background-size:cover;
      background-size:cover;
    }
  }
}

.info{
  height: 112px;
  width: 63%;
  background: #704d43;
  padding: 20px 15px 0 20px;
  border-radius: 0 10px 10px 0;
  .title{
    color: white;
    font-size: 16px !important;
    margin-bottom: 5px;
  }
  .dh-info{
    color: #dcdbdb;
    width: 190px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.pingfen{
  display: flex;
  .score{
    color: #dcdbdb;
    margin-left: 15px;
  }
}
</style>
