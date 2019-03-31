<template>
<!-- 评论详情 -->
  <div>
    <return-bar :title="title"></return-bar>
    <!-- <div class="header-bar">
      <ul class="nav">
        <li>
          <span class="icon">&#xe873;</span>
        </li>
        <li>
          <span class="icon">&#xe86f;</span>
        </li>
        <router-link tag="li" :to="{ name: 'Estimate'}">
          <span class="icon">&#xe8b9;</span>
        </router-link>
      </ul>
    </div> -->
    
      <v-card height="56px">
    <v-bottom-nav
      :active.sync="activeBtn"
      value="true"
      fixed
      shift
    >
      <v-btn @click="home">
        <span class="tabs">点赞</span>
        <v-icon>thumb_up</v-icon>
      </v-btn>
      <v-btn color="" flat value="hall" @click="hall">
        <span class="tabs">收藏</span>
        <v-icon>star</v-icon>
      </v-btn>
      <v-btn color="" flat value="gonglue" @click="gonglue" :to="{ name: 'Estimate'}">
        <span class="tabs">评价</span>
        <v-icon>edit</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
  </div>

</template>

<script>
import ReturnBar from '../components/ReturnBar'

export default {
  name: 'tab',
  components: { ReturnBar },
  data () {
    return {
      title: '评论详情'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
