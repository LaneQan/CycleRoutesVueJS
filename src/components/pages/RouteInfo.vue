<template>
	<v-container v-if="!loading" class="info-container">
		<v-layout row wrap>

			<div class="info-card">
				<v-card>
					<div class="card-title pl-3 py-2">{{this.route.name}}</div>
				</v-card>
			</div>

			<div class="info-card">
				<template v-if="route.images.length">
					<carousel-3d border="0" width="500" height="320">
						<template v-for="(image, index) in route.images">
							<slide :key="index" :index="index">
								<img :src="image.name">
							</slide>
						</template>
					</carousel-3d>
				</template>
				<template v-if="!route.images.length">
					<carousel-3d border="0" width="500" height="280">
						<slide :index="0">
							<img :src="noImage">
						</slide>
					</carousel-3d>
				</template>
			</div>

			<div class="info-card">
				<v-card>
					<div class="card-description px-3 py-2"> {{this.route.description}}</div>
				</v-card>
			</div>

			<v-layout row wrap>

				<v-flex lg6 md6 sm12 xs12>
					<div class="info-card info-map">
						<v-card>
							<v-flex class="route-map">
								<iframe frameborder="0" class="frame-map" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAATuCNslc3UeGBCHJ0rJeM2Lu0jwgcc6I
    &q=Space+Needle,Seattle+WA">
								</iframe>
							</v-flex>
						</v-card>
					</div>
				</v-flex>

				<v-flex lg6 md6 sm12 xs12>
					<div class="info-card">
						<v-card>
							<div class="about-container pa-3">
								<v-layout class="about-container__item" row wrap>
									<v-flex class="item__title" xs6> Автор</v-flex>
									<v-flex class="item__description" xs6>
										<v-avatar size="36px" class="hidden-xs-only avatar-image">
											<img :src="route.user.image ? route.user.image : noPhoto" alt="avatar">
										</v-avatar>
										{{ route.user.login }} </v-flex>
								</v-layout>
								<v-divider></v-divider>
								<v-layout class="about-container__item" row wrap>
									<v-flex class="item__title" xs6> Дата добавления</v-flex>
									<v-flex class="item__description" xs6> 12.05.2018 </v-flex>
								</v-layout>
								<v-divider></v-divider>
								<v-layout class="about-container__item" row wrap>
									<v-flex class="item__title" xs6> Длина маршрута</v-flex>
									<v-flex class="item__description" xs6> {{ this.route.length }} км </v-flex>
								</v-layout>
								<v-divider></v-divider>
								<v-layout class="about-container__item" row wrap>
									<v-flex class="item__title" xs6> Тип маршрута</v-flex>
									<v-flex class="item__description" xs6> {{ routeTypes.find(x => x.value === this.route.type).text}} </v-flex>
								</v-layout>
								<v-divider></v-divider>
								<v-layout class="about-container__item" row wrap>
									<v-flex class="item__title" xs6> Ландшафт местности</v-flex>
									<v-flex class="item__description" xs6> {{ routeLandscapes.find(x => x.value === this.route.landscape).text}} </v-flex>
								</v-layout>
								<v-divider></v-divider>
								<v-layout class="about-container__item" row wrap>
									<v-flex class="item__title" xs6> Протяженность времени</v-flex>
									<v-flex class="item__description" xs6> {{ lengthTimes.find(x => x.value === this.route.lengthTime).text}} </v-flex>
								</v-layout>
								<v-divider></v-divider>
								<v-layout class="about-container__item mt-2" row wrap>
									<v-flex xs4 class="stats-count">
										<v-layout justify-center>
											<v-icon class="stats-icon">mdi-eye</v-icon>&nbsp; {{ route.viewsCount }}
										</v-layout>
									</v-flex>
									<v-flex xs4>
										<v-layout justify-center align-center>
											<v-btn v-if="isUserAuthenticated()" icon @click="handleLike(route.id)" v-bind:class="{ 'btn-liked': route.isLiked }">
												<v-icon>favorite</v-icon>
											</v-btn>
											<span class="likes-count"> {{ route.likesCount }} </span>
										</v-layout>
									</v-flex>
									<v-flex xs4>
										<v-layout justify-center>
											<v-menu bottom right offset-y>
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
										</v-layout>
									</v-flex>
								</v-layout>
							</div>
						</v-card>
					</div>
				</v-flex>

			</v-layout>

			<div class="info-card">
				<v-card>
					<div class="card-comments__title px-3 py-2"> Комментарии: </div>
				</v-card>
			</div>

		</v-layout>
	</v-container>
	<v-card-text v-else class="progress-loading">
		<v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="indigo"></v-progress-circular>
	</v-card-text>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import { Carousel3d, Slide } from 'vue-carousel-3d';
import noImage from '../../assets/static/images/no-image.png';
import noPhoto from '../../assets/static/images/no-photo.jpg';
import AuthService from '@/services/AuthService';

export default {
  name: 'route-info',
  components: {
    Carousel3d,
    Slide,
  },
  data() {
    return {
      loading: false,
      noImage: noImage,
      noPhoto: noPhoto,
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
  created() {
    this.loading = true;
    this.$store.dispatch('fetchRoute', this.$route.params.id).then(() => {
      this.loading = false;
    });
  },
  computed: {
    ...mapGetters({
      route: 'getCurrentRoute',
    }),
  },
  methods: {
    handleLike() {
      this.$store.dispatch('likeRoute', {
        routeId: this.route.id,
        likeType: 1,
      });
    },
    isUserAuthenticated() {
      return AuthService.isUserAuthenticated();
    },
  },
};
</script>

<style scoped>
.info-container {
  max-width: 1150px;
  padding: 0px;
}

.info-card {
  width: 100%;
  padding: 0px 8px 24px 8px;
}

.info-card:first-child {
  padding-top: 20px;
}

.card-title {
  font-size: 32px;
  font-weight: 400;
}

.card-description {
  font-size: 18px;
}

.route-map {
  flex: 1 1 auto;
  display: flex;
  max-height: 530px;
	height: 50vw;
}

.info-map {
  padding-left: 10px !important;
  padding-right: 10px !important;
}

.frame-map {
  border: 0;
  width: 96vw;
  max-width: 600px;
}

.about-container {
  font-size: 17px;
}

.about-container__item {
  padding: 23px 0 23px;
  align-items: center;
}

.about-container__item:last-child {
  padding: 0px;
}

.about-container__item > .item__title {
  font-weight: 500;
}

.about-container__item > .item__description {
  padding-left: 15px;
}

.avatar-image {
  padding-right: 5px;
}

.stats-icon {
  font-size: 23px;
}

.stats-count {
  display: flex;
  align-items: center;
  font-size: 19px;
  font-weight: 200;
}

.likes-count {
  font-size: 18px;
}

.btn-liked {
  color: red;
}

.card-comments__title {
  font-size: 26px;
}

@media (max-width: 960px) {
  .frame-map {
    max-width: 960px;
  }
}
  @media (min-width: 961px) {
    .route-map {
      height: 531px;
    }
}
</style>
