<template>
  <div class="header-bar">
    <ul class="nav">
      <li>
        <router-link :to="{ name: 'HomeView'}">
          豆瓣
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'MovieView'}">
          电影
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'StatusView'}">
          广播
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'GroupView'}">
          小组
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
    a{ 
    color: #00b600;
    }
  }
}
</style>
