<template>
  <div id="app">
    <v-app>
      <NavBarComponent />
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  import NavBarComponent from "@/components/common/nav-bar.component";

  export default {
    name: "App",
    components: {
      NavBarComponent
    },
  };
</script>