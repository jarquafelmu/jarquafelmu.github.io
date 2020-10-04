<template>
  <div>
    <div class="border rounded border-primary zener-card">
      <div class="card-body">
        <img
          class="card-img"
          src="../assets/cards/square.svg"
          alt="a square card"
        />
      </div>
    </div>
    <div class="border rounded border-primary zener-card">
      <div class="card-body">
        <img
          class="card-img"
          src="../assets/cards/circle.svg"
          alt="a circle card"
        />
      </div>
    </div>
    <div class="border rounded border-primary zener-card">
      <div id="card-body" class="card-body">
        <img
          class="card-img"
          src="../assets/cards/star.svg"
          alt="a star card"
        />
      </div>
    </div>
    <div class="border rounded border-primary zener-card">
      <div class="card-body">
        <img
          class="card-img"
          src="../assets/cards/waves.svg"
          alt="a waves card"
        />
      </div>
    </div>
    <div class="border rounded border-primary zener-card">
      <div class="card-body">
        <img
          class="card-img"
          src="../assets/cards/plus.svg"
          alt="a plus card"
        />
      </div>
    </div>it was 
  </div>
</template>
<script>
export default {
  props: ["cards"],
  name: "Cards",
};
</script>
