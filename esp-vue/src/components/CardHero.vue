<template>
  <div
    id="hero"
    class="card border rounded border-primary zener-card m-3 shadow shadow-lg"
    @click="handle(index)"
  >
    <div class="card-body" :class="{ cardBack: !!card.isBack }">
      <img
        class="card-img"
        v-show="!card.isBack"
        :src="card.src"
        :alt="card.alt"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: [`card`, `show`],
  name: `CardHero`,
};

// TODO: handle case where user is correct
// TODO: handle case where user is wrong
</script>
<style lang="scss">
#hero {
  &.zener-card {
    width: 200px !important;
    height: 300px !important;
    transition: 1s linear;

    .card-img {
      padding-right: 35px;
    }
  }

  &.wrong {
    border: 3px solid red !important;
    box-shadow: 0 0 4rem red !important;
  }

  &.correct {
    border: 3px solid green !important;
    box-shadow: 0 0 4rem green !important;
  }
}

.cardBack {
  background: radial-gradient(circle, #24246e, #06051f);
}
</style>
