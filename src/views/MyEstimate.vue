<template>
    <div class="content-list">
    <return-bar title="我的评价"></return-bar>
      <div class="content">
        <div v-if="!items" class="none">您未发表任何评论...</div>
        <div v-else v-for="(item,index) in items" :key="index"  >
          <div class="box">
            <div class="avatar mx-2">
            </div>

            <div class="content">
              <div class="user-info">
                    <div class="date">{{item.es_date.substring(0, 10)}}</div>
                
                <div class="star">
                  <div @click="toStar(item.es_id)">
                    <!-- {{item}} -->
                    <v-rating
                      :value="0"
                      length="1"
                      empty-icon="favorite_border"
                      full-icon="favorite"
                      readonly="readonly"
                      color="red"
                      background-color="grey lighten-1"
                    ></v-rating>
                  </div>
                  <div class="">{{item.es_star}}</div>
                </div>
              </div>
              <router-link tag="div" :to="{ name: 'DetailDetail', params: { id: item.es_id}}">
                <div class="detail">
                  {{item.es_content}}昨天吃的糖醋里脊太好吃啦！鲜嫩可口，酸甜合适。商家拼盘也特别好看，颜值特别高！用的餐具也超级精美···
                </div>
              </router-link>
              <div class="detail-img">
                <ul>
                  <li><div v-for="i in selectimg(item)" :key="i" class="zoomImage"  :style="{backgroundImage:'url('+i+')'}"></div></li>
                  <!-- <li><div class="zoomImage"  v-for="i in 3" :key="i" style="backgroundImage:url(http://192.168.43.224:3001/public/images/estimate_imgs/34.jpg)"></div></li> -->
                
                </ul>
              </div>
              <v-divider></v-divider>
            </div>
          </div>
        </div>
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
      items: state => state.estimate.user_es
    }),
    images: function () {
      let values = []
      let data = this.$store.state.estimate.user_es
      Object.keys(data).forEach(function(key){
        // console.log(typeof data[key])
        // console.log(data[key])
          if(key.match(/img/)&&data[key]){
            values.push(data[key])
        }
      });
      return values
    }
  },
  mounted () {
      this.$store.dispatch('gerUserEstimate')
  },
  methods: {
    selectimg: function (data) {
      let values = []
      // let data = this.$store.state.estimate.user_es
      Object.keys(data).forEach(function(key){
        // console.log(typeof data[key])
        // console.log(data[key])
          if(key.match(/img/)&&data[key]){
            values.push(data[key])
        }
      });
      return values
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
</style>
