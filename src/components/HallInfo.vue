<template>
<!-- 餐厅列表 -->
  <div class="hall-view">

      <v-flex xs12 sm6 offset-sm3 class="hallall mx-1 my-2" v-for="(item, index) in items" :key="index">
        <router-link  :to="'/hallinfo/' + item.dh_id">
          <div class="card">
            <!-- 作图 -->
            <div class="img">
              <div class="zoomImage"  :style="{backgroundImage:'url('+item.dh_main_img+')'}"></div>
            </div>
            <!-- 右详情 -->
            <div class="info_box" :style="{background:RandomColor()}">
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
      </v-flex>
  </div>
</template>

<script>
export default {
  name: 'hall-info',
  props: {
      items: Array
  },
  dara () {
      return {}
  }
}
</script>

<style lang="scss" scoped>
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

.info_box{
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
