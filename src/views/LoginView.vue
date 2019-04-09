<template>
  <v-card
    class="mx-auto"
  >
    <v-card
      dark
      flat
    >
      <v-img
        src="api/images/images/shousi2.jpg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
        height='240'
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-layout column justify-end class="pl-3">
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
      class="pa-5 pt-4"
    >
      <v-text-field
          v-model="loginname"
          :rules="[rules.required]"
          label="用户名/手机号/邮箱"
          clearable
        ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        label="密码"
        type="password"
        clearable
      ></v-text-field>
      <v-checkbox
      >
        <template v-slot:label>
          记住密码
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
        @click="submit"
      >登录</v-btn>
    </v-card-actions>
  </v-card>
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
    }
  }),
  methods: {
    submit () {
      var logininfo = {
        loginname: this.loginname,
        password: this.password
      }
      this.axios.post(`http://localhost:3001/user/login`, this.qs.stringify(logininfo)).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>
