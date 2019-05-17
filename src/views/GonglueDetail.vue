<template>
<!-- 攻略详情 -->
  <div class="detail-view has-header">
    <return-bar :title="items.gl_name"></return-bar>
    <v-flex xs12>
        <v-layout>
          <!-- {{items}} -->
            <div class="center avatar">
              <v-avatar size="50">
                <img :src="items.us_pic" alt="Skyscraper">
              </v-avatar>
            <div class="center name_data">
              <div>{{items.us_name}}</div>
              <div class="date">{{items.gl_date.substring(0, 10)}}</div>
            </div>
            </div>
            <div class="right">
              <div @click="toStar(item.gl_id,id)">
                <v-rating
                  :value="item.star"
                  length="1"
                  empty-icon="favorite_border"
                  full-icon="favorite"
                  readonly="readonly"
                  color="red"
                  background-color="grey lighten-1"
                ></v-rating>
              </div>
              {{items.gl_star}}
            </div>
        </v-layout>
      <v-divider></v-divider>
    </v-flex>
    <!-- 内容 -->
    <div class="content" v-html="items.gl_content">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReturnBar from '../components/ReturnBar'

export default {
  name: 'gonglue-detail',
  components: { ReturnBar },
  data () {
    return {
      id:this.$route.params.id
    }
  },
  computed: {
    ...mapState({
      items: state => state.gonglue.gonglueItem
    }),
    item: function () {
      let id = this.$route.params.id
      // console.log(this.$store.state.star.es_star)
      var datadata = this.$store.state.gonglue.gonglueItem
      var stardate = this.$store.state.star.gl_star
        var itemdate = datadata
        for (let i=0;i<stardate.length; i++){
            if(itemdate.gl_id === stardate[i].st_id){
              this.$store.state.gonglue.gonglueItem.star = 1
            }
        }
      return this.$store.state.gonglue.gonglueItem
    }
  },
  created () {
      this.$store.dispatch('getGonglueItem',{id:this.$route.params.id})
  },
  methods: {
    toStar (id,index) {
      var info = {
        type: '',
        id: id,
        kind: '3'
      }
      console.log(this.$store.state.gonglue.gonglueItem)
      if(this.$store.state.gonglue.gonglueItem.star === 1){
        info.type = 'removeStar'
        this.$store.dispatch(info).then(res => {
            this.$store.state.gonglue.gonglueItem.gl_star -= 1
            this.$store.state.gonglue.gonglueItem.star = 0
        })
      } 
      else if(this.$store.state.gonglue.gonglueItem.star=== 0){
        info.type = 'addStar'
        this.$store.dispatch(info).then(res => {
            this.$store.state.gonglue.gonglueItem.gl_star += 1
            this.$store.state.gonglue.gonglueItem.star = 1
        })
      }
      // this.$store.dispatch('getUserStar')
    }
  }
}
</script>

<style lang="scss" scoped>
.center{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  margin-left: 15px;
}
.right{
  height: 65px;
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 15px;
}
.name_data{
  flex-direction: column;
  align-items: flex-start;
  .date{
    color: #777;
    font-size: 12px;
  }
}
.poster {
  text-align: center;
  overflow-x: auto;
  white-space: nowrap;
  text-align: center;
  img {
    width: 100%;
    height: auto;
  }
}

.content{
  margin: 10px 15px;
}
</style>
