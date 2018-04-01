<template>
    <v-layout justify-center align-baseline>
        <v-card class="login__form mt-4">
            <v-card-title class="px-4">
                <span class="login__title">Регистрация</span>
            </v-card-title>
            <v-form class="px-4 pb-3" novalidate @submit.stop.prevent="handlelogIn()">
                <v-text-field label="Почта" v-model="email" class="custom-input" :rules="rules" required>
                </v-text-field>

                <v-text-field label="Пароль" v-model="password" class="custom-input" :rules="rules" required type="password">
                </v-text-field>

                <v-btn flat type="submit" :loading="waitlogin" :disabled="waitlogin" block>Зарегистрироваться</v-btn>
            </v-form>
            <v-card-text>
                <span class="red--text" v-if="failed">Почта или пароль уже заняты.</span>
            </v-card-text>
        </v-card>
    </v-layout>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        name: "Signup",
        data() {
            return {
                email: '',
                password: '',
                loginPasswordVisible: false,
                rules: [(value) => !!value || 'Это поле обязательное'],
                failed: false,
                waitlogin: false

            };
        },
        methods: {
            ...mapActions([
                'Login'
            ]),
        }
    };
</script>
