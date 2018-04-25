<template>
	<div class="card-content">
		<template v-for="route in routes">
			<route-card v-bind:key="route.id" :route="route" :showFavorite="false" :showBookmark="false">
			</route-card>
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CycleRouteCard from '@/components/common/card.component';
export default {
    name: 'my-routes',
    components: {
        'route-card': CycleRouteCard,
    },
    data() {
        return {};
    },
    created() {
        this.$store.dispatch('fetchUserRoutes', this.userId).then(() => {});
    },
    computed: {
        ...mapGetters({
            routes: 'getRoutes',
            userId: 'getUserId',
        }),
    },
};
</script>

<style scoped>
</style>
