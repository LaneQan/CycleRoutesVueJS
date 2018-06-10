<template>
    <div v-if="!loading" class="cards-container">
        <template v-for="route in routes">
            <route-card v-bind:key="route.id" :route="route" :showDelete="true" @deleteRoute="deleteRoute">
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
export default {
  name: 'my-routes',
  components: {
    'route-card': CycleRouteCard,
  },
  data() {
    return {
      loading: false,
      deleteConfirm: false,
      routeToDelete: {},
    };
  },
  created() {
    this.loading = true;
    this.$store.dispatch('fetchUserRoutes', this.userId).then(() => {
      this.loading = false;
    });
  },
  computed: {
    ...mapGetters({
      routes: 'getRoutes',
      userId: 'getUserId',
    }),
  },
  methods: {
    deleteRoute(route) {
      this.routeToDelete = route;
      this.deleteConfirm = true;
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
  },
};
</script>

<style scoped>
</style>
