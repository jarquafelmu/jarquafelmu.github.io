<template>
  <div
    id="hero"
    class="card border rounded border-primary zener-card m-3 shadow shadow-lg"
    :class="{ wrong: isWrong, correct: isCorrect }"
    @click="handle(index)"
  >
    <!--
      :class="{ wrong: isWrong, correct: isCorrect }" -->
    <div
      class="card-body"
      :class="{ cardBack: !!card.isBack, wrong: isWrong, correct: isCorrect }"
    >
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
import { bus } from "../main";

export default {
  props: [`card`, `show`],
  name: `CardHero`,
  data() {
    return {
      isWrong: false,
      isCorrect: false,
    };
  },
  created: function () {
    bus.$on(`choiceCorrect`, () => (this.isCorrect = true));
    bus.$on(`choiceWrong`, () => (this.isWrong = true));
    bus.$on(`resetCard`, () => {
      this.isCorrect = false;
      this.isWrong = false;
    });
  },
};
</script>
<style lang="scss">
#hero {
  &.zener-card {
    width: 200px !important;
    height: 300px !important;
    transition: 0.5s linear;

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
