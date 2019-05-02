<template>
<!-- 餐厅列表 -->
  <div class="hall-view has-header">
    <return-bar :title="productno"></return-bar>
    <div class="hallall" v-for="(item, index) in items" :key="index">
      <router-link  :to="'/hallinfo/' + item.dh_id">
        <div class="card">
          <!-- 作图 -->
          <div class="img">
            <div class="zoomImage"  :style="{backgroundImage:'url('+item.dh_main_img+')'}"></div>
          </div>
          <!-- 右详情 -->
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
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReturnBar from '../components/ReturnBar'
import Loading from '../components/Loading'

export default {
  name: 'hall-all',
  components: { ReturnBar, Loading },
  props: ['items'],
  data () {
    return {
      showLoading: true,
      // items: undefined,
      productno: this.$route.params.id
    }
  },
  filters: {
  },
  computed: {
    // Getting Vuex State from store/modules/hall
    // ...mapState({
    //   guihuayuan: state => state.hall.guihuayuan,
    //   breakfast: state => state.hall.breakfast,
    //   noodles: state => state.hall.noodles,
    //   meat: state => state.hall.meat,
    //   all: state => state.hall.all
    // })
  },
  created () {
  },
  methods: {
    RandomColor () {
      let r, g, b
      r = Math.floor(Math.random() * 151 + 50)
      g = Math.floor(Math.random() * 151 + 80)
      b = Math.floor(Math.random() * 151 + 50)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
  },
  mounted () {
    // switch (this.productno) {
    //   case '桂花园':
    //     this.items = this.guihuayuan; console.log(this.items)
    //     break
    //   case '面食主义':
    //     this.items = this.noodles
    //     break
    //   case '营养早餐':
    //     this.items = this.breakfast
    //     break
    //   case '无肉不欢':
    //     this.items = this.meat
    //     break
    //   case '全部餐厅':
    //     this.items = this.all
    // }
  }
}
</script>

<style lang="scss" scoped>
.hall-view{
  margin-top: 15px;
}
.card{
  // height: 133px;
  width: 100%;
  display: flex;
  margin: 0px 15px 10px 15px;
  justify-content: flex-start;
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
