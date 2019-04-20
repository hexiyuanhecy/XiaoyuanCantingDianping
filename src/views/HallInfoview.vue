<template>
  <div class="subject-view has-header">
    <return-bar title="店铺详情"></return-bar>
    <template >
      <v-btn 
        color="primary" 
        fab 
        small 
        dark
        fixed
        bottom
        right
        :to="{ name: 'Estimate'}"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <div class="subject-Gongluelist">
        <div class="subject-pics">
          <ul>
            <li class="pic-one">
              <a href="#">
                <div class="zoomImage"  :style="{backgroundImage:'url('+hall_info.dh_main_img+')'}"></div>
              </a>
            </li>
            <li class="pic-one">
              <a href="#">
                <div class="zoomImage"  :style="{backgroundImage:'url('+hall_info.dh_main_img+')'}"></div>
              </a>
            </li>
            <li class="pic-one">
              <a href="#">
                <div class="zoomImage"  :style="{backgroundImage:'url('+hall_info.dh_main_img+')'}"></div>
              </a>
            </li>
            <li class="pic-one">
              <a href="#">
                <div class="zoomImage"  :style="{backgroundImage:'url('+hall_info.dh_main_img+')'}"></div>
              </a>
            </li>
          </ul>
        </div>
        <div class="subject-intro">
          <h3 class="title">{{hall_info.dh_name}}</h3>
            <v-rating 
              v-model="hall_info.dh_score" 
              small half-increments 
              color="grey darken-3"
            ></v-rating>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;{{hall_info.dh_info+hall_info.dh_info+hall_info.dh_info+hall_info.dh_info+hall_info.dh_info}}
          </p>
        </div>
        <div class="subject-pics">
          <h4>{{hall_info.dh_name}}推荐菜品</h4>
          <ul>
            <li class="pic">
              <a href="#">
                <div class="zoomImage"  :style="{backgroundImage:'url('+hall_info.dh_main_img+')'}"></div>
              </a>
            </li>
            <li class="pic">
              <a href="#">
                <div class="zoomImage"  :style="{backgroundImage:'url('+hall_info.dh_main_img+')'}"></div>
              </a>
            </li>
            <li class="pic">
              <a href="#">
                <div class="zoomImage"  :style="{backgroundImage:'url('+hall_info.dh_main_img+')'}"></div>
              </a>
            </li>
            <li class="pic">
              <a href="#">
                <div class="zoomImage"  :style="{backgroundImage:'url('+hall_info.dh_main_img+')'}"></div>
              </a>
            </li>
            <li class="pic">
              <a href="#">
                <div class="zoomImage"  :style="{backgroundImage:'url('+hall_info.dh_main_img+')'}"></div>
              </a>
            </li>
          </ul>
        </div>
      </div>


      <div class="subject-comments">
        <h2>{{subject.title}}的评论</h2>
        <div class="content-list">
          <esjianjie mold="comment" v-for="item in items" :key="item"></esjianjie>
          <a class="list-link" href="javascript:;">显示更多评论<i class="icon">&#xe87e;</i></a>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Esjianjie from '../components/Card'
import ReturnBar from '../components/ReturnBar'
import Marking from '../components/Marking'
import List from '../components/List'
import Scroller from '../components/Scroller'
import DetailTab from '../components/DetailTab'
import Loading from '../components/Loading'

export default {
  name: 'Gonglueview',
  components: {
    ReturnBar,
    Marking,
    List,
    Esjianjie,
    Scroller,
    DetailTab,
    Loading
  },
  data () {
    return {
      title2: '店铺详情',
      showLoading: true,
      isExpand: true,
      items: new Array(5),
      subject: {
        title: '韩式烤肉拌饭',
        images: '/api/images/dh_main_imgs/11.jpg',
        rating: 2.5,
        ratings_count: 103,
        summary: '韩式烤肉拌饭，以韩式烤肉的手法精制烤肉，再结合传统盖浇饭特点，独创韩式烤肉拌饭，菜式多样，价优味美，是深受广大年轻人爱好的新型快餐。'
      }
    }
  },
  computed: {
    // Getting Vuex State from store/modules/subject
    ...mapState({
      hall_info: state => state.hall.hall_info
    })
  },
  methods: {
    // Toggle summary
    expand: function (event) {
      this.isExpand = false
    }
  },
  created () {
    // Getting route params
    const id = this.$route.params.id
    // console.log('这是屏幕的第几个==传递给activity.js的参数' + id)

    // Dispatching getSingleHall
    this.$store.dispatch({
      type: 'getSingleHall',
      id: id
    }).then(res => {
      // Success handle
      this.showLoading = false
      // console.log(res)
    })
  },
  mounted () {
    console.log('///////')
    console.log(this.hall_info)
  }
}
</script>

<style lang="scss" scoped>

.zoomImage{
  width:100%;
  height:0;
  padding-bottom: 80%;
  border-radius: 5px;
  overflow:hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  background-size:cover;
}
.right {
  float: right;

  img {
    display: block;
    width: 100%;
    max-width: 10rem;
  }
}

.subject-intro, .genres, .subject-pics, .subject-comments{
  margin-bottom: 3rem;
}

h2 {
  margin: 0 0 1.5rem;
  font-size: 0.8em;
  color: #aaa;
}
h4{
  margin-left: 15px;
}
.subject-intro {
  padding: 0 1.5rem;
  p {
    font-size: 0.8rem;
    color: #494949;
  }

  a {
    color: #42bd56;
  }
}

.subject-pics {
  ul {
    margin-right: -1.8rem;
    overflow-x: auto;
    white-space: nowrap;
  }

  .pic-one{
    height: 21rem;
    width: 95%;
    overflow: hidden;
    display: inline-block;
    &:first-child{
      margin-left: -1rem;
    }
    &:last-child{
      margin-right: 2.5rem;/* 最后一张图 */
    }
  }
   .pic{ /* 推荐菜品 */
    height: 7rem;
    width: 30%;
    overflow: hidden;
    display: inline-block;
    &:first-child{
      margin-left: -1rem;
    }
    &:last-child{
      margin-right: 2.5rem;/* 最后一张图 */
    }
    img{
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }

  li {
    height: 12rem;
    overflow: hidden;
    display: inline-block;
  }

  img {
    width: 18rem;
  }
}

.subject-comments h2{
  padding: 0 1.8rem;
}

.subject-comments{
  .list-link {
    display: block;
    font-size: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #777;
  }
}

.subject-view{
  margin-bottom: 5rem;
}
</style>
