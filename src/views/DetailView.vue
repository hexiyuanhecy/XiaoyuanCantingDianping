<template>
<!-- 评论详情 -->
  <div class="detail-view has-header">
    <return-bar title="评论详情"></return-bar>
      <!-- 图片 -->
      <div class="poster">
        <img v-for="(item, index) in items" :key="index" :src="eventItem.es_main_img" alt="">
      </div>

      <!--用户及评论  -->
      <div class="info">
        <div class="describe">
          <!-- 用户名 -->
          <div class="user-info">
            <v-avatar color="grey darken-3" >
              <img :src="eventItem.us_pic" alt="">
            </v-avatar>
            <div class="name-info">
              <h6 class="name">一只小西瓜</h6>
              <p class="date">{{formatData(eventItem.es_date)}}</p>
            </div>
          </div>
          <!-- 评论内容 -->
          <div class="content">
            <div v-if="eventItem.es_content" class="content">{{doubleContent(eventItem.es_content)}}</div>
            <div v-if="eventItem.es_content" class="content">{{doubleContent(eventItem.es_content)}}</div>
          </div>
        </div>
         <!-- 餐厅简介 -->
         <br>
         <v-flex xs12>
            <v-card color="white darken-2" class="black--text">
              <v-layout>
                <v-flex xs4>
                  <v-img
                    src="api/images/estimate/16.jpg"
                    height="100px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div  :to="'hallinfo/' + 1">
                      <div class="headline">韩式烤肉拌饭</div>
                      <div>桂花园2楼</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider dark></v-divider>
              <v-card-actions class="pa-0">
                评分
                <v-spacer></v-spacer>
                <v-rating readonly half-increments value="3.5"></v-rating>
              </v-card-actions>
            </v-card>
          </v-flex>

      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReturnBar from '../components/ReturnBar'
import Loading from '../components/Loading'

export default {
  name: 'detail-view',
  components: { ReturnBar, Loading },
  data () {
    return {
      showLoading: true,
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  },
  filters: {
    toArray (value) {
      return value.split(',')
    }
  },
  computed: {
    content: function () {
      // Careful XSS
      // Remove copyright imgs
      return this.eventItem.content.replace(/<img.+?>/ig, '')
    },
    // Getting Vuex State from store/modules/activities
    ...mapState({
      eventItem: state => state.activities.eventItem
    })
  },
  created () {
    // Getting route params
    const id = this.$route.params.id
    // console.log('这是屏幕的第几个==传递给activity.js的参数' + id)

    // Dispatching getSingleEvent
    this.$store.dispatch({
      type: 'getSingleEvent',
      id: id
    }).then(res => {
      // Success handle
      this.showLoading = false
      console.log('接受到的res')
      console.log(res)
    })
  },
  methods: {
    formatData (time) {
      // time = time.toString()
      return time.substring(0, 10)
    },
    doubleContent (str) {
      str = str + '美味佳肴、口齿留香、珍馐佳肴、秀色可餐、饕餮大餐、回味无穷、色味俱佳、垂涎欲滴、其味无穷'
      return str
    }
  },
  mounted () {
    console.log('接受到的eventItem')
    console.log(this.eventItem)
  }
}
</script>

<style lang="scss" scoped>
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
.v-avatar img{
  border: 1px solid rgb(250, 248, 248);
}
.info{
  margin: 1rem;
}
.user-info{
  margin-left: 15px;
  display: flex;
  justify-content: flex-start;
}
.name-info{
  margin-left: 1rem;
  .date{
    font-size: 12px;
    color: #555
  }
}
.content{
  margin-right:4px;
  margin-left: 4px;
}
.v-carousel__controls{
  background: none !important;
}
</style>
