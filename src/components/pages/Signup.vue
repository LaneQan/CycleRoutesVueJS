<template>
  <v-layout justify-center align-baseline>
    <v-card class="login__form mt-4">
      <v-card-title class="px-4">
        <span class="login__title">Регистрация</span>
      </v-card-title>
      <v-form class="px-4" novalidate @submit.stop.prevent="handleRegister()">
        <v-text-field label="Логин" v-model="login" v-validate="loginRules" name="логин" :rules="(!errors.first('логин')) ? [true] : [errors.first('логин')]" required>
        </v-text-field>

        <v-text-field label="Имя" v-model="firstname" v-validate="nameRules" name="имя" :rules="(!errors.first('имя')) ? [true] : [errors.first('имя')]" required>
        </v-text-field>

         <v-text-field label="Фамилия" v-model="lastname" v-validate="nameRules" name="имя" :rules="(!errors.first('фамилия')) ? [true] : [errors.first('фамилия')]" required>
        </v-text-field>

        <v-text-field label="E-mail" v-model="email" v-validate="emailRules" name="e-mail" :rules="(!errors.first('e-mail')) ? [true] : [errors.first('e-mail')]" required>
        </v-text-field>

        <v-text-field label="Текущий город" v-model="currentCity">
        </v-text-field>

        <v-text-field mask="(##) ###-##-##" :prefix="getPhone(phone.number) ? '+375': ''" label="Мобильный телефон" v-model="phone">
        </v-text-field>

        <v-text-field label="Пароль" v-model="password" v-validate="passwordRules" name="пароль" :rules="(!errors.first('пароль')) ? [true] : [errors.first('пароль')]" required type="password">
        </v-text-field>

        <v-text-field label="Подтверждение пароля" v-model="passwordConfirm" v-validate="passwordConfirmRules" name="подтверждение пароля" :rules="(!errors.first('подтверждение пароля')) ? [true] : [errors.first('подтверждение пароля')]" required type="password">
        </v-text-field>

        <v-btn flat type="submit" block>Зарегистрироваться</v-btn>
      </v-form>
      <v-card-text class="text-xs-center">
        <span class="red--text" v-if="failed">Почта или логин уже заняты.</span>
      </v-card-text>
    </v-card>
  </v-layout>
</template>
<script>
import { mapActions } from 'vuex';
import { Validator } from 'vee-validate';
export default {
  name: 'Signup',
  data() {
    return {
      failed: false,
      login: '',
      email: '',
      password: '',
      passwordConfirm: '',
      currentCity: '',
      phone: '',
      firstname: '',
      lastname: '',
      nameRules: {
        required: true
      },
      emailRules: {
        required: true,
        email: true,
      },
      loginRules: {
        required: true,
        min: 6,
        max: 12,
      },
      passwordRules: {
        required: true,
        min: 8,
        max: 30,
      },
      passwordConfirmRules: {
        required: true,
        confirmed: 'пароль',
      },
    };
  },
  created() {},
  methods: {
    ...mapActions(['signUp']),
    handleRegister() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.signUp({
            Email: this.email,
            Login: this.login,
            Password: this.password,
            CurrentCity: this.currentCity,
            Phone: this.phone,
            Firstname: this.firstname,
            Lastname: this.lastname,
          }).then(
            res => {},
            err => {
              this.failed = true;
            },
          );
        } else alert('Заполните обязательные поля!');
      });
    },
    getPhone(number) {
      return number ? number.replace('+375', '') : '';
    },
  },
};
</script>

<style scoped>
.is-danger {
  color: red;
}
</style>
