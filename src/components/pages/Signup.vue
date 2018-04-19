<template>
    <v-layout justify-center align-baseline>
        <v-card class="login__form mt-4">
            <v-card-title class="px-4">
                <span class="login__title">Регистрация</span>
            </v-card-title>
            <v-form class="px-4" novalidate @submit.stop.prevent="handleRegister()">
                <v-text-field label="Логин" class="input-group--focused" v-model="login" :rules="fieldRules" required>
                </v-text-field>

                <v-text-field label="Почта" class="input-group--focused" v-model="email" :rules="fieldRules" required>
                </v-text-field>

                <v-text-field label="Пароль" class="input-group--focused"  v-model="password" :rules="fieldRules" required type="password">
                </v-text-field>

                <v-text-field label="Подтверждение пароля" class="input-group--focused"  v-model="passwordConfirm" :rules="fieldRules" required type="password">
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
export default {
    name: 'Signup',
    data() {
        return {
            failed: false,
            login: '',
            email: '',
            password: '',
            passwordConfirm: '',
            fieldRules: [value => !!value || 'Это поле обязательное'],
        };
    },
    methods: {
        ...mapActions(['signUp']),
        handleRegister() {
            this.signUp({
                Email: this.email,
                Login: this.login,
                Password: this.password,
            }).then(
                res => {},
                err => {
                    this.failed = true;
                },
            );
        },
    },
};
</script>
