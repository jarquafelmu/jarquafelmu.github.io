<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Container msg="Coming soon..." />
  </div>
</template>

<script>
import Container from "./components/Container.vue";
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  meta: {
    title: "ESP",
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
