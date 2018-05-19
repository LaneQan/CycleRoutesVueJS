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
									<v-flex xs6>
										<v-avatar size="36px" class="hidden-xs-only avatar-image">
											<img :src="route.user.image ? route.user.image : noPhoto" alt="avatar">
										</v-avatar>
										{{ route.user.login }} </v-flex>
								</v-layout>
								<v-layout class="about-container__item" row wrap>
									<v-flex class="item__title" xs6> Дата добавления</v-flex>
									<v-flex class="item__description" xs6> 12.05.2018 </v-flex>
								</v-layout>
								<v-layout class="about-container__item" row wrap>
									<v-flex class="item__title" xs6> Длина маршрута</v-flex>
									<v-flex class="item__description" xs6> {{ this.route.length }} км </v-flex>
								</v-layout>
								<v-layout class="about-container__item" row wrap>
									<v-flex class="item__title" xs6> Тип маршрута</v-flex>
									<v-flex class="item__description" xs6> {{ routeTypes.find(x => x.value === this.route.type).text}} </v-flex>
								</v-layout>
								<v-layout class="about-container__item" row wrap>
									<v-flex class="item__title" xs6> Ландшафт местности</v-flex>
									<v-flex class="item__description" xs6> {{ routeLandscapes.find(x => x.value === this.route.landscape).text}} </v-flex>
								</v-layout>
								<v-layout class="about-container__item" row wrap>
									<v-flex class="item__title" xs6> Протяженность по времени</v-flex>
									<v-flex class="item__description" xs6> {{ lengthTimes.find(x => x.value === this.route.lengthTime).text}} </v-flex>
								</v-layout>
								<v-layout class="about-container__item" row wrap>
									<v-flex xs4> TODO views</v-flex>
									<v-flex xs4> TODO buttons (like) </v-flex>
									<v-flex xs4> TODO buttons (share) </v-flex>
								</v-layout>
							</div>
						</v-card>
					</div>
				</v-flex>
			</v-layout>
		</v-layout>
	</v-container>
	<v-card-text v-else class="progress-loading">
		<v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="indigo"></v-progress-circular>
	</v-card-text>
</template>


<script>
import { mapGetters } from 'vuex';
import { Carousel3d, Slide } from 'vue-carousel-3d';
import noImage from '../../assets/static/images/no-image.png';
import noPhoto from '../../assets/static/images/no-photo.jpg';
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
  height: 50vw;
  max-height: 600px;
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
  height: 70px;
  align-items: center;
}

.about-container__item > .item__title {
  font-weight: 500;
}

.about-container__item > .item__description {
    padding-left: 5px;
}
.avatar-image {
  padding-right: 5px;
}

</style>
