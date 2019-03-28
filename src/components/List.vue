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
          <div class="author">
            <div class="icons">
              <span class="icon">&#xe873; 21</span>
              <span class="icon"><i>&#xe86d; 1</i></span>
            </div>
          </div>
        </div>
      </router-link>
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
@import '~css/sass/mysass';
.list {
  .thumbnail {
    position: relative;
    display: block;
    padding: 2.5rem 1.8rem 1rem 0;
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

  .author {
    .icon{
      color: $theme-cl;
    }
  }
}

</style>
