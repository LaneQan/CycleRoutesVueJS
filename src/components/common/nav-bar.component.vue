<template>
    <div>
        <v-navigation-drawer v-if="$route.name === 'RoutesList'" fixed app clipped v-model="drawer" width="257" class="nav-drawer">
            <div class="filters">
                <div class="filter-category">
                    <h4 class="filter-title"> Длина маршрута </h4>
                    <v-layout class="filter-input" row wrap>
                        <v-flex xs6>
                            <v-text-field v-model="filters.minLength" solo label="От"></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field v-model="filters.maxLength" solo label="До"></v-text-field>
                        </v-flex>
                    </v-layout>
                </div>
                <div class="filter-category">
                    <h4 class="filter-title"> Тип маршрута </h4>
                    <v-layout class="filter-select" row wrap>
                        <v-select class="input-group--focused" :items="routeTypes" label="Тип маршрута" single-line></v-select>
                    </v-layout>
                </div>
                <div class="filter-category">
                    <h4 class="filter-title"> Направленность маршрута </h4>
                    <v-layout class="filter-select" row wrap>
                        <v-select class="input-group--focused" :items="routesLineTypes" label="Направленность" single-line></v-select>
                    </v-layout>
                </div>
                <div class="filter-category">
                    <h4 class="filter-title"> [TODO]Ландшафт местности </h4>
                    <v-layout class="filter-select" row wrap>
                        <v-select class="input-group--focused" label="Выбор типа" single-line></v-select>
                    </v-layout>
                </div>
            </div>
        </v-navigation-drawer>
        <v-toolbar color="indigo" dark fixed app height="70" clipped-left>
            <v-toolbar-side-icon v-if="$route.name === 'RoutesList'" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title @click.stop="$router.push(`/routes`);">
                <div class="nav-title">Веломаршруты</div>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <img class="round-image" src="">
            <div v-if="userAuthenticated()" class="user-email"> {{ user.Email}} </div>
            <v-menu bottom left offset-y>
                <v-btn icon slot="activator" dark class="more-btn">
                    <v-icon>mdi-menu-down</v-icon>
                </v-btn>
                <v-list v-if="userAuthenticated()" class="menu-list">
                    <v-list-tile class="tile-item" v-for="item in userAuthenticatedMenu" :key="item.title" @click="goTo(item.route)">
                        <v-list-tile-title class="menu-list">
                            <v-icon class="menu-icon">{{ item.icon }}</v-icon>{{ item.title }}
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
                <v-list v-else class="menu-list">
                    <v-list-tile class="tile-item" v-for="item in userNotAuthenticatedMenu" :key="item.title" @click="goTo(item.route)">
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
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'nav-bar',
    data() {
        return {
            drawer: null,
            userAuthenticatedMenu: [
                { title: 'Выход', icon: 'mdi-logout', route: 'logout' },
            ],
            userNotAuthenticatedMenu: [
                {
                    title: 'Регистрация',
                    icon: 'mdi-account-plus',
                    route: 'signup',
                },
                {
                    title: 'Авторизация',
                    icon: 'mdi-login-variant',
                    route: 'login',
                },
            ],
        };
    },
    computed: {
        ...mapGetters({
            filters: 'getFilters',
            user: 'getUser',
        }),
    },
    methods: {
        ...mapActions(['logOut']),

        userAuthenticated() {
            return AuthService.isUserAuthenticated();
        },
        goTo(route) {
            if (route == 'logout') {
                this.logOut();
                this.$router.push('/');
            } else {
                this.$router.push(`/${route}`);
            }
        },
    },
};
</script>

<style scoped>
.footer.footer--absolute {
    padding: 0 16px !important;
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

.filter-category {
    width: 100%;
}

.filter-category:first-child {
    padding-top: 15px;
}

.filter-category:not(:last-child) {
    padding-bottom: 15px;
}

.filter-title {
    padding-left: 10px;
    padding-bottom: 5px;
}

.filter-input,
.filter-select {
    padding-left: 10px;
    padding-right: 10px;
}
</style>
