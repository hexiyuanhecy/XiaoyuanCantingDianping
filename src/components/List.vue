<template>
  <div class="list">
    <!-- <template v-for="(item , index) in items">
      <router-link
        class="thumbnail"
        :to="{name: 'DetailView', params: { id: index }}"
        :key="index">
        <div class="content">
          <img :src="item.image_hlarge" alt="cover">
          <h3>{{item.title}}</h3>
          <p>{{item.content | subStr}}</p>
          <div class="author">
            <div class="icons">
              <span class="icon">&#xe873; 21</span>
              <span class="icon"><i>&#xe86d; 1</i></span>
            </div>
          </div>
        </div>
      </router-link>
    </template> -->
    <div class="height">
  <v-carousel hide-controls 
      height="200">
    <v-carousel-item
      v-for="(item,i) in cards"
      :key="i"
      :src="item.src"
      touch
    ></v-carousel-item>
  </v-carousel></div>
    <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="item in items"
              :key="item.title"
              v-bind="{ [`xs6`]: true }"
            >
              <v-card>
                <v-img
                  :src="item.image_hlarge"
                  height="200px"
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

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>bookmark</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    mold: {
      type: String,
      default: 'basic'
    },
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      cards: [
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
      ]
    }
  },
  filters: {
    subStr: function (value) {
      let newVal = value.replace(/<.*?>/g, '')
      return newVal.slice(0, 30)
    }
  }
}
</script>

<style lang='scss' scoped>
.height{
  // height: 10rem;
}
.list {
  padding-top:50px;
  img{
    height: 100% ;
  }
}

</style>
