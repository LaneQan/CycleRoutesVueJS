<template>
	<div class="main-content">
		<template v-for="route in routes">
			<div class="route-card"> 
				<v-card>
					<v-card-media class="route-card__image" src="https://stat.citydog.by/content/_posts/442X361/5968b27883970.jpg">
					</v-card-media>
					<v-card-title primary-title>
						<div>
							<div class="headline">{{ route.name }}</div>
							<span class="grey--text">25 км</span>
							<span class="grey--text">Сложный</span>
						</div>
					</v-card-title>
					<v-card-actions>
						<v-btn icon @click.native="show = !show">
							<v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn icon>
							<v-icon>favorite</v-icon>
						</v-btn>
						<v-btn icon>
							<v-icon>bookmark</v-icon>
						</v-btn>
						<v-btn icon>
							<v-icon>share</v-icon>
						</v-btn>
					</v-card-actions>
					<v-slide-y-transition>
						<v-card-text v-show="show">
							{{ route.description }}
						</v-card-text>
					</v-slide-y-transition>
				</v-card>
			</div>
		</template>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: "RoutesList",
		data() {
			return {
				show: false
			};
		},
		created() {
			this.$store.dispatch('fetchRoutes').then(() => { });
		},
		computed: {
			...mapGetters({
				routes: 'getRoutes',
			}),
		},
	};
</script>

<style>
	.main-content {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		grid-gap: 20px;
		padding: 20px;
	}

	.route-card {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.card {
		width: 100%;
		max-width: 370px;
	}
	
	.route-card__image {
		height: 300px !important;
	}
</style>