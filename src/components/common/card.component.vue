<template>
  <div class="route-card">
    <v-card>
      <v-card-media class="route-card__image" v-bind:src="route.image ? route.image : noImage" @click="routeInfo(route.id)">
      </v-card-media>
      <v-card-title class="route-card__title" primary-title @click="routeInfo(route.id)">
        <div>
          <div class="stats">
            <div class="stats-count stats-views">
              <v-icon class="stats-icon">mdi-eye</v-icon>&nbsp; {{ route.viewsCount }}
            </div>
            <div class="stats-count stats-likes">
              <v-icon class="stats-icon">mdi-heart</v-icon>&nbsp; {{ route.likesCount }}
            </div>
          </div>
          <div class="headline">{{ route.name }}</div>
          <span class="grey--text">{{ route.length }} км</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="showFavorite && isUserAuthenticated()" icon @click="handleLike(route.id)" v-bind:class="{ 'btn-liked': route.isLiked }">
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn v-if="showDelete && isUserAuthenticated()" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-menu bottom left offset-y>
          <v-btn icon slot="activator" class="more-btn">
            <v-icon>share</v-icon>
          </v-btn>
          <v-list class="menu-list">
            <v-list-tile class="tile-item" v-for="item in networksList" :key="item.network">
              <social-sharing :url="`http://cycleroutes.herokuapp.com/#/routes/${route.id}`" :title="`Веломаршрут: ${route.name}`" inline-template>
                <v-list-tile-title class="menu-list">
                  <network :network="item.network">
                    <v-icon>{{ item.icon }}</v-icon> {{ item.title }}
                  </network>
                </v-list-tile-title>
              </social-sharing>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import { mapActions } from 'vuex';
import noImage from '../../assets/static/images/no-image.png';
export default {
  name: 'card',
  props: ['route', 'showFavorite', 'showDelete'],
  data() {
    return {
      noImage: noImage,
      networksList: [
        {
          title: 'VK',
          network: 'vk',
          icon: 'mdi-vk',
        },
        {
          title: 'Twitter',
          network: 'twitter',
          icon: 'mdi-twitter',
        },
        {
          title: 'Одноклассники',
          network: 'odnoklassniki',
          icon: 'mdi-odnoklassniki',
        },
        {
          title: 'Skype',
          network: 'skype',
          icon: 'mdi-skype',
        },
        {
          title: 'Telegram',
          network: 'telegram',
          icon: 'mdi-telegram',
        },
        {
          title: 'Facebook',
          network: 'facebook',
          icon: 'mdi-facebook',
        },
        {
          title: 'Whatsapp',
          network: 'whatsapp',
          icon: 'mdi-whatsapp',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['likeRoute']),
    routeInfo(routeId) {
      this.$router.push({
        path: `routes/${routeId}`,
        params: {
          id: routeId,
        },
      });
    },
    isUserAuthenticated() {
      return AuthService.isUserAuthenticated();
    },
    handleLike(routeId) {
      this.$store.dispatch('likeRoute', { routeId: this.route.id, likeType: 2 });
    },
  },
};
</script>

<style scoped>
.route-card__image {
  height: 300px !important;
}

.route-card__title {
  padding-top: 12px;
}

.route-card__image,
.route-card__title {
  cursor: pointer;
}

.route-card__title,
.route-card__title > div {
  width: 100%;
}

.route-card__title >>> .headline {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.stats {
  display: flex;
  justify-content: flex-end;
}

.stats-icon {
  font-size: 18px;
}

.stats-count {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 200;
}

.stats-likes {
  padding-left: 8px;
}

.btn-liked {
  color: red;
}
</style>