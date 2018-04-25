<template>
    <v-container v-if="route" class="info-container">
        <v-layout row wrap>
            <div class="info-card">
                <v-card>
                    <div class="card-title pl-3 py-2">{{this.route.name}}</div>
                </v-card>
            </div>
            <div class="info-card">
                <template v-if="route.images.length">
                    <carousel-3d width="500" height="320">
                        <template v-for="(image, index) in route.images">
                            <slide :key="index" :index="index">
                                <img :src="image.name">
                            </slide>
                        </template>
                    </carousel-3d>
                </template>
                <template v-if="!route.images.length">
                    <carousel-3d width="500" height="280">
                        <slide :index="0">
                            <img :src="noImage">
                        </slide>
                    </carousel-3d>
                </template>
            </div>
            <div class="info-card">
                <v-card>
                    <div class="card-description px-3 py-2"> {{this.route.description}}</div>
                </v-card>
            </div>
            <v-layout row wrap>
                <v-flex lg6 md6 sm12 xs12>
                    <div class="info-card info-map">
                        <v-card>
                            <v-flex class="route-map">
                                <iframe frameborder="0" class="frame-map" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAATuCNslc3UeGBCHJ0rJeM2Lu0jwgcc6I
    &q=Space+Needle,Seattle+WA">
                                </iframe>
                            </v-flex>
                        </v-card>
                    </div>
                </v-flex>
                <v-flex lg6 md6 sm12 xs12>
                    <div class="info-card">
                        <v-card>
                            <div class="card-title pl-3 py-2"> Info </div>
                        </v-card>
                    </div>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>


<script>
import { mapGetters } from 'vuex';
import { Carousel3d, Slide } from 'vue-carousel-3d';
import noImage from '../../assets/images/static/no-image.png';
export default {
    name: 'route-info',
    components: {
        Carousel3d,
        Slide,
    },
    data() {
        return {
            noImage: noImage
        };
    },
    created() {
        this.$store.dispatch('fetchRoute',this.$route.params.id).then(() => {
        });
    },
    computed: {
        ...mapGetters({
            route: 'getCurrentRoute',
        }),
    },
};
</script>

<style scoped>
.info-container {
    max-width: 1150px;
    padding: 0px;
}
.info-card {
    width: 100%;
    padding: 16px 8px 0px 8px;
}

.card-title {
    font-size: 32px;
}

.card-description {
    font-size: 18px;
}

.route-map {
    flex: 1 1 auto;
    display: flex;
    height: 50vw;
    max-height: 600px;
}

.info-map {
    padding-left: 10px !important;
    padding-right: 10px !important;
}

.frame-map {
    border: 0;
    width: 96vw;
    max-width: 600px;
}
</style>
