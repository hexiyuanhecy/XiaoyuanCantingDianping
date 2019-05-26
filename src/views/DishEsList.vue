<template>
<!-- 餐厅列表 -->
  <div class="hall-view">
    <return-bar :title="titletitle"></return-bar>
    <div class="select">
      <v-btn depressed :disabled='a' small block outline @click="getDishItemEs('es_star',1)">收藏降序</v-btn>
      <v-btn depressed :disabled='b' small block outline @click="getDishItemEs('es_score',1)">评分降序</v-btn>
    </div>
      <v-flex xs12 sm6 offset-sm3 class="hallall mx-1 my-2" v-for="(item, index) in items" :key="index">
        <router-link tag="div" :to="'/dishEsList/' + item.dh_id">
          <esjianjie v-for="(value,index) in items" :key="index" :item="value" :i='index' :k='-4'></esjianjie>
        </router-link>
      </v-flex>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReturnBar from '../components/ReturnBar'
import Loading from '../components/Loading'
import HallInfo from '../components/HallInfo'
import Esjianjie from '../components/Card'

export default {
  name: 'hall-all',
  components: { ReturnBar, Loading, HallInfo,Esjianjie },
  props: ['ddd'],
  data () {
    return {
      showLoading: true,
      items: undefined,
      id: this.$route.params.id,
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
    getDishItemEs: function (select,num) {
      const id = this.$route.params.id
      this.$store.dispatch({//获取菜品信息
        type: 'getDishItem',
        id: id
      }).then(res => {
          this.titletitle = res.ds_name+'的评论列表'
      })
      this.$store.dispatch({ 
        type: 'getDishItemEs',
        id: this.$route.params.id,
        select: select
      }).then(res =>{
        console.log(res)
          this.items = res
          if(num === 1){
            this.a = !this.a
            this.b = !this.b
          }
        })
    }
  },
  mounted () {
    this.getDishItemEs()
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
