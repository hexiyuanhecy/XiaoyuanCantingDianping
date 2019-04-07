<template>
    <div class="content-list">
      <v-layout row wrap>
          <v-flex xs12>
            <v-card color="blue-grey darken-2" class="white--text" v-for="item in items" :key="item">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Unlimited music now</div>
                  <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
      </v-layout>
      <gongluelist mold="quote" v-for="item in items" :key="item"></gongluelist>
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
