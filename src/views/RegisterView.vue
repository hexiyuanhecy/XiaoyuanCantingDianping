<template>
<div>
  <div class="back">
    <v-btn icon class="" href="javascript:history.go(-1);">
          <v-icon color="white" class="body-3">arrow_back</v-icon>
        </v-btn>
  </div>
    <v-card
      dark
      flat
    >
      <v-img
        src="http://192.168.43.224:3001/public/images/images/register2.jpg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
        height="200"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-layout column justify-end class="pl-3">
              <div class="headline font-weight-light">你好</div>
              <div class="text-uppercase font-weight-light">终于等到你了</div>
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
        v-model="phone"
        :rules="[rules.required, rules.phone]"
        label="手机号码"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.length(6), rules.required]"
        label="输入密码"
        type="password"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="password_again"
        :rules="[rules.length(6), rules.required]"
        label="确认密码"
        type="password"
        clearable
      ></v-text-field>
    </v-form>
    <v-card-actions  class="mx-5 mt-4 x-0">
      <v-btn
        block
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="black accent-4"
        depressed
        @click="submit"
      >注册</v-btn>
    </v-card-actions>
    <div class="agree">注册即代表您同意<span id="protocol">用户服务协议</span></div>
    <div>

    <md-dialog-confirm
      :md-active.sync="msgb"
      :md-content="msg"
      md-confirm-text="好的"
      md-cancel-text=""/>
    <md-dialog-confirm
      :md-active.sync="msgb1"
      :md-content="msg1"
      md-confirm-text="好的"
      md-cancel-text=""
      @md-confirm="onConfirm"/>

  </div>
</div>
</template>

<script>
// import request from 'superagent'
// import axios from 'axios'
export default {
  data: () => ({
    form: false,
    isLoading: false,
    password: undefined,
    password_again: undefined,
    phone: undefined,
    temp: undefined,
    check: '',
    rules: {
      phone: v => (v || '').match(/\d{11}/) || '请输入正确的电话号码或邮箱',
      length: len => v => (v || '').length >= len || `密码至少为 ${len}位`,
      password_again: v => console.log('+++'+this.check),
      required: v => !!v || '不能为空'
    },
    msgb: false,
    msg: '',
    msgb1: false,
    msg1: ''
  }),
  methods: {
    onConfirm () {
      this.$router.push({ path:'/login'})
    },
    submit () {
      if(this.password !== this.password_again){
        this.msgb = true
        this.msg = '两次密码不一致，请重新输入！'
      }
      else{
        var user_info = {
          phone: this.phone,
          password: this.password
        }
        this.axios.post(`http://192.168.43.224:3001/user/register/cname`, this.qs.stringify(user_info))
        .then(res => {
          this.temp = res.data.code
          if (this.temp === -1) {
            this.msgb = true
            this.msg = '该用户名已存在！'
          } else {
            this.axios.post(`http://192.168.43.224:3001/user/register`, this.qs.stringify(user_info))
            .then(res => {
              this.msgb1 = true
              this.msg1 = '恭喜您注册成功，请前往登录吧！！'
            })
          }
        })
      }
      
    }
  }
}
</script>

<style scoped>
.back{
  position: absolute;
  top: 0px;
  z-index: 3;
}
.v-text-field{
  padding-top: 5px;
}
.agree{
  width: 100%;
  margin-top: 5px;
  color: grey;
  font-size: 12px;
  text-align: center;
}
#protocol{
  color: #000;
}
</style>
