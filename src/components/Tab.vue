<template>
  <div class="header-bar">
    <ul class="nav">
      <li>
        <router-link tag="div" class="index" :to="{ name: 'HomeView'}">
          <p class="icon">&#xe620;</p>
          热门
        </router-link>
      </li>
      <li>
        <router-link tag="div" class="tao" :to="{ name: 'MovieView'}">
          <p class="icon">&#xe602;</p>
          菜淘
        </router-link>
      </li>
      <li>
        <router-link tag="div" class="estimate" :to="{ name: 'StatusView'}">
          <p class="icon">&#xe752;</p>
          动态
        </router-link>
      </li>
      <li>
        <router-link tag="div" class="mine" :to="{ name: 'GroupView'}">
          <p class="icon">&#xe603;</p>
          我的
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tab',
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
    font-size: 1.6rem;
    
    div{ 
    color: #2b2a2a;
    font-size: 12px;
    text-align: center;
      p{
        margin:0 0 2px 0;
        font-size: 24px;
      }
    }
  }
}
</style>
