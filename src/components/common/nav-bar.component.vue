<template>
  <div>
    <v-navigation-drawer v-if="$route.name === 'RoutesList'" fixed app clipped v-model="drawer" width="257" class="nav-drawer">
      <filters></filters>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app height="70" clipped-left>
      <v-toolbar-side-icon v-if="$route.name === 'RoutesList'" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title @click.stop="$router.push(`/routes`);">
        <div class="nav-title">Веломаршруты</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar v-if="isUserAuthenticated()" size="40px" class="hidden-xs-only avatar-image">
        <img :src="user.Image ? user.Image : noPhoto" alt="avatar">
      </v-avatar>
      <div v-if="isUserAuthenticated()" class="user-email"> {{ user.Email }} </div>
      <v-menu bottom left offset-y>
        <v-btn icon slot="activator" dark class="more-btn">
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
        <v-list class="menu-list">
          <v-list-tile class="tile-item" v-for="item in userMenu()" :key="item.title" @click="goTo(item.route)">
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
import Filters from '@/components/common/filters.component';
import noPhoto from '../../assets/static/images/no-photo.jpg';

export default {
  name: 'nav-bar',
  components: {
    filters: Filters,
  },
  data() {
    return {
      noPhoto: noPhoto,
      drawer: null,
      userAuthenticatedMenu: [
        {
          title: 'Личный кабинет',
          icon: 'mdi-account-box',
          route: 'my-profile',
        },
        {
          title: 'Мои маршруты',
          icon: 'mdi-format-list-bulleted',
          route: 'my-routes',
        },
        {
          title: 'Избранное',
          icon: 'mdi-heart-box',
          route: 'favourites',
        },
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
      user: 'getUser',
    }),
  },
  methods: {
    ...mapActions(['logOut']),

    isUserAuthenticated() {
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
    userMenu() {
      return AuthService.isUserAuthenticated() ? this.userAuthenticatedMenu : this.userNotAuthenticatedMenu;
    }
  },
};
</script>

<style scoped>

.toolbar {
  z-index: 10000;
}

.footer.footer--absolute {
  padding: 0 16px !important;
}

.nav-title {
  cursor: pointer;
  font-size: 30px;
  margin-bottom: 4px;
}

button.menu-down.btn.btn--icon {
  margin-right: 16px;
}

.user-email {
  margin-right: 10px;
  font-size: 14px;
  font-weight: 500;
}

.avatar-image {
  margin-right: 20px;
}

</style>
