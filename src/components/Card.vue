<template>
  
    <div class="box">

      <div class="avatar mx-2">
        <v-avatar size="42">
          <img
            :src="item.us_pic"
            alt="John"
          >
        </v-avatar>
      </div>

      <div class="content">
        <div class="user-info">
          <div class="user">
              <div class="name" v-text="item.us_name"></div>
              <div class="date">{{item.es_date.substring(0, 10)}}</div>
          </div>
          <div class="star">
            <div @click="toStar(item.es_id)">
              <!-- {{item}} -->
              <v-rating
                :value="starstar"
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
            <li><div v-for="i in 3" :key="i" class="zoomImage"  :style="{backgroundImage:'url('+item.es_main_img+')'}"></div></li>
            <!-- <li><div class="zoomImage"  v-for="i in 3" :key="i" style="backgroundImage:url(http://192.168.43.224:3001/public/images/estimate_imgs/34.jpg)"></div></li> -->
          
          </ul>
        </div>
        <v-divider></v-divider>
      </div>
    </div>
</template>

<script>
export default {
  name: 'card',
  props: ['item','i','k'],// item为评论内容，i为当前评论在数组里的下标
  data () {
    return {
    }
  },
  computed: {
    starstar: function () {
      if(this.k===-1){
        return 1
      }
      else if(this.k === -2){
        return 0
      }
      else{
        let starstar = 0
        var datadata = this.item
        var stardate = this.$store.state.star.es_star
        var itemdate = datadata
        for (let i=0;i<stardate.length; i++){// 遍历用户收藏评论列表
            if(itemdate.es_id === stardate[i].st_id){//如果列表里有此条评论
              this.$store.state.hall.hallItemEs[this.i].star = 1
            }
        }
        return this.$store.state.hall.hallItemEs[this.i].star
      }
    }
  },
  methods: {
    toStar (id) {
      // console.log(this.$store.state.hall.hallItemEs[this.i])
      var info = {
        type: '',
        id: id,
        kind: '1'
      }
      if(this.k === -1){
          info.type = 'removeStar'
          this.$store.dispatch(info).then(res => {
            this.item.es_star -= 1
            this.k = -2
          })
        
      }
      else if(this.k === -2){
        info.type = 'addStar'
        this.$store.dispatch(info).then(res => {
          this.item.es_star += 1
          this.k = -1
        })
      }
      else {
        let index = this.i
        var info = {
          type: '',
          id: id,
          kind: '1'
        }
        if(this.$store.state.hall.hallItemEs[index].star === 1){
          info.type = 'removeStar'
          this.$store.dispatch(info).then(res => {
              this.$store.state.hall.hallItemEs[index].es_star -= 1
              this.$store.state.hall.hallItemEs[index].star = 0
              this.$store.state.hall.hallItemEs[this.i].star=0
          })
        } 
        else if(this.$store.state.hall.hallItemEs[index].star=== 0){
          info.type = 'addStar'
          this.$store.dispatch(info).then(res => {
              this.$store.state.hall.hallItemEs[index].es_star += 1
              this.$store.state.hall.hallItemEs[index].star = 1
              this.$store.state.hall.hallItemEs[this.i].star=1
          })
        }

      }
      // this.$store.dispatch('getUserStar')
    }
  }
}
</script>

<style lang="scss" scoped>
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
  margin: 5px 15px 20px 5px;
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
