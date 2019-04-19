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
          <img src='http://192.168.43.224:3001/public/images/user_imgs/1.jpg' alt="">
        </v-avatar>
      </v-btn>

      <v-img
        src="http://192.168.43.224:3001/public/images/dh_main_imgs/16.jpg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
      >
        <v-container fill-height><!-- 图片上的文字 -->
          <v-layout align-center>
            <strong class="display-4 font-weight-regular mr-4"></strong>
            <v-layout column justify-end>
              <div class="headline font-weight-light">{{data[1].us_name}}</div>
              <div class="text-uppercase font-weight-light">{{data[1].us_sign}}</div>
            </v-layout>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
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
        </v-card>
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
          action: 'move_to_inbox',
          title: '我的收藏',
          fn: () => (this.$router.push('/favourite'))
        },
        {
          action: 'send',
          title: '我的评价'
        },
        {
          action: 'delete',
          title: '我的攻略'
        },
        { divider: true },
        { header: 'Labels' },
        {
          action: 'label',
          title: 'Family'
        }
      ],
      day: Date,
      week: String,
      data: undefined
    }
  },
  mounted () {
    console.log(123123123)
    this.axios.get(`http://192.168.43.224:3001/user/info`)
    .then(res => {
      this.data = res.data.data
      console.log(this.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>
