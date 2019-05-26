<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-layout row wrap>
      <v-flex
        v-for="(item , index) in items"
        :key="index"
        v-bind="{ [`xs6`]: true}"
      >
        <v-card>
          <router-link tag="div" :to="{name: 'DetailView', params: { id: index }}">
            <div style="border-radius:8px">
              <v-img
              :src="item.es_main_img"
              height="230px"
              tile
            >
              <v-container
                fill-height
                fluid
                pa-2
              >
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <!-- <span class="headline white--text" v-text="item.title"></span> -->
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            </div>
            <v-card-title dark  class="pb-0">
                <div class="es_content">{{item.es_content}}</div>
            </v-card-title>
          </router-link>
          <!-- 文字以下 -->
          <v-card-actions class=" px-0 pt-0">
            <v-list-tile>
              <v-list-tile-avatar 
                color="grey darken-3"
                size="23"
                width="10"
                >
                <v-img
                  class="elevation-4"
                  :src="item.us_pic"
                ></v-img>
              </v-list-tile-avatar>
      
              <v-layout class="py-0 mt-0">
                <div class="star">
                  <div @click="toStar(item.es_id,index)">
                  <v-rating
                    :value="item.star||0"
                    length="1"
                    empty-icon="favorite_border"
                    full-icon="favorite"
                    readonly="readonly"
                    color="lighten-3"
                    background-color="grey lighten-1"
                  ></v-rating></div>
                  <div class="">{{item.es_star}}</div>
                </div>
                <!-- <v-icon class="mr-">thumb_up</v-icon>
                <span class="subheading">45</span> -->
              </v-layout>

            </v-list-tile>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'EstimateItems',
  props: ['item'],
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
