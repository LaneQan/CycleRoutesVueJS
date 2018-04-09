<template>
	<div class="main-content">
		<template v-for="route in filterRoutes">
			<route-card :id="route.id" :name="route.name" :image="route.image" :length="route.length" :description="route.description">
			</route-card>
		</template>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import CycleRouteCard from '@/components/common/routecard.component';
	import NavBar from '@/components/common/nav-bar.component';
	export default {
		name: 'RoutesList',
		components: {
			'route-card': CycleRouteCard,
		},
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
				routes: 'getRoutes'
			}),
			filterRoutes() {
				return this.routes.filter(x => x.length > NavBar.data().firstLength);
			}
		},
		methods: {
		}
	};
</script>

<style>
	.main-content {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		grid-gap: 20px;
		padding: 20px;
	}
</style>