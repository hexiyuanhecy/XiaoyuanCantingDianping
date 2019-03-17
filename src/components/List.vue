<template>
  <div class="list">
    <template v-for="(item , index) in items">
      <router-link
        class="thumbnail"
        :to="{name: 'DetailView', params: { id: index }}"
        :key="index">
        <div class="content">
          <img :src="item.image_hlarge" alt="cover">
          <h3>{{item.title}}</h3>
          <p>{{item.content | subStr}}</p>
          <!-- <div class="author"> -->
            <div class="icons">
              <span class="btn like"></span>
              <span class="btn comment"><i>0</i></span>
              <span class="btn retweet"><i>1</i></span>
              <span class="btn more"></span>
            </div>
          <!-- </div> -->
        </div>
      </router-link>
    </template>
    <template v-if="mold === 'basic'">
      <ul class="basic">
        <li v-for="(item , index) in items" :key="index">
          <a href="#">
            <h3>{{item.title}}</h3>
            <div class="info">{{item.comments}}</div>
          </a>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    mold: {
      type: String,
      default: 'basic'
    },
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },
  filters: {
    subStr: function (value) {
      let newVal = value.replace(/<.*?>/g, '')
      return newVal.slice(0, 30)
    }
  }
}
</script>

<style lang='scss' scoped>
.list {
  .thumbnail {
    position: relative;
    display: block;
    padding: 2.5rem 1.8rem 2.5rem 0;
    margin-left: 1.8rem;

    .content {
      overflow: hidden;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.6rem;
      line-height: 1.41;
      text-align: justify;
      font-size: 1.7rem;
      font-weight: 500;
      color: #494949;
    }

    p {
      line-height: 1.5;
      text-align: justify;
      color: #aaa;
      font-size: 1.2rem;
      overflow: hidden;
    }

    img {
      float: right;
      width: 40%;
      height: 12rem;
      margin-left: 2.5rem;
    }

    .author {
      font-size: 1.2rem;
      color: #ccc;
      .like{
        background: url(https://img3.doubanio.com/f/talion/7a0756b3b6e67b59ea88653bc0cfa14f61ff219d/pics/card/ic_like_gray.svg);
      }

      .comment::before {
        background: url(https://img3.doubanio.com/f/talion/ac8a7e0d5f471480549c7abf45fc0fa4c3b4184f/pics/card/ic_comment.svg);
      }

      .retweet::before {
        background: url(https://img3.doubanio.com/f/talion/8604ef3950b947d55406e2a6f5cf6ca7f0b934e3/pics/card/ic_retweet_gray.svg);
      }

      .more::before {
        background: url(https://img3.doubanio.com/f/talion/be268c0a1adb577c8dfdcfbe48c818af3983ed62/pics/card/more.svg);
        background-repeat: no-repeat;
        background-position: center center;
        margin-bottom: -0.2rem;
      }
    }

    .label {
      position: absolute;
      bottom: 2.5rem;
      right: 1.8rem;
    }
  }

  .thumbnail ~ .thumbnail::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0.1rem;
    content: '';
    background: #e3e3e3;
  }

  .basic {
    h3 {
      padding: 0;
      line-height: 1.41;
      font-size: 1.7rem;
      font-weight: 500;
      color: #494949;
    }

    .more {
      float: right;
      margin-right: 0;
    }

    i {
      font-style: normal;
      color: #ccc;
      margin-left: 0.3rem;
      margin-top: -0.3rem;
    }
  }
}

</style>
