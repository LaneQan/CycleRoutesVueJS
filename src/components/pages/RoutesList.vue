<template>
  <div v-if="!loading" class="cards-container">
    <div class="route-card add-card">
      <v-card>
        <v-card-media @click="addRoute" height="455px" :src="addRouteImage" contain>
        </v-card-media>
      </v-card>
    </div>
    <template v-for="route in filterRoutes">
      <route-card v-bind:key="route.id" :route="route" :showFavorite="true" @deleteRoute="deleteRoute">
      </route-card>
    </template>
    <v-dialog v-model="deleteConfirm" persistent max-width="350">
      <v-card>
        <v-card-title class="headline">Подтверждение удаления</v-card-title>
        <v-card-text>Вы точно хотите удалить данный маршрут?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="cancelDelete">Отмена</v-btn>
          <v-btn color="green darken-1" flat @click.native="confirmDelete">Ок</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <v-card-text v-else class="progress-loading">
    <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="indigo"></v-progress-circular>
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex';
import CycleRouteCard from '@/components/common/card.component';
import addRouteImage from '../../assets/static/images/add-route.png';
export default {
  name: 'routes-list',
  components: {
    'route-card': CycleRouteCard,
  },
  data() {
    return {
      loading: false,
      addRouteImage: addRouteImage,
      routeToDelete: {},
      deleteConfirm: false,
    };
  },
  created() {
    this.loading = true;
    this.$store.dispatch('fetchRoutes').then(() => {
      this.$store
        .dispatch(
          'editMaxLength',
          Math.max.apply(Math, this.routes.map(x => x.length)),
        )
        .then(() => (this.loading = false));
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
      if (this.filters.landscape != -1) {
        filteredRoutes = filteredRoutes.filter(
          x => x.landscape === this.filters.landscape,
        );
      }
      if (this.filters.lengthTime != -1) {
        filteredRoutes = filteredRoutes.filter(
          x => x.lengthTime === this.filters.lengthTime,
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
  methods: {
    addRoute() {
      this.$router.push('/add-route');
    },
    confirmDelete() {
      this.$store.dispatch('deleteRoute', this.routeToDelete).then(() => {
        this.routeToDelete = {};
        this.deleteConfirm = false;
      });
    },
    cancelDelete() {
      this.deleteConfirm = false;
      this.routeToDelete = {};
    },
    deleteRoute(route) {
      this.routeToDelete = route;
      this.deleteConfirm = true;
    },
  },
};
</script>

<style scoped>
.add-card {
  cursor: pointer;
}
</style>
