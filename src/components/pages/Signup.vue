<template>
    <v-layout justify-center align-baseline>
        <v-card class="login__form mt-4">
            <v-card-title class="px-4">
                <span class="login__title">Регистрация</span>
            </v-card-title>
            <v-form class="px-4" novalidate @submit.stop.prevent="handleRegister()">
                <v-text-field label="Логин" class="input-group--focused" v-model="login" :rules="rules" required>
                </v-text-field>

                <v-text-field label="Почта" class="input-group--focused" v-model="email" :rules="rules" required>
                </v-text-field>

                <v-text-field label="Пароль"class="input-group--focused"  v-model="password" :rules="rules" required type="password">
                </v-text-field>

                <v-btn flat type="submit" :loading="waitlogin" :disabled="waitlogin" block>Зарегистрироваться</v-btn>
            </v-form>
            <v-card-text>
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
                login: '',
                email: '',
                password: '',
                loginPasswordVisible: false,
                rules: [value => !!value || 'Это поле обязательное'],
                failed: false,
                waitlogin: false
            };
        },
        methods: {
            ...mapActions(['Login'])
        }
    };
</script>