<template>
  <div class="list">
    <template v-for="item in items">
      <router-link
        class="thumbnail"
        :to="{name: 'DetailView', params: { id: item.id }}" :key="item.id">
        <div class="content">
          <img :src="item.image" alt="cover">
          <h3>{{item.title}}</h3>
          <p>{{item.content}}123132123</p>
        </div>
        <div class="info">
          <span class="btn like"><i>4</i></span>
          <span class="btn comment"><i>0</i></span>
          <span class="btn retweet"><i>1</i></span>
          <span class="btn more"></span>
        </div>
      </router-link>
    </template>
    <template>
      <ul class="basic">
        <li v-for="item in items" :key="item.id">
          <a href="#">
            <h3>{{item.title}}</h3>
            <div class="infomation">{{item.comments}}789789</div>
          </a>
        </li>
      </ul>
      
    </template>
    <template>
      
    </template> 
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
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
      width: 25.6%;
      height: 8.678rem;
      margin-left: 2.5rem;
    }

    .author {
      font-size: 1.2rem;
      color: #ccc;
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

    .infomation {
      margin-top: 0.5rem;
      font-size: 1.4rem;
      color: #42bd56;
    }
  }
}
.info {
  span {
    margin-right: 2rem;
    font-size: 1.4rem;
  }

  .like::before {
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

.btn::before {
  content: '';
  width: 2rem;
  height: 2rem;
  background-position: center center;
  background-repeat: no-repeat;
  display: inline-block;
  margin-bottom: -0.4rem;
}

.card::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.1rem;
  background: #E8E8E8;
}
</style>
