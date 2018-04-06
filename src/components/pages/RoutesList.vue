<template>
	<div class="main-content">
		<template v-for="(route,index) in routes">
			<div class="route-card" v-bind:key="route.id">
				<v-card>
					<v-card-media class="route-card__image" v-bind:src="route.image" @click="routeInfo(route.id)">
					</v-card-media>
					<v-card-title class="route-card__title" primary-title @click="routeInfo(route.id)">
						<div>
							<div class="headline">{{ route.name }}</div>
							<span class="grey--text">{{ route.length }} км</span>
						</div>
					</v-card-title>
					<v-card-actions>
						<v-btn icon @click.native="showDescription(index)">
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
    name: 'RoutesList',
    data() {
        return {
            show: false
        };
    },
    created() {
        this.$store.dispatch('fetchRoutes').then(() => {});
    },
    computed: {
        ...mapGetters({
            routes: 'getRoutes'
        })
    },
    methods: {
        routeInfo(routeId) {
            this.$router.push({
                path: `routes/${routeId}`,
                params: {
                    id: routeId
                }
            });
        }
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

.route-card__image,
.route-card__title {
    cursor: pointer;
}
</style>