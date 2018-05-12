<template>
    <v-layout justify-center align-baseline>
        <v-card class="login__form mt-4">
            <v-card-title class="px-4">
                <span class="login__title">Вход</span>
            </v-card-title>
            <v-form class="px-4" novalidate @submit.stop.prevent="handlelogIn()">
                <v-text-field label="Логин" v-model="login" :rules="rules" required>
                </v-text-field>

                <v-text-field label="Пароль" v-model="password" :rules="rules" required type="password">
                </v-text-field>

                <v-btn flat type="submit" :loading="waitlogin" :disabled="waitlogin" block>Войти</v-btn>
            </v-form>
            <v-card-text class="text-xs-center">
                <span class="red--text" v-if="failed">Логин или пароль неверные. Пожалуйста, попробуйте ещё раз.</span>
            </v-card-text>
        </v-card>
    </v-layout>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      login: '',
      password: '',
      loginPasswordVisible: false,
      rules: [value => !!value || 'Это поле обязательное'],
      failed: false,
      waitlogin: false,
    };
  },
  methods: {
    ...mapActions(['logIn']),
    handlelogIn() {
      this.failed = false;
      this.waitlogin = true;
      this.logIn({
        Login: this.login,
        Password: this.password,
      }).then(
        res => {
          this.waitlogin = false;
        },
        err => {
          this.failed = true;
          this.waitlogin = false;
        },
      );
    },
  },
};
</script>
