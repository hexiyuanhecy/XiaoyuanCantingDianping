<template>
  <div v-if="items" class="hall-view has-header mybox">
    <div v-for="(item,index) in items" :key="index">
      <scroller v-if="index<6" :title="title[index]" :items="items[+index+1]" :id="+index+1"></scroller>
    </div>
    <div class="all" @click="go">查看全部店铺</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Scroller from '../components/Scroller'
import Types from '../components/Types'

export default {
  name: 'hall-view',
  components: { Scroller, Types },
  data () {
    return {
      title: ['桂花园', '玫瑰园', '紫薇阁', '面食主义', '营养早餐', '无肉不欢']
    }
  },
  computed: {
    // Getting Vuex State from store/modules/hall
    ...mapState({
      items: state => state.hall.obj
    })
  },
  methods: {
    // Dispatching getDiningHall
    getDiningHall: function () {
      this.$store.dispatch('getDiningHall')
      console.log('getDiningHall')
    },
    go: function () {
      this.$router.push('/hallall/0')
    }
  },
  created () {
    // Getting halls data on created
    this.getDiningHall()
  }
}
</script>

<style scoped>
.mybox{
  /* margin-bottom: 5.5rem; */
}
.all{
  text-align: center;
  color: #777;
  font-size: 0.9rem;
  margin-top: 10px;
  margin-bottom: 20px;
}
.v-icon.v-icon.v-icon--link{
  padding: 2px !important;
}
</style>
