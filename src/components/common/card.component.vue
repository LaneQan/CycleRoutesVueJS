<template>
  <div class="route-card">
    <v-card>
      <v-card-media class="route-card__image" v-bind:src="image" @click="routeInfo(id)">
      </v-card-media>
      <v-card-title class="route-card__title" primary-title @click="routeInfo(id)">
        <div>
          <div class="headline">{{ name }}</div>
          <span class="grey--text">{{ length }} км</span>
        </div>
      </v-card-title>
      <v-card-actions>
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
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'card',
    props: ['id', 'image', 'name', 'length', 'description'],
    data() {
      return {
        showDescription: false
      };
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

<style scoped>
  .route-card {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .route-card > .card {
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