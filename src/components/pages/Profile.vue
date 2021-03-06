<template>
  <v-container v-if="!loading" class="main-container">
    <div class="profile-container">
      <div v-if="!uploading" class="profile-card">
        <div class="photo-card__photo">
          <v-layout row>
            <v-flex pt-3 xs12 align-center justify-center text-xs-center>
              <input type="file" @change="onChangePhoto" ref="file" style="display:none" accept=".png, .jpg, .jpeg" />
              <v-avatar size="260px" class="px-2 pb-3">
                <img :src="userInfo.image ? userInfo.image : noPhoto">
              </v-avatar>
              <v-layout v-if="isMyProfile()" py-3 row wrap align-center justify-center>
                <v-btn v-if="!editMode" color="primary" class="info__btn" @click="dialogEditPhoto=true">Редактировать фотографию</v-btn>
                <v-btn v-if="!editMode" color="primary" class="info__btn" @click="editMode=true">Редактировать профиль</v-btn>
                <v-btn v-if="editMode" color="primary" class="info__btn" @click="saveProfile">Сохранить изменения</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
      </div>
      <v-card-text v-else class="progress-loading">
        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="indigo"></v-progress-circular>
      </v-card-text>
      <div class="profile-card">
        <div class="personal-card__info">
          <v-layout row wrap>
            <v-flex xs12 pr-3 pt-2 class="info__register text-xs-right">Дата регистрации: {{ formatDate(userInfo.registeredAt) }}</v-flex>
            <v-layout px-4 class="info-container__name" row wrap>
              <v-flex xs12 class="info__name">{{ `${userInfo.firstname} ${userInfo.lastname}`}}</v-flex>
            </v-layout>
            <v-layout px-4 class="info-container__additional" row wrap>
              <v-flex xs4 class="info__additional info__title">Логин:</v-flex>
              <v-flex xs8 class="info__description">{{ userInfo.login }}</v-flex>
              <v-flex xs4 class="info__additional info__title">Текущий город:</v-flex>
              <v-flex xs8 class="info__description">
                <template v-if="!editMode">
                  {{ userInfo.currentCity ? userInfo.currentCity : '-' }}
                </template>
                <template v-else>
                  <v-text-field class="info-edit" v-model="city"></v-text-field>
                </template>
              </v-flex>
              <v-flex xs4 class="info__additional info__title">Телефон:</v-flex>
              <v-flex xs8 class="info__description">
                <template v-if="!editMode">
                  {{ userInfo.phone ? `+375${userInfo.phone}` : '-' }}
                </template>
                <template v-else>
                  <v-text-field class="info-edit" v-model="phone" mask="(##) ###-##-##" :prefix="getPhone(phone) ? '+375': ''"></v-text-field>
                </template>
              </v-flex>
              <v-flex xs4 class="info__additional info__title">Добавленных маршрутов:</v-flex>
              <v-flex xs8 class="info__description">{{ userInfo.routesCount }}</v-flex>
              <v-flex xs4 class="info__additional info__title">Поставленных лайков:</v-flex>
              <v-flex xs8 class="info__description">{{ userInfo.likesCount }}</v-flex>
            </v-layout>
            <v-layout px-4 class="info-container__about" row wrap>
              <v-flex xs12 class="info__title">О себе:</v-flex>
              <v-flex xs12 class="about__description">
                <template v-if="!editMode">
                  {{ userInfo.about ? userInfo.about : 'Нет информации' }}
                </template>
                <template v-else>
                  <v-text-field class="info-edit" v-model="about" multi-line></v-text-field>
                </template>
              </v-flex>
            </v-layout>
          </v-layout>
        </div>
      </div>
    </div>
    <div class="routes-container">
      <div class="routes-title"> Маршруты пользователя </div>
      <div class="cards-container">
        <template v-for="route in routes">
          <route-card v-bind:key="route.id" :route="route">
          </route-card>
        </template>
      </div>
    </div>
    <add-photo ref="modal" v-if='dialogEditPhoto' @addPhoto="choosePhoto" @savePhoto="savePhoto" @delete="deletePhoto" @cancel="dialogEditPhoto=false"></add-photo>
  </v-container>
  <v-card-text v-else class="progress-loading">
    <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="indigo"></v-progress-circular>
  </v-card-text>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CycleRouteCard from '@/components/common/card.component';
import noPhoto from '../../assets/static/images/no-photo.jpg';
import AddPhoto from '@/components/common/add-photo';

import moment from 'moment';

export default {
  name: 'profile',
  components: {
    'route-card': CycleRouteCard,
    'add-photo': AddPhoto,
  },
  data() {
    return {
      noPhoto: noPhoto,
      loading: false,
      uploadingPhoto: null,
      dialogEditPhoto: false,
      uploading: false,
      editMode: false,
      city: '',
      phone: '',
      about: '',
    };
  },
  created() {
    this.loading = true;
    const userId = this.$router.history.current.params.id
      ? this.$router.history.current.params.id
      : this.userId;
    this.$store.dispatch('fetchInfo', userId).then(() => {
      this.$store.dispatch('fetchUserRoutes', userId).then(() => {
        this.loading = false;
        this.city = this.userInfo.currentCity;
        this.phone = this.userInfo.phone;
        this.about = this.userInfo.about;
      });
    });
  },
  computed: {
    ...mapGetters({
      routes: 'getRoutes',
      userId: 'getUserId',
      userInfo: 'getUserInfo',
    }),
    srcPhoto() {
      return this.userInfo.image ? this.userInfo.image : noPhoto;
    },
  },
  methods: {
    ...mapActions(['setUploadingPhoto']),
    formatDate(date) {
      return moment(date).format('DD.MM.YYYY');
    },
    isMyProfile() {
      return this.$router.history.current.path === '/my-profile';
    },
    uploadPhotoAndSave() {
      this.$store.dispatch('uploadPhoto', this.uploadingPhoto).then(
        res => {
          this.$store.dispatch('editEmployeePhotoUrl', res.body).then(
            res => {
              if (this.$route.name === 'EmployeeEdit') {
                this.saveEmployee();
              } else if (this.$route.name === 'EmployeeAddNew') {
                this.createEmployee();
              }
            },
            err => {
              this.success = true;
              this.saving = false;
              this.content = {
                title: 'Error',
                errorText: "Can't edit the photo url",
              };
            },
          );
        },
        err => {
          this.success = true;
          this.saving = false;
          this.content = {
            title: 'Error',
            errorText: "Can't upload the photo",
          };
        },
      );
    },
    handleFiles(files) {
      if (!files || !files[0]) {
        return;
      }
      let reader = new FileReader();
      reader.onload = this.onPhotoLoaded;
      this.setUploadingPhoto(files[0]);
      reader.readAsDataURL(files[0]);
    },
    onPhotoLoaded(e) {
      this.$refs.modal._data.photoPreview = e.target.result;
    },
    onChangePhoto(event) {
      this.handleFiles(event.target.files);
    },
    deletePhoto() {
      this.uploadingPhoto = null;
      this.$store.dispatch('deleteImage', this.userId);
    },
    choosePhoto() {
      this.$refs.file.click();
    },
    savePhoto() {
      this.dialogEditPhoto = false;
      this.uploadingPhoto = this.$refs.modal._data.photoPreview;
      let form = new FormData();

      let binary = atob(this.$refs.modal._data.photoPreview.split(',')[1]);
      let array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      const userPhoto = new Blob([new Uint8Array(array)], {
        type: 'image/jpeg',
      });
      form.append('file', userPhoto, this.$refs.modal._data.photoPreview.name);
      form.append('UserId', this.userId);
      this.uploading = true;
      this.$store
        .dispatch('uploadImage', form)
        .then(() => (this.uploading = false));
    },
    showDialog() {
      this.dialogEditPhoto = true;
    },
    getPhone(number) {
      return number ? number.replace('+375', '') : '';
    },
    saveProfile() {
      const payload = {
        About: this.about,
        Phone: this.phone,
        CurrentCity: this.city,
        Id: this.userId,
      };
      this.$store.dispatch('editInfo', payload).then(() => this.editMode = false);
    },
  },
};
</script>

<style scoped>
.main-container {
  max-width: 1150px;
  padding: 20px;
}

.profile-container {
  display: grid;
  grid-template-columns: 4fr 8fr;
  grid-gap: 20px;

  padding-bottom: 20px;
}

.routes-container {
  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  background-color: white;
}

.routes-title {
  font-size: 24px;
  font-weight: 300;

  padding-left: 20px;
  padding-top: 16px;
}

.profile-card {
  -webkit-box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  background-color: white;
}

.info__name {
  font-size: 32px;
  font-weight: 500;
}

.info__additional {
  padding-bottom: 12px;
}

.info-container__additional {
  padding-top: 8px;
  border-bottom: 1px solid #e7e8ec;
}

.info-container__name {
  border-bottom: 1px solid #e7e8ec;
}

.info-container__about {
  padding-top: 8px;
}

.info__register {
  font-size: 12px;
  font-weight: 100;
}

.info__description {
  font-weight: 500;
  padding-left: 8px;
}

.info__title {
  color: #828282;
}

.info__btn {
  width: 250px;
}

.about__description {
  padding-bottom: 8px;
}

.info-edit >>> input {
  font-weight: 500;
  font-size: 14px;
}

.info-edit >>> .input-group__details {
  min-height: 7px !important;
}

.info-edit {
  padding: 0px !important;
}

@media (max-width: 757px) {
  .profile-container {
    grid-template-columns: 1fr;
  }
}
</style>