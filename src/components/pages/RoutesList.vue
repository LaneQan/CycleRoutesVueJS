<template>
	<div class="card-content">
		<template v-for="route in filterRoutes">
			<route-card v-bind:key="route.id" :route="route" :showFavorite="true" :showBookmark="true">
			</route-card>
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CycleRouteCard from '@/components/common/card.component';
import NavBar from '@/components/common/nav-bar.component';
export default {
    name: 'routes-list',
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
            this.$store.dispatch(
                'editMaxLength',
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
            let filteredRoutes = this.routes;
            if (this.filters.type != -1) {
                filteredRoutes = filteredRoutes.filter(
                    x => x.type === this.filters.type,
                );
            }
            if (this.filters.lineType != -1) {
                filteredRoutes = filteredRoutes.filter(
                    x => x.lineType === this.filters.lineType,
                );
            }
            filteredRoutes = filteredRoutes.filter(
                x =>
                    x.length >= this.filters.minLength &&
                    x.length <= this.filters.maxLength,
            );
            return filteredRoutes;
        },
    },
    methods: {},
};
</script>

<style scoped>

</style>
