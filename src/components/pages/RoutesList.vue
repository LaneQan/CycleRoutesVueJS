<template>
	<div class="main-content">
		<template v-for="route in filterRoutes">
			<route-card v-bind:key="route.id" :id="route.id" :name="route.name" :image="route.image" :length="route.length" :description="route.description">
			</route-card>
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CycleRouteCard from '@/components/common/route-card.component';
import NavBar from '@/components/common/nav-bar.component';
export default {
    name: 'RoutesList',
    components: {
        'route-card': CycleRouteCard,
    },
    data() {
        return {
            show: false,
        };
    },
    created() {
        this.$store.dispatch('fetchRoutes').then(() => {
            this.$store.commit(
                'filters/FILTER_EDIT_MAX_LENGTH',
                Math.max.apply(Math, this.routes.map(x => x.length)),
            );
        });
    },
    computed: {
        ...mapGetters({
            routes: 'getRoutes',
            filters: 'getFilters',
        }),
        filterRoutes() {
            return this.routes.filter(
                x =>
                    x.length > this.filters.minLength &&
                    x.length < this.filters.maxLength,
            );
        },
    },
    methods: {},
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
