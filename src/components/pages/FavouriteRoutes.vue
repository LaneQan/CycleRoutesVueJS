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
import CycleRouteCard from '@/components/common/card.component';
import NavBar from '@/components/common/nav-bar.component';
export default {
    name: 'favourite-routes',
    components: {
        'route-card': CycleRouteCard,
    },
    data() {
        return {
        };
    },
};
</script>

<style scoped>
</style>
