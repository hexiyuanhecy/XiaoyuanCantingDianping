<template>
  <div class="estimate">
    <return-bar title="个人信息"></return-bar>
    <div>
      <v-card
        class="mx-auto"
        max-width="414"
      >
        <v-card
          dark
          flat
          max-height="250"
        >
          <v-img
            :src="user.us_bg"
            gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
            height="250"
          >
          <input class="bg_edit"  type="file" @change="selectImgs('us_bg',1)" accept="image/*" ref="file1">
          </v-img>
        </v-card>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-list>
              <v-list-tile>
                <v-list-tile-content class="black--text">
                  <v-list-tile-title>头像</v-list-tile-title>
                </v-list-tile-content>
                <v-avatar size="32">
                  <img
                    :src="user.us_pic"
                    alt="John"
                  >
                </v-avatar>
                <v-list-tile-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                    <input class="avatar_edit" type="file" @change="selectImgs('us_pic',2)" accept="image/*" ref="file2">
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <!-- 昵称以下 -->
              <v-list-tile v-for="item in items" :key="item.title" avatar>

                <v-list-tile-content class="black--text">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                
                <div class="size black--text">{{item.data}}</div>
                <v-list-tile-action>
                  <v-btn icon @click="item.fn">
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
        </v-flex>
      </v-layout>

      </v-card>
    </div>
    <!-- 对话 -->
    <v-dialog v-model="dialog" persistent max-width="450px">
      <v-card>
        <v-container grid-list-md>
          <v-text-field :label="label" required v-model="txt"></v-text-field>
        </v-container>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="dialog = false">取消</v-btn>
          <v-btn color="blue darken-1" flat @click="save">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="pswshow" persistent max-width="450px">
      <v-card>
        <v-container grid-list-md>
          <v-text-field label="输入原密码" required type="password" v-model="txt"></v-text-field>
          <v-text-field label="修改密码" :rules="[rules.length(6)]" required type="password" v-model="password"></v-text-field>
          <v-text-field label="确认密码" :rules="[rules.length(6)]" required type="password" v-model="password_again"></v-text-field>
        </v-container>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="pswshow = false">取消</v-btn>
          <v-btn color="blue darken-1" flat @click="savepwd">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <md-dialog-confirm
      :md-active.sync="msgb"
      :md-content="msg"
      md-confirm-text="好的"
      md-cancel-text=""
      @md-confirm="onConfirm"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ReturnBar from '../components/ReturnBar'
export default {
  name: 'estimate',
  components: { ReturnBar },
  data () {
    return {
      dialog: false,
      label: '',
      kind: undefined,
      txt: undefined,
      pswshow:undefined,
      psw: undefined,
      password:undefined,
      password_again:undefined,
      files: [], // 文件缓存
      rules: {
        length: len => v => (v || '').length >= len || `密码至少为 ${len}位`
      },
      msgb: false,
      msg: '',
      close: undefined
    }
  },
  mounted () {
    this.getUserInfo()
  },
  computed: {
    items: function () {
      let state = this.$store.state.mystate.userData[0]
      return [
        {
          data: state.us_name, 
          title: '昵称',
          fn: () => {
            this.label = '昵称'
            this.txt = state.us_name
            this.dialog = true
            this.kind = 'us_name'
            }
        },
        {
          data: state.us_sign,
          title: '个性签名',
          fn: () => {
            this.label = '个性签名'
            this.txt = state.us_sign
            this.dialog = true
            this.kind = 'us_sign'
            }
        },
        {
          data: state.us_ph,
          title: '电话号码',
          fn: () => {
            this.label = '电话号码'
            this.txt = state.us_ph
            this.dialog = true
            this.kind = 'us_ph'
            }
        },
        {
          data: state.us_email,
          title: '电子邮箱',
          fn: () => {
            this.label = '电子邮箱'
            this.txt = state.us_email
            this.dialog = true
            this.kind = 'us_email'
            }
        },
        {
          data: '',
          title: '修改密码',
          fn: () => {
            this.pswshow = true
            this.txt = this.password
            this.kind = 'us_pwd'
            }
        }
      ]
    },
    user: function() {
      let state = this.$store.state.mystate.userData[0]
      return {
        us_pic: state.us_pic,
        us_bg: state.us_bg
      }
    }
  },
  methods: {
    getUserInfo: function () {
      this.$store.dispatch('getUserInfo')
    },
    onConfirm () {
      if(this.close!==1){
        this.pswshow = true
      }
      else{
        this.close=-1
      }
    },
    // 保存修改
    save () {
      if(this.kind === 'us_pwd'){
        this.txt = this.password
        this.close = 1
      }
      var obj = {
        us_id: localStorage.getItem('us_id'),
        kind: this.kind,
        txt: this.txt
      }
      this.axios.post(`http://192.168.43.224:3001/user/edit_info`,this.qs.stringify(obj))
      .then(res => {
        if(res.data.code === 200){
          this.dialog = false
          this.pswshow = false
          if(this.close===1){
            this.msg = '修改成功！'
            this.msgb = true
          }
          this.$store.dispatch('getUserInfo')
        }
        console.log(res.data.code)
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 修改密码
    savepwd () {
      if(this.txt&&this.password&&this.password_again){
        var logininfo = {
          loginname: localStorage.getItem('us_id'),
          password: this.txt
        }
        console.log(logininfo)
        // 判断当前密码是否输入正确
        this.axios.post(`http://192.168.43.224:3001/user/login`, this.qs.stringify(logininfo)).then(res => {
          console.log(res.data.msg.us_id)
          if(res.data.code === 200){
            if(this.txt === this.password){
              this.pswshow = false
              this.msg = '修改的密码与原密码一致！'
              this.msgb = true
            }
            else if(this.password !== this.password_again){
              this.pswshow = false
              this.msg = '两次输入密码不一致'
              this.msgb = true
            }
            else{
              this.save()
            }
          }
          else {
            this.pswshow = false
            this.msg = '当前密码输入不正确，请重新输入！'
            this.msgb = true
          }
        })
      }
      else {
        this.pswshow = false
        this.msg = '请输入完整！'
        this.msgb = true
      }
    },
    //选择图片并修改
    selectImgs(kind,file) {
      let fileList
      if(file === 1) fileList= this.$refs.file1.files[0];
      else fileList= this.$refs.file2.files[0];

      let formData = new FormData()
      formData.append('file',fileList)
      formData.append('name',fileList.name)
      formData.set('us_id', localStorage.getItem('us_id'))
      formData.set('kind', kind)
      formData.set('txt', '')
      console.log(formData.get('file'))
      var obj = {
        us_id: localStorage.getItem('us_id'),
        kind: kind,
        txt: ''
      }
      // console.log(obj)
      const instance=this.axios.create({
          withCredentials: true
      }) 
              
      instance.post('http://192.168.43.224:3001/user/edit_info',formData)
        .then(res=>{
          console.log(res.data)
          this.$store.dispatch('getUserInfo')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: 5px;
}
.bg_edit{
  height: 250px;
  width: 100%;
  opacity: 0;
}
.avatar_edit{
  width: 24px;
  margin-left: -24px;
  opacity: 0;
}
.size{
  font-size: 12px!important;
}
.v-list__tile__action{
  min-width: 20px!important;
}
.v-card__actions{
  display: flex;
  justify-content: space-between;
}
</style>
