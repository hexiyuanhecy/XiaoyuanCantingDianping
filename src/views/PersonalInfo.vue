<template>
  <div class="estimate">
    <return-bar :title="title"></return-bar>
    <div>
      <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-card
          dark
          flat
        >
          <!-- <v-btn
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
              <img :src="'api/images/user_imgs/'+data[1].us_pic" alt="">
            </v-avatar>
          </v-btn> -->

          <v-img
            :src="data[1].us_pic"
            gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
            height="250"
          >
            <!-- <v-container fill-height>图片上的文字
              <v-layout align-center>
                <strong class="display-4 font-weight-regular mr-4"></strong>
                <v-layout column justify-end>
                  <div class="headline font-weight-light">{{data[1].us_name}}</div>
                  <div class="text-uppercase font-weight-light">{{data[1].us_sign}}</div>
                </v-layout>
              </v-layout>
            </v-container> -->
          </v-img>
        </v-card>

        <md-field>
          <label>昵称</label>
          <md-input v-model="initial"></md-input>
        </md-field>
        <md-field>
          <label>昵称</label>
          <md-input v-model="initial"></md-input>
        </md-field>

      </v-card>
      
      <!-- <md-field>
      <label>Initial Value (Read Only)</label>
      <md-input v-model="initial" readonly></md-input>
    </md-field>

      <md-field>
        <label>Password toggle</label>
        <md-input v-model="password" type="password"></md-input>
      </md-field>

      <md-field :md-toggle-password="false">
        <label>Password field without toggle</label>
        <md-input v-model="password" type="password"></md-input>
      </md-field> -->
    </div>
  </div>
</template>

<script>
import ReturnBar from '../components/ReturnBar'
export default {
  name: 'estimate',
  components: { ReturnBar },
  data () {
    return {
      title: '个人信息',
      initial: '一只老学姐',
      items: [
        {
          action: 'info',
          title: '个人信息',
          fn: () => (this.$router.push('/info'))
        },
        {
          action: 'move_to_inbox',
          title: '我的收藏'
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
    this.axios.get(`http://192.168.137.1:3001/user/info`)
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

<style lang="scss" scoped>
.estimate {
  form{
    padding: 10px;
      border: none;
      font-size: 12px;
  }
.square{
  margin-top: 2rem;
}
  .grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 相当于 1fr 1fr 1fr */
    grid-template-rows: repeat(3, 1fr); /* fr单位可以将容器分为几等份 */
    grid-gap: 1%; /* grid-column-gap 和 grid-row-gap的简写 */
    grid-auto-flow: row;
  }
  .grid>div{
    color: #fff;
    font-size: 50px;
    line-height: 2;
    text-align: center;
    background: #ccc;

  }
  .button{
    position: fixed;
    bottom: 5rem;
    margin: 3rem 0;
    text-align: center;
    width: 92%;
    button{
      width: 90%;
      height: 2.5rem;
      border: none;
      color: white;
      background: #42bd56;
      border-radius: 4px;
    }
  }
}
</style>
