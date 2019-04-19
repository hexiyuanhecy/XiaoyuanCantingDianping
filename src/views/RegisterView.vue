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
      class="pa-5 pt-4"
    >
       <v-text-field
        v-model="phone"
        :rules="[rules.required, rules.phone]"
        label="手机号码"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.length(6)]"
        counter="6"
        label="输入密码"
        type="password"
        clearable
      ></v-text-field>
      <!-- <v-text-field
        v-model="password_again"
        :rules="[rules.password_again, rules.required]"
        counter="6"
        label="确认密码"
        type="password"
        clearable
      ></v-text-field> -->
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
        @click="submit"
      >注册</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import request from 'superagent'
// import axios from 'axios'
export default {
  data: () => ({
    agreement: false,
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    password_again: undefined,
    phone: undefined,
    temp: undefined,
    rules: {
      phone: v => (v || '').match(/\d{11}/) || '请输入正确的邮箱',
      length: len => v => (v || '').length >= len || `密码至少为 ${len}位`,
      // password_again: v => console.log(this.password + (v || '')),
      required: v => !!v || '不能为空'
    }
  }),
  methods: {
    submit () {
      var password = {
        phone: this.phone,
        password: this.password
      }
      this.axios.post(`http://192.168.137.1:3001/user/register/cname`, this.qs.stringify(password))
      .then(res => {
        this.temp = res.data.code
        if (this.temp === -1) {
          alert(res.data.msg)
        } else {
          this.axios.post(`http://192.168.137.1:3001/user/register`, this.qs.stringify(password))
          .then(res => {
            console.log(res.data.code)
            alert('注册成功')
          })
        }
      })
    }
  }
}
</script>
