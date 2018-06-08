<template>
    <div class="modal">
        <div class="modal-window">
            <v-card>
                <div class="card-photo">
                    <img class="photo__preview" :src="photoPreview">
                </div>
                <template v-if="userHasImage()">
                    <v-divider></v-divider>
                    <v-card-actions class="card-actions">
                        <v-btn flat block @click="onSavePhoto()">Save photo</v-btn>
                    </v-card-actions>
                </template>
                <v-divider></v-divider>
                <v-card-actions class="card-actions">
                    <v-btn flat block @click="onAddPhoto()">{{ userHasImage() ? 'Change photo' : 'Add photo' }}</v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="card-actions">
                    <v-btn flat block @click="onDelete()">Delete photo</v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="card-actions">
                    <v-btn flat block @click="onCancel()">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'modal',
        data() {
            return {
                photoPreview: null,
            }
        },
        created() {
            this.photoPreview = this.$parent.srcPhoto;
        },
        methods: {
            onAddPhoto() {
                this.$emit('addPhoto');
            },
            onDelete() {
                this.$emit('delete');
            },
            onCancel() {
                this.$emit('cancel');
            },
            onSavePhoto() {
                this.$emit('savePhoto')
            },
            userHasImage() {
                return this.photoPreview.indexOf('no-photo') === -1;
            }
        }
    };
</script>
<style scoped>
    .card-photo-title {
        justify-content: center;
        text-align: center;
        font-size: 13px;
        padding-top: 12px;
        padding-bottom: 12px;
    }

    .card-actions>>>.btn__content {
        height: 45px !important;
    }

    .card-actions button {
        margin: 0;
        min-height: 45px;
        font-size: 12px;
        text-transform: none !important;
    }

    .card-actions {
        padding: 0;
        min-height: 30px;
    }

    .modal {
        z-index: 1000;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
    }

    .modal-window {
        z-index: 1100;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
        max-width: 600px;
        background: white;
        color: black;
        text-align: center;
    }

    .photo-preview {
        width: 100%;
    }

    .photo__preview {
        display: block;
        width: 100%;
        height: auto;
        max-height: 600px;
    }

    @media screen and (max-width: 600px) {
        .modal-window {
            max-width: 100%;
            top: 50%;

        }
    }
</style>