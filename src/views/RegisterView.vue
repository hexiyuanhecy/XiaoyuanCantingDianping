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
    submit () {
      var password = {
        password: 1234,
        a: 321
      }
      this.axios.post(`http://localhost:3001/user/register`, this.qs.stringify(password)).then(res => res.data)
    }
  }
}
</script>
