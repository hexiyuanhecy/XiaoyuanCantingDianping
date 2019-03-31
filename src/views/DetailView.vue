<template>
<!-- 评论详情 -->
  <div class="detail-view has-header">
    <template v-if="!showLoading">
      <br>
      <div class="info">
        <h2>
          {{eventItem.title}}
          <span class="badge">{{eventItem.loc_name}}</span>
        </h2>
        <div class="poster">
          <img :src="eventItem.image_hlarge" alt="">
        </div>
        <div class="detail">
          <span>餐厅地点:&nbsp;&nbsp;</span>
          <ul>
            <li>{{eventItem.address}}</li>
          </ul>
        </div>
        <div class="describe">
           <a href="#">
          <img src="../assets/douban-app-logo.png" alt="">
        </a>
          <div v-if="eventItem.content" class="content" v-html="content"></div>
        </div>
      </div>
    </template>
    <detail-tab></detail-tab>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DetailTab from '../components/DetailTab'
import Loading from '../components/Loading'

export default {
  name: 'detail-view',
  components: { DetailTab, Loading },
  data () {
    return {
      showLoading: true
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
    })
  }
}
</script>

<style lang="scss" scoped>
.info {
  margin: 1rem;

  h2 {
    margin: 2rem 0;
    font-weight: bold;
    color: #494949;
  }

  .badge {
    display: inline-block;
    padding: 0.1rem 0.5rem;
    margin-bottom: 0.3rem;
    vertical-align: middle;
    line-height: 1.8rem;
    font-size: 1.2rem;
    color: #fff;
    background-color: #FF8263;
    border-radius: 0.2rem;
  }

  .poster {
    margin: 2rem auto;
    text-align: center;

    img {
      width: 100%;
      max-width: 22rem;
      height: auto;
    }
  }
}

.detail {
  margin-left: 3.3rem;
  margin-bottom: 1rem;
  min-height: 1.5em;
  font-size: 1.4rem;
  clear: left;

  span {
    float: left;
    margin-left: -3.3rem;
    line-height: 150%;
    color: #666666;
  }

  ul {
    list-style-position: outside;
    margin-left: 0;
  }
}

.describe {
  h2 {
    color: #072;
  }

  .content {
    overflow: hidden;
    font-size: 1.4rem;
  }
}

</style>
