<template>
    <div>
        <v-navigation-drawer v-if="$route.name !== 'Signup' && $route.name !== 'Login'" fixed app clipped v-model="drawer" width="257" class="nav-drawer">
            <v-list dense>
                <v-list-tile >
                    <v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                 filters
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="indigo" dark fixed app height="70" clipped-left>
            <v-toolbar-side-icon v-if="$route.name !== 'Signup' && $route.name !== 'Login'" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title @click.stop="$router.push(`/routes`);">
                <div class="nav-title">Веломаршруты</div>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <img class="round-image" src="">
            <div v-if="userAuthenticated()" class="user-email"> user.Email </div>
            <v-menu bottom left offset-y>
                <v-btn icon slot="activator" dark class="more-btn">
                    <v-icon>mdi-menu-down</v-icon>
                </v-btn>
                <v-list v-if="userAuthenticated()" class="menu-list">
                    <v-list-tile  class="tile-item" v-for="item in userAuthenticatedMenu" :key="item.title" @click="goToLink(item.route)">
                        <v-list-tile-title class="menu-list">
                            <v-icon class="menu-icon">{{ item.icon }}</v-icon>{{ item.title }}
                        </v-list-tile-title>
                    </v-list-tile>
                    </v-list>
                    <v-list v-else class="menu-list">
                     <v-list-tile  class="tile-item" v-for="item in userNotAuthenticatedMenu" :key="item.title" @click="goToLink(item.route)">
                        <v-list-tile-title class="menu-list">
                            <v-icon class="menu-icon">{{ item.icon }}</v-icon>{{ item.title }}
                        </v-list-tile-title>
                    </v-list-tile>
                 </v-list>
            </v-menu>
        </v-toolbar>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';
export default {
    name: 'nav-bar',
    data() {
        return {
            drawer: null,
            test: false,
            userAuthenticatedMenu: [
                { title: 'Выход', icon: 'mdi-logout', route: 'exit' }
            ],
            userNotAuthenticatedMenu: [
                {
                    title: 'Регистрация',
                    icon: 'mdi-account-plus',
                    route: 'signup'
                },
                {
                    title: 'Авторизация',
                    icon: 'mdi-login-variant',
                    route: 'login'
                }
            ]
        };
    },
    methods: {
        userAuthenticated() {
            return AuthService.isUserAuthenticated();
        },
        goToLink(route) {
            this.$router.push(`/${route}`);
        }
    }
};
</script>

<style scoped>
.footer.footer--absolute {
    padding: 0 16px !important;
}

@media screen and (max-width: 410px) {
    .nav-title {
        display: none;
    }
}

.nav-title {
    cursor: pointer;
    font-size: 30px;
    margin-left: 15px;
    margin-bottom: 4px;
}
button.menu-down.btn.btn--icon {
    margin-right: 16px;
}
.user-email {
    margin-bottom: 2px;
    margin-right: -6px;
    font-size: 13px;
    font-weight: 500;
}

.list-tile {
    padding-left: 8px;
    padding-top: 10px;
}
.menu-icons {
    min-width: 45px;
}
.menu-items {
    font-size: 1.15em;
}
.nav-button {
    margin-right: 60px;
}
.menu-icon {
    margin-right: 10px;
    font-size: 13px;
}
.menu-list {
    padding: 0;
    font-size: 14px;
    overflow: hidden;
}
.tile-item a {
    padding-left: 10px;
    height: 40px;
}
</style>