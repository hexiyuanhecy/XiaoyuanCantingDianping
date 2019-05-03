<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-card
      dark
      flat
    >
      <v-btn
        absolute
        bottom
        color="grey"
        right
        fab
        big
      >
        <v-avatar
          size="56px"
        >
          <img :src='data.us_pic' alt="">
        </v-avatar>
      </v-btn>

      <v-img
        :src="data.us_bg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
      >
        <v-container fill-height><!-- 图片上的文字 -->
          <v-layout align-center>
            <strong class="display-4 font-weight-regular mr-4"></strong>
            <v-layout column justify-end>
              <div class="headline font-weight-light">{{data.us_name}}</div>
              <div class="text-uppercase font-weight-light">{{data.us_sign}}</div>
            </v-layout>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
          <v-list class=" darken-2" light>
            <template v-for="(item, index) in items">
                <v-list-tile v-if="item.action" :key="item.title" @click="item.fn">
                <v-list-tile-action>
                  <v-icon>{{ item.action }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class="black--text">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-else-if="item.divider" :key="index"></v-divider>
              <v-subheader v-else-if="item.header" :key="item.header" class="">{{ item.header }}</v-subheader>
            </template>
          </v-list>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'personnal',
  data () {
    return {
      items: [
        {
          action: 'info',
          title: '个人信息',
          fn: () => (this.$router.push('/info'))
        },
        {
          action: 'favorite',
          title: '我的收藏',
          fn: () => (this.$router.push('/favourite'))
        },
        {
          action: 'chat',
          title: '我的评价',
          fn: () => (this.$router.push('/favourite'))
        },
        {
          action: 'delete',
          title: '我的攻略',
          fn: () => (this.$router.push('/favourite'))
        },
        {
          action: 'close',
          title: '退出登录',
          fn: () => {
            localStorage.clear()
            this.$router.push('/login')
            }
        }
      ],
      day: Date,
      week: String,
      data: this.$store.state.mystate.userData[0]
    }
  },
  mounted () {
    console.log(this.$store.state.mystate.us_name)
  },
  created () {
    this.getUserInfo()
    console.log(this.$store.state.mystate.us_name)
  },
  methods: {
    getUserInfo: function () {
      this.$store.dispatch('getUserInfo')
    }
  }
}
</script>
