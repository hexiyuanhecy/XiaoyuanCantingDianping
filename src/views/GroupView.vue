<template>
  <div class="group-view has-header">
    <user-bar></user-bar>
    <div class="my-tool">
      <ul>
        <li><i class="icon">&#xe86d;</i><p>我的收藏</p></li>
        <li><i class="icon">&#xe86d;</i><p>我的收藏</p></li>
        <li><i class="icon">&#xe61e;</i><p>我要收藏</p></li>
      </ul>
    </div>
    <div class="tool-list-box">
      <div class="tool-list">
        <div>
        <i class="icon">&#xe86d;</i>我的收藏
          <span class="right-icon">></span>
        </div>
      </div>
      <div class="tool-list">
        <div>
          <i class="icon">&#xe86d;</i>
          我的收藏
          <span class="right-icon">></span>
        </div>
      </div>
      <div class="tool-list">
        <div>
          <i class="icon">&#xe61e;</i>
          我的收藏
          <span class="right-icon">></span>
        </div>
      </div>
      <div class="tool-list">
        <div>
          <i class="icon">&#xe892;</i>
          设置
          <span class="right-icon">></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import UserBar from '../components/UserBar'

export default {
  name: 'group-view',
  components: { UserBar },
  data () {
    return {}
  },
  computed: {
    // Getting Vuex State from store/modules/group
    ...mapState({
      group_a: state => state.group.group_a,
      group_b: state => state.group.group_b,
      group_c: state => state.group.group_c
    })
  },
  created: function () {
    // Dispatching getGroup on created
    this.$store.dispatch('getGroup')
  }
}
</script>

<style lang="scss" scoped>
.list-link {
  display: block;
  margin-bottom: 3rem;
  padding: 1.5rem 0;
  font-size: 1.6rem;
  line-height: 1.8rem;
  text-align: center;
  color: #42bd56;
}

.user-bar {
  margin-bottom: 1.5rem;
}

.my-tool{
  padding: 10px;
  margin: 0 10px;
  text-align: center;
  box-shadow:2px 2px 5px #ccc;
  overflow: hidden;
  border-radius: 20px;
  
  ul {
    display: flex;
    justify-content: space-around;
    text-align: center;
    li{
      width: 33.3%;
    }
  }
}
.tool-list-box{
  padding: 2rem;
  font-size: 12px;
  .tool-list{
    margin-bottom: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    .right-icon{
      color: #ccc;
      float: right;
    }
  }
}
</style>
