<template>
    <v-container class="info-container">
        <v-layout row wrap>
            <div class="info-card">
                <v-card>
                    <div class="card-title px-3 pt-1">
                        <v-text-field label="Название маршрута"></v-text-field>
                    </div>
                </v-card>
            </div>
            <div class="info-card">
                <v-card>
                    <div class="card-upload">
                        <vue-dropzone ref="dropzone" id="dropzone" :options="dropzoneOptions">
                        </vue-dropzone>
                    </div>
                </v-card>
            </div>
            <div class="info-card">
                <v-card>
                    <div class="card-description px-3 pt-1">
                        <v-text-field multi-line label="Описание маршрута"></v-text-field>
                    </div>
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
import vue2Dropzone from 'vue2-dropzone';

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
        autoProcessQueue: false,
        maxFilesize: 1,
        dictDefaultMessage: 'Переместите фото для загрузки',
        dictCancelUpload: 'Отменить загрузку',
        dictRemoveFile: 'Удалить фото',
        headers: { 'My-Awesome-Header': 'header value' },
      },
    };
  },
  created() {},
  computed: {},
  methods: {
      upload() {
          this.$refs.dropzone.processQueue();
      }
  }
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
  width: 96vw;
}

</style>
