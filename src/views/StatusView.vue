<template>
  <div class="status has-header">
    <div v-if="show">
      <banner></banner>
    </div>
    <div class="content-list" v-else>
      <card mold="quote" v-for="item in items" :key="item"></card>
      <a class="list-link" href="#">显示更多广播</a>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import Card from '../components/Card'

export default {
  name: 'status',
  components: { Banner, Card },
  data () {
    return {
      items: new Array(10)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-list{
  margin-top: 7rem;
}
.list-link {
  display: block;
  padding: 1.5rem 0;
  font-size: 1.6rem;
  line-height: 1.8rem;
  text-align: center;
  color: #42bd56;
}
</style>
