<template>
  <v-card
    class="mx-auto"
  >
  <v-toolbar
      card
      light
    >
      <v-icon>menu</v-icon>
      <v-toolbar-title class="font-weight-light">用户注册</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-form
      ref="form"
      v-model="form"
      class="pa-3 pt-4"
    >
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        counter="6"
        label="密码"
        type="password"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="phone"
        label="手机号码"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        label="邮箱"
        type="email"
        clearable
      ></v-text-field>
      <v-textarea
        v-model="sign"
        auto-grow
        label="个性签名"
        rows="1"
        clearable
      ></v-textarea>
      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
      >
        <template v-slot:label>
          我同意爱校评...
        </template>
      </v-checkbox>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions >
      <v-btn
        flat
        @click="$refs.form.reset()"
      >重置
        
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="black accent-4"
        depressed
        @click="register"
      >注册</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import request from 'superagent'
// import request from 'superagent'
// import axios from 'axios'
export default {
  data: () => ({
    agreement: false,
    sign: undefined,
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    phone: undefined,
    rules: {
      email: v => (v || '').match(/@/) || '请输入正确的邮箱',
      length: len => v => (v || '').length >= len || `密码至少为 ${len}位`,
      // password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
      password: v => (v || '').match() ||
        '密码必须包含大写字母、数字字符和特殊字符',
      required: v => !!v || '不能为空'
    }
  }),
  methods: {
    register ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        request
          .post('http://localhost:3001/api/register')
          .send({
            // email: this.email,
            password: this.password
          })
          .then(res => {
            // localStorage.setItem('token', res.body.token)
            // localStorage.setItem('email', res.body.email)
            // localStorage.setItem('name', res.body.name)

            commit({
              // type: 'setUser',
              // email: res.body.email,
              // token: res.body.token,
              // name: res.body.name
            })
            resolve(res)
          }, err => {
            reject(err)
          })
      })
    },
    submit () {
      // console.log(this.password)
    //   var instance = axios.create({
    //     headers: {'content-type': 'application/x-www-form-urlencoded'}
    //   })
    //   instance.post(`http://localhost:3001/api/register`, 123).then(res => res.data)
    //   this.$axios({
    //     method: 'post',
    //     url: 'http://localhost:3001/user/register',
    //     params: {
    //       password: this.password
    //     }
    //   }).then((res) => {
    //     console.log(res.data)
    //   })
    //   return new Promise((resolve, reject) => {
    //     request
    //       .post('http://localhost:3001/user/register')
    //       .send({
    //         // email: payload.email,
    //         password: this.password
    //         // name: payload.name
    //       })
    //       .then(res => { // 返回
    //         // localStorage.setItem('token', res.body.token)
    //         // localStorage.setItem('email', res.body.email)
    //         // localStorage.setItem('name', res.body.name)

    //         commit({
    //           // type: 'setUser',
    //           // email: res.body.email,
    //           // token: res.body.token,
    //           // name: res.body.name
    //         })
    //         // resolve(res)
    //       // }
    //       // , err => {
    //       //   // reject(err)
    //       })
    //   })
    }
  }
}
</script>
