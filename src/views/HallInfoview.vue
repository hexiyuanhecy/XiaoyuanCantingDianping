<template>
  <div class="subject-view has-header">
    <return-bar :title="title2"></return-bar>
    <template >
      <div class="subject-Gongluelist">
        <div class="subject-pics">
          <ul>
            <li class="pic-one">
              <a href="#">
                <img src="/api/images/1.jpg" alt="poster">
              </a>
            </li>
            <li class="pic-one">
              <a href="#">
                <img src="/api/images/1.jpg" alt="poster">
              </a>
            </li>
            <li class="pic-one">
              <a href="#">
                <img src="/api/images/1.jpg" alt="poster">
              </a>
            </li>
            <li class="pic-one">
              <a href="#">
                <img src="/api/images/1.jpg" alt="poster">
              </a>
            </li>
          </ul>
        </div>
        <div class="subject-intro">
          <h3 class="title">{{subject.title}}</h3>
            <v-rating 
              v-model="subject.rating" 
              small half-increments 
              color="grey darken-3"
            ></v-rating>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;{{subject.summary}}
          </p>
        </div>
        <div class="subject-pics">
          <h4>{{subject.title}}推荐菜品</h4>
          <ul>
            <li class="pic">
              <a href="#">
                <img :src="subject.images" alt="poster">
              </a>
            </li>
            <li class="pic">
              <a href="#">
                <img :src="subject.images" alt="poster">
              </a>
            </li>
            <li class="pic">
              <a href="#">
                <img :src="subject.images" alt="poster">
              </a>
            </li>
            <li class="pic">
              <a href="#">
                <img :src="subject.images" alt="poster">
              </a>
            </li>
            <li class="pic">
              <a href="#">
                <img :src="subject.images" alt="poster">
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
    <detail-tab></detail-tab>
  </div>
</template>

<script>
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
        images: '/api/images/1.jpg',
        rating: 2.5,
        ratings_count: 103,
        summary: '韩式烤肉拌饭，以韩式烤肉的手法精制烤肉，再结合传统盖浇饭特点，独创韩式烤肉拌饭，菜式多样，价优味美，是深受广大年轻人爱好的新型快餐。'
      }
    }
  }
 /* computed: {
    // Getting Vuex State from store/modules/subject
    ...mapState({
      // subject: state => state.subject.subject,
      adImgUrl: state => state.subject.adImgUrl,
      questions: state => state.subject.questions,
      movieTags: state => state.movie.movieTags
    }),
    // Getting Filtered Vuex State
    ...mapGetters({
      subjectMeta: 'subjectMeta',
      summary: 'summary',
      genres: 'genres'
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
    const classify = this.$route.params.classify

    // Dispatching getSingleSubject
    this.$store.dispatch({
      type: 'getSingleSubject',
      id: id,
      classify: classify
    }).then(res => {
      // Success handle
      this.showLoading = false
    })
  } */
}
</script>

<style lang="scss" scoped>

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
    height: 18rem;
    width: 95%;
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
   .pic{ /* 推荐菜品 */
    height: 6rem;
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
    padding: 1.5rem 0;
    font-size: 1.6rem;
    line-height: 1.8rem;
    text-align: center;
    color: #42bd56;
  }
}

.subject-view{
  margin-bottom: 5rem;
}
</style>
