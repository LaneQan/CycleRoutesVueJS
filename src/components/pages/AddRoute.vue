<template>
  <v-form v-if="!loading" ref="form" lazy-validation>
    <v-container class="info-container">
      <v-layout row wrap>
        <div class="info-card">
          <v-card>
            <div class="card-title px-3 pt-1">
              <v-text-field v-model="routeName" :rules="fieldsRules" label="Название маршрута"></v-text-field>
            </div>
          </v-card>
        </div>
        <div class="info-card">
          <v-card>
            <div class="card-upload">
              <vue-dropzone ref="dropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-removed-file="fileRemoved" @vdropzone-canceled="fileRemoved" @vdropzone-file-added="fileAdded">
              </vue-dropzone>
            </div>
          </v-card>
        </div>
        <div class="info-card">
          <v-card>
            <div class="card-description px-3 pt-1">
              <v-text-field v-model="routeDescription" :rules="fieldsRules" multi-line label="Описание маршрута"></v-text-field>
            </div>
          </v-card>
        </div>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="info-card info-map">
              <v-card>
                <v-flex class="route-map" ref="routeMap">

                </v-flex>
              </v-card>
            </div>
          </v-flex>
          <v-flex xs12>
            <div class="info-card">
              <v-card>
                <div class="about-container px-3 pt-1 pb-3">
                  <v-layout class="about-container__item" row wrap>
                    <v-flex class="item__title" xs6> Длина маршрута</v-flex>
                    <v-flex class="item__description" xs6> {{ routeLength ? routeLength : 0 }} км </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout class="about-container__item" row wrap>
                    <v-flex class="item__title" xs6> Тип маршрута</v-flex>
                    <v-flex class="item__description" xs6>
                      <v-select v-model="type" :rules="rules" :items="routeTypes" label="Тип маршрута" single-line class="type-select"></v-select>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout class="about-container__item" row wrap>
                    <v-flex class="item__title" xs6> Ландшафт местности</v-flex>
                    <v-flex class="item__description" xs6>
                      <v-select v-model="landscape" :rules="rules" :items="routeLandscapes" label="Тип" single-line class="type-select"></v-select>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout class="about-container__item" row wrap>
                    <v-flex class="item__title" xs6> Направленность маршрута</v-flex>
                    <v-flex class="item__description" xs6>
                      <v-select v-model="lineType" :rules="rules" :items="routeLineTypes" label="Направленность" single-line class="type-select"></v-select>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout class="about-container__item" row wrap>
                    <v-flex class="item__title" xs6> Протяженность времени</v-flex>
                    <v-flex class="item__description" xs6>
                      <v-select v-model="lengthTime" :rules="rules" :items="lengthTimes" label="Время маршрута" single-line class="type-select"></v-select>
                    </v-flex>
                  </v-layout>
                </div>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </v-layout>
      <v-layout justify-end>
        <v-btn type="submit" large color="primary" @click="addRoute">Добавить маршрут</v-btn>
      </v-layout>
    </v-container>
  </v-form>
  <v-card-text v-else class="progress-loading">
    <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="indigo"></v-progress-circular>
  </v-card-text>
</template>


<script>
import { mapGetters } from 'vuex';
import vue2Dropzone from 'vue2-dropzone';
import JSON from 'circular-json';

export default {
  name: 'add-route',
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 240,
        addRemoveLinks: true,
        maxFilesize: 1,
        dictDefaultMessage: 'Переместите фото для загрузки',
        dictCancelUpload: 'Отменить загрузку',
        dictRemoveFile: 'Удалить фото',
        headers: { 'My-Awesome-Header': 'header value' },
      },
      lineType: -1,
      type: -1,
      landscape: -1,
      lengthTime: -1,
      rules: [value => value !== -1 || 'Выберите нужный вариант'],
      fieldsRules: [value => !!value || 'Заполните нужное поле'],
      poly: null,
      map: null,
      routeLength: 0,
      routeName: '',
      routeDescription: '',
      files: [],
      loading: false,
    };
  },
  mounted() {
    this.initMap();
  },
  computed: {},
  methods: {
    addRoute() {
      if (this.$refs.form.validate()) {
        if (this.routeLength !== 0) {
          let form = new FormData();
          if (this.files.length) {
            this.files.forEach(file => {
              form.append('file', file, file.name);
            });
          }
          form.append('RouteName', this.routeName);
          form.append('RouteDescription', this.routeDescription);
          form.append('Length', this.routeLength);
          form.append('Landscape', this.landscape);
          form.append('Type', this.type);
          form.append('LineType', this.lineType);
          form.append('LengthTime', this.lengthTime);
          form.append('MapLink', this.exportGeoJson());

          this.loading = true;

          this.$store.dispatch('addRoute', form).then(() => {
            this.loading = false;
            this.$router.push('/');
          });
        } else alert('Не выбраны точки на карте!');
      }
    },
    initMap() {
      this.map = new google.maps.Map(this.$refs.routeMap, {
        zoom: 9,
        center: { lat: 53.8840092, lng: 27.5796476 },
      });

      this.poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      this.poly.setMap(this.map);

      this.map.addListener('click', this.addLatLng);
    },
    addLatLng(event) {
      const path = this.poly.getPath();

      path.push(event.latLng);

      const marker = new google.maps.Marker({
        position: event.latLng,
        title: 'Маркер ' + path.getLength(),
        map: this.map,
      });

      this.routeLength =
        Math.round(
          google.maps.geometry.spherical.computeLength(
            this.poly.getPath().getArray(),
          ) / 10,
        ) / 100;
    },
    exportGeoJson() {
      let geoJson = {
        type: 'FeatureCollection',
        features: [],
      };
      let polylineFeature = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [],
        },
      };
      for (let i = 0; i < this.poly.getPath().getLength(); i++) {
        let pt = this.poly.getPath().getAt(i);
        polylineFeature.geometry.coordinates.push([pt.lng(), pt.lat()]);
      }
      geoJson.features.push(polylineFeature);
      return JSON.stringify(geoJson);
    },
    fileAdded(file) {
      this.files.push(file);
    },
    fileRemoved(file) {
      const index = this.files.findIndex(x => x.upload.uuid === file.upload.uuid);
      if (index !== -1) this.files.splice(index, 1);
    },
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
  padding: 0px 8px 24px 8px;
}

.info-card:first-child {
  padding-top: 20px;
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
  max-height: 530px;
}

.info-map {
  padding-left: 10px !important;
  padding-right: 10px !important;
}

.frame-map {
  border: 0;
  width: 100%;
}

.info-map {
  padding-left: 10px !important;
  padding-right: 10px !important;
}

.about-container {
  font-size: 17px;
}

.about-container__item {
  padding: 16px 0 16px;
  align-items: center;
}

.about-container__item:last-child {
  padding-bottom: 0px;
}

.about-container__item > .item__title {
  font-weight: 500;
}

.about-container__item > .item__description {
  padding-left: 15px;
}

.type-select {
  padding-top: 0px !important;
}

.type-select >>> .input-group__details {
  min-height: 12px !important;
}

.vue-dropzone {
  min-height: 400px;
}

.vue-dropzone >>> .dz-message {
  padding-top: 120px !important;
}
</style>
