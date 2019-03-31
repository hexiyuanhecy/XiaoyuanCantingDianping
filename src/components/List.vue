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
  <v-carousel hide-controls hide-delimiters interval="3000"
      height="200">
    <v-carousel-item
      v-for="(item,i) in cards"
      :key="i"
      :src="item.src"
      touch
      >
    <v-window v-model="onboarding">
        <v-window-item
        >
          <v-card
            color="transparent"
            height="200"
          >
            <v-layout
              align-center
              justify-center
              fill-height
              tag="v-card-text"
            >
              Transparent themed, for background-imaged slides. Background color black added for demonstration purposes.
            </v-layout>
          </v-card>
        </v-window-item>
      </v-window>>
    </v-carousel-item>
  </v-carousel>

</div>
    <div class="content">
      <slot name="promItem"></slot>
      <ul class="hasCover">
        <li v-ripple v-for="item in myitems" :key="item.id">
          <!-- <router-link :to="'subject/' + item.id" append> -->
            {{item}}
          <!-- </router-link> -->
        </li>
      </ul>
    </div>

  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-card>
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
              <v-card :to="{name: 'DetailView', params: { id: index }}">
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
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 }
      ],
      myitems: ['无辣不欢', '清淡可口', '日韩料理', '杭帮菜品']
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
  img{
    height: 100% ;
  }
}

  ul {
    width: 100%;
    padding: 0.5rem 0;
    margin-top: 0.5rem;
    border-bottom: 1px solid rgb(236, 236, 236);
  }


.hasCover {
  overflow-x: auto;
  white-space: nowrap;
  text-align: center;

  .title {
    display: block;
    line-height: 100%;
    font-size: 0.8rem !important;
    color: #111;
    overflow: hidden;
  }

  li {
    display: inline-block;
    width: 20%;
    margin-left: 0.6rem;
    margin-right: 0.6rem;
    &:first-child {
      padding-left: 0.5rem;
    }
  }

}

</style>
