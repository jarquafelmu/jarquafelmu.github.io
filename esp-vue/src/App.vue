<template>
  <div id="app">
    <Manager msg="Coming soon..." />
  </div>
</template>

<script>
import Manager from "./components/Manager.vue";

export default {
  name: "App",
  meta: {
    title: "ESP",
  },
  data() {
    return {
      colorScheme: {
        enableDarkMode: false,
      },
      devicePreferences: {
        scheme: null,
        motion: null,
      },
      cookieSettings: {
        scheme: null,
        motion: null,
      },
    };
  },
  components: {
    Manager,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  margin-top: 60px;
}
</style>
