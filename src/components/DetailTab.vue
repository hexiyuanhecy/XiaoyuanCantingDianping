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
$heme-color: #9AD57F;
.header-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
  display: flex;
  align-items: center;
  height: 4.8rem;
  padding: 0 4rem;
  background: #fff;
  border-top: 0.1rem solid #79a560;

  ul {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }

  li {
    display: inline-block;
    .icon{
      font-size: 21px;
      color: 2E2A29;
    }
  }
}

</style>
