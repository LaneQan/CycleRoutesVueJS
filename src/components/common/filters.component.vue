<template>
  <div class="filters-container">
    <div class="filter-item">
      <h4 class="filter-item__title"> Длина маршрута </h4>
      <v-layout class="filter-input" row wrap>
        <v-flex xs6>
          <v-text-field v-model="filters.minLength" solo label="От"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="filters.maxLength" solo label="До"></v-text-field>
        </v-flex>
      </v-layout>
    </div>
    <div class="filter-item">
      <h4 class="filter-item__title"> Тип маршрута </h4>
      <v-layout class="filter-select" row wrap>
        <v-select v-model="filters.type" class="input-group--focused" :items="routeTypes" label="Тип маршрута" single-line></v-select>
      </v-layout>
    </div>
    <div class="filter-item">
      <h4 class="filter-item__title"> Направленность маршрута </h4>
      <v-layout class="filter-select" row wrap>
        <v-select v-model="filters.lineType" class="input-group--focused" :items="routeLineTypes" label="Направленность" single-line></v-select>
      </v-layout>
    </div>
    <div class="filter-item">
      <h4 class="filter-item__title"> Ландшафт местности </h4>
      <v-layout class="filter-select" row wrap>
        <v-select v-model="filters.landscape" class="input-group--focused" :items="routeLandscapes" label="Тип" single-line></v-select>
      </v-layout>
    </div>
        <div class="filter-item">
      <h4 class="filter-item__title"> Протяженность по времени </h4>
      <v-layout class="filter-select" row wrap>
        <v-select v-model="filters.lengthTime" class="input-group--focused" :items="lengthTimes" label="Время маршрута" single-line></v-select>
      </v-layout>
    </div>
    <div class="filter-item">
      <v-layout class="filter-clear" row wrap justify-center>
        <v-btn @click="clearFilters" color="primary">Очистить фильтры</v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'filters',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      filters: 'getFilters',
    }),
  },
  methods: {
    clearFilters() {
      this.$store.dispatch('clearFilters').then(() => {
        this.$store.dispatch(
          'editMaxLength',
          Math.max.apply(
            Math,
            this.$store.getters.getRoutes.map(x => x.length),
          ),
        );
      });
    },
  },
};
</script>

<style scoped>
.filter-item {
  width: 100%;
}

.filter-item:first-child {
  padding-top: 15px;
}

.filter-item:not(:last-child) {
  padding-bottom: 15px;
}

.filter-item__title {
  padding-left: 10px;
  padding-bottom: 5px;
}

.filter-input,
.filter-select {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
