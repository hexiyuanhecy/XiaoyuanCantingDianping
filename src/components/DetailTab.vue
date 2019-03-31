<template>
  <div>
    <return-bar title="评论详情"></return-bar>
    <div class="header-bar">
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
    </div>
    
  </div>

</template>

<script>
import ReturnBar from '../components/ReturnBar'

export default {
  name: 'tab',
  components: { ReturnBar },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
