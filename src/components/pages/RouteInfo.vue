<template>
    <v-container class="info-container">
        <v-layout row wrap>
            <div class="info-card">
                <v-card>
                    <div class="card-title pl-3 py-2">Card title</div>
                </v-card>
            </div>
            <div class="info-card">
                <v-card>
                    slider
                </v-card>
            </div>
            <div class="info-card">
                <v-card>
                    <div class="card-title pl-3 py-2"> Description</div>
                </v-card>
            </div>
            <v-layout row wrap>
                <v-flex xs6>
                    <div class="info-card">
                        <v-card>
                            <v-flex class="info-google-map">
                            <iframe height="700" width="700" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAATuCNslc3UeGBCHJ0rJeM2Lu0jwgcc6I
    &q=Space+Needle,Seattle+WA" >
                            </iframe>
                            </v-flex>
                        </v-card>
                    </div>
                </v-flex>
                <v-flex xs6>
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
export default {
    name: 'route-info',
    data() {
        return {};
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
    font-size: 26px;
}

.info-google-map {
    flex: 1 1 auto;
    display: flex; 
}
</style>
