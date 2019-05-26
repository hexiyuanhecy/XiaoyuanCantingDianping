<template>
<!-- 菜品列表 -->
  <div class="hall-view">
    <return-bar :title="titletitle"></return-bar>
    <div class="select">
      <v-btn depressed :disabled='a' small block outline @click="getDish('ds_star',1)">收藏降序</v-btn>
      <v-btn depressed :disabled='b' small block outline @click="getDish('ds_score',1)">评分降序</v-btn>
    </div>
      <v-flex xs12 sm6 offset-sm3 class="hallall mx-1 my-2" v-for="(item, index) in items" :key="index">
        <router-link :to="'/dishdetail/' + item.ds_id">
          <div class="card">
            <!-- 左图 -->
            <div class="img">
              <div class="zoomImage"  :style="{backgroundImage:'url('+item.ds_img1+')'}"></div>
            </div>
            <!-- 右详情  -->
            <!-- <div class="info" :style="{background:RandomColor()}"> -->
            <div class="info">
              <div class="title">{{item.ds_name}}</div>
                <div class="dh-info">这里显示的是{{item.ds_name}}的简介</div>
                  <div class="pingfen">
                    <v-rating 
                      v-model="item.ds_score" 
                      small 
                      dense
                      half-increments 
                      size="1"
                      color="yellow darken-3">
                    </v-rating>
                    <span class="score">{{item.ds_score}}</span>
                  </div>
                  <span class="score black--text">收藏人数：{{item.ds_star}}</span>
            </div>
          </div>
          <v-divider></v-divider>
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
      titletitle: undefined,
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
    getDish: function (select,num) {
      const id = this.$route.params.id// 餐厅id
      this.$store.dispatch({ // 获取菜品信息
        type: 'getDish',
        id: id,
        select: select
      }).then(res => {
        this.items = res
        if(num === 1){
          this.a = !this.a
          this.b = !this.b
        }
      })
      this.$store.dispatch({ // 获取餐厅信息
        type: 'getSingleHall',
        id: id
      }).then(res => {
        this.titletitle = res.dh_name + '的菜品'
      })
    }
  },
  mounted () {
    this.getDish('ds_star')
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
  margin: 15px;
  max-width: 414px;
}
.card{
  display: flex;
  margin: 15px 0px 5px 0px;
  justify-content: center;
  .img{
    // width: 112px;
    width: 150px;
    .zoomImage{
      width:100%;
      height:0;
      padding-bottom: 65%;
      border-radius: 10px;
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
  height: 90px;
  width: 63%;
//   background: #704d43;
  padding: 0px 15px 0 20px;
  border-radius: 0 10px 10px 0;
  .title{
    color: black;
    font-size: 16px !important;
    margin-bottom: 5px;
  }
  .dh-info{
    color: #000;
    width: 190px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.pingfen{
  display: flex;
  .score{
    color: #000;
    margin-left: 15px;
  }
}
</style>
