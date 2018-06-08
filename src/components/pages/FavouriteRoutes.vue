<template>
    <div v-if="!loading" class="cards-container">
        <template v-for="route in routes">
            <route-card v-bind:key="route.id" :route="route">
            </route-card>
        </template>
    </div>
    <v-card-text v-else class="progress-loading">
        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="indigo"></v-progress-circular>
    </v-card-text>
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
      loading: false,
    };
  },
  created() {
    this.loading = true;
    this.$store.dispatch('fetchFavouriteRoutes', this.userId).then(() => {
      this.loading = false;
    });
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
