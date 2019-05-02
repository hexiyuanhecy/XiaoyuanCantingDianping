<template>
<!-- 评论详情 -->
  <div class="detail-view has-header">
    <return-bar :title="title"></return-bar>
    <v-flex xs12>
        <v-layout>
            <div class="center avatar">
              <v-avatar size="50">
                <img src="http://192.168.43.224:8081/api/images/estimate/1.jpg" alt="Skyscraper">
              </v-avatar>
            <div class="center name">一只懒学姐</div>
            </div>
            <div class="right">
              <v-icon>favorite</v-icon>
              100
            </div>
        </v-layout>
      <v-divider></v-divider>
    </v-flex>
    <!-- 图片 -->
    <div class="poster">
      <img v-for="(item, index) in items" :key="index" src="http://192.168.43.224:8081/api/images/estimate/2.jpg" alt="">
    </div>
    <!-- 内容 -->
    <div class="content">
      <div>
        这些新菜品的出现，正是源于学校膳食科三月份开展的创新菜与创新月活动。在桂花园一楼、三楼，玫瑰园一楼这三个保障性食堂当中，每个食堂每周都会出十个左右的新菜品，供大家品尝。
      </div>
      <br>
      <div>
        创新菜中散发着家乡的味道。譬如桂花园一楼的花椒扣肉，这道属于淮扬菜系的菜，被厨师们搬上了浙理的餐桌，带来了满满的乡情。膳食服务科的职员们也将“为家人烧菜”作为他们的工作理念，研究着各地不同风味的饭菜。
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReturnBar from '../components/ReturnBar'
import Loading from '../components/Loading'

export default {
  name: 'gonglue-detail',
  components: { ReturnBar, Loading },
  data () {
    return {
      showLoading: true,
      title: '学姐带你吃喝玩乐',
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
