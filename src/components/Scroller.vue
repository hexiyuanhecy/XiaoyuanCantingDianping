<template>
  <!-- <div class="scroller">
    <div class="header">
      <h2>{{title}}</h2>
      <a href="#">更多</a>
    </div>
    <div class="content">
      <slot name="promItem"></slot>
      <ul class="hasCover" v-if="type === 'hasCover'">
        <li v-for="item in myitems" :key="item.id">
          <router-link :to="'subject/' + item.id" append>
            <img v-if="item.images" :src="item.images.large" alt="">
            <span class="title">{{item.title}}</span>
            <rating v-if="item.rating" :rating="item.rating"></rating>
          </router-link>
        </li>
      </ul>
      <ul class="onlyString" v-if="type === 'onlyString'">
        <li v-for="item in myitems" style="border-color: #FFAC2D;" :key="item.id">
          <a :href="item.href" v-if="!item.line" :style="{color: item.color}">{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div> -->
  <div class="scroller">
    <div class="header">
      <h2>{{title}}</h2>
      <a href="#">更多<i class="icon">></i></a>
    </div>
    <div class="content">
      <slot name="promItem"></slot>
      <ul class="hasCover">
        <li v-for="item in myitems" :key="item.id">
          <router-link :to="'subject/' + item.id" append>
            <img v-if="item.images" :src="item.images" alt="">
            <span class="title">{{item.title}}</span>
            <rating v-if="item.rating" :rating="item.rating"></rating>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Rating from './Rating'

export default {
  name: 'scroller',
  components: { Rating },
  data () {
    return {
      title: '热门餐厅',
      myitems: [{
        images: '/api/images/kaorou.jpg',
        title: '韩式烤肉拌饭',
        rating: {
          'max': 10,
          'average': 5.1,
          'stars': '25',
          'min': 0
        }
      },
      {
        images: '/api/images/kaorou.jpg',
        title: '韩式烤肉拌饭',
        rating: {
          'max': 10,
          'average': 5.1,
          'stars': '25',
          'min': 0
        }
      },
      {
        images: '/api/images/kaorou.jpg',
        title: '韩式烤肉拌饭',
        rating: {
          'max': 10,
          'average': 5.1,
          'stars': '25',
          'min': 0
        }
      },
      {
        images: '/api/images/kaorou.jpg',
        title: '韩式烤肉拌饭',
        rating: {
          'max': 10,
          'average': 5.1,
          'stars': '25',
          'min': 0
        }
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.scroller {
  padding-top: 1rem;
}

.header {
  height: 2.6rem;
  line-height: 2.6rem;
  padding: 0 1.6rem;

  a {
    float: right;
    font-size: 1.44rem;
    &:last-child {
      color: #42bd56;
    }
  }

  h2 {
    display: inline-block;
  }
}

.content {
  box-sizing: content-box;

  ul {
    padding: 1rem 0;
    border-bottom: 1px solid rgb(236, 236, 236);
  }
}

.hasCover {
  overflow-x: auto;
  white-space: nowrap;
  text-align: center;

  .title {
    display: block;
    max-width: 100%;
    margin-top: 1rem;
    line-height: 1.6rem;
    font-size: 1.6rem;
    color: #111;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }

  li {
    display: inline-block;
    width: 60%;
    margin-left: 0.6rem;
    margin-right: 0.6rem;
    img{
      width: 100%;
      height: 80%;
    }
    &:first-child {
      padding-left: 0.5rem;
    }
  }


  img {
    height: 15rem;
  }
}

.onlyString {
  overflow-x: auto;
  white-space: nowrap;

  li {
    display: inline-block;
    margin: 0 0 0.8rem 1.6rem;
    font-size: 1.6rem;
    border: solid 0.1rem;
    border-radius: 0.4rem;
    vertical-align: middle;
  }

  a {
    height: 5rem;
    line-height: 5rem;
    padding: 0 2.4rem;
    letter-spacing: 0.16rem;
    overflow: auto;
    display: block;
    text-align: center;
  }

  li:empty {
    width: 100%;
    display: block;
    height: 0.1rem;
    border: 0;
    margin: 0;
  }
}
</style>
