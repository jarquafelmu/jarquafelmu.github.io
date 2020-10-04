<template>
  <div class="container">
    <div class="row">
      <div class="col"><h1>Hello Worlds</h1></div>
    </div>
    <div class="row">
      <div class="col">
        <Cards></Cards>
      </div>
    </div>
  </div>
</template>

<script>
import Cards from "./Cards.vue";

export default {
  name: "Container",
  components: {
    Cards,
  },
};
</script>
