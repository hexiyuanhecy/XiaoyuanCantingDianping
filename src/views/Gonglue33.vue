<template>
    <div class="content-list">
      <gongluelist mold="quote" v-for="item in items" :key="item"></gongluelist>
      <a class="list-link" href="#">显示更多广播</a>
    </div>
</template>

<script>
import Gongluelist from '../components/Gongluelist'

export default {
  name: 'status',
  components: { Gongluelist },
  data () {
    return {
      items: new Array(10)
    }
  }
}
</script>

<style lang="scss" scoped>

.list-link {
  display: block;
  padding: 1.5rem 0;
  font-size: 1.6rem;
  line-height: 1.8rem;
  text-align: center;
  color: #42bd56;
}
</style>
