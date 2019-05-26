<template>
<!-- 菜品列表 -->
  <div class="hall-view">

      <v-flex xs12 sm6 offset-sm3 class="hallall mx-1 my-2" >
        <router-link  :to="'/dishdetail/' + item.ds_id">
          <div class="card">
            <!-- 左图 -->
            <div class="img">
              <div class="zoomImage"  :style="{backgroundImage:'url('+item.ds_img1+')'}"></div>
            </div>
            <!-- 右详情  -->
            <!-- <div class="info" :style="{background:RandomColor()}"> -->
            <div class="info">
              <div class="title">{{item.ds_name}}</div>
                <div class="dh-info">这里是{{item.ds_name}}的简介XXXXXXXXXX</div>
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

export default {
  name: 'hall-all',
  components: { ReturnBar, Loading},
  props: ['item'],
  data () {
    return {
      showLoading: true
   }
  }
}
</script>

<style lang="scss" scoped>
.hall-view{
  margin: 15px;
  max-width: 414px;
}
.card{
  display: flex;
  // margin: 0px 15px 10px 15px;
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
  height: 100px;
  width: 63%;
//   background: #704d43;
  padding: 20px 15px 0 20px;
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
