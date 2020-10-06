<template>
  <div id="app">
    <Container msg="Coming soon..." />
  </div>
</template>

<script>
import Container from "./components/Container.vue";

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
    Container,
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
