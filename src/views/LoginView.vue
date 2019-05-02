<template>
<div class="login">
    <v-card
      dark
      flat
    >
      <v-img
        src="http://192.168.43.224:3001/public/images/images/shousi2.jpg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
        height='200'
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-layout column justify-end class="pl-4">
              <div class="headline font-weight-light">嗨</div>
              <div class="text-uppercase font-weight-light">你来了</div>
            </v-layout>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>

    <v-form
      ref="form"
      v-model="form"
      class="mx-5 pt-4"
    >
      <v-text-field
          v-model="loginname"
          :rules="[rules.required]"
          label="手机号/邮箱"
          clearable
        ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        label="密码"
        type="password"
        clearable
      ></v-text-field>
      <div class="forget">忘记密码？</div>
    </v-form>
    <!-- <v-divider></v-divider> -->
    <v-card-actions class="mx-5 mt-4 px-0">
      <v-btn
        block
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="black accent-4"
        depressed
        @click="submit"
      >登录</v-btn>
    </v-card-actions>
    <md-dialog-alert
      :md-active.sync="msgb"
      :md-content="msg"
      md-confirm-text="好的" />
    <router-link tag="div" class="register" to='/register'>还没有账号？现在注册</router-link>
    <!-- <div class="agree">登录即代表您同意<span id="protocol">用户服务协议</span></div> -->
</div>

</template>

<script>
// import request from 'superagent'
// import axios from 'axios'
export default {
  data: () => ({
    loginname: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    rules: {
      length: len => v => (v || '').length >= len || `密码少于 ${len}位，是不是漏填了`,
      required: v => !!v || '这里必须填哦'
    },
    msgb: false,
    msg: '用户名或密码错误,请重新输入'
  }),
  methods: {
    submit () {
      var logininfo = {
        loginname: this.loginname,
        password: this.password
      }
      this.axios.post(`http://192.168.43.224:3001/user/login`, this.qs.stringify(logininfo)).then(res => {
        console.log(res.data.msg.us_id)
        if(res.data.code === 200){
          localStorage.setItem('flag',"1")
          localStorage.setItem('us_id', res.data.msg.us_id)
          // this.$store.dispatch("us_id", res.data.msg.us_id);
          this.$router.push({ path: '/pages/home'})
        }
        else {
          this.msgb = true
        }
      })
    }
  },
  created () {
    let flag = localStorage.getItem('flag')
    if(flag){
      this.$router.push({ path: '/pages/home'})
    }
  }
}
</script>

<style scoped>
.login{
  height: 100%;
  width: 100%;
}
.v-text-field{
  padding-top: 5px;
}
.forget{
  float: right;
}
.register{
  width: 100%;
  margin-top: 5px;
  color: black;
  font-size: 12px;
  text-align: center;
}
.agree{
  width: 100%;
  margin-top: 50px;
  color: grey;
  font-size: 12px;
  text-align: center;
}
#protocol{
  color: #000;
}
</style>

