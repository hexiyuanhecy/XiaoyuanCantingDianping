<template>
  <div>
    <div class="title"><p>评价详情</p></div>
    <return-bar></return-bar>
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

.title{
  height: 4rem;
  width: 80%;
  position: fixed;
  top: 0;
  z-index: 999;
  font-size: 1.6rem;
  color: white;
  text-align: center;
  margin: 0 10%;
}
</style>
