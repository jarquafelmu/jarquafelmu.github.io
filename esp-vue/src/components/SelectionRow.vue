<template>
  <div
    id="btn-row"
    class="col-auto d-flex justify-content-center text-center m-auto"
  >
    <div
      class="card border rounded border-primary zener-card m-1 shadow"
      :class="{ pause: pause }"
      v-for="(card, index) in cards"
      :key="card.id"
      v-show="!card.isBack"
      @click="choice(index)"
    >
      <div class="card-body">
        <img class="card-img" :src="card.src" :alt="card.alt" />
      </div>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";
export default {
  props: [`cards`],
  name: `SelectionRow`,
  data() {
    return {
      hover: false,
      pause: false,
    };
  },
  created: function () {
    bus.$on(`pause`, () => (this.pause = true));
    bus.$on(`unpause`, () => (this.pause = false));
  },
  methods: {
    choice: function (index) {
      if (this.pause) return;
      bus.$emit(`choice`, this.cards[index]);
    },
  },
};
</script>

<style lang="scss">
#btn-row {
  .zener-card {
    width: 80px;
    height: 90px;
    cursor: pointer;
    opacity: 0.55;
    transition: 0.3s ease;

    .card-img {
      padding-right: 30px !important;
    }

    &:hover {
      display: content-box;
      background-color: rgb(100, 100, 100, 0.3);
      opacity: 1;
    }
  }

  .pause {
    &:hover {
      cursor: wait;
    }
  }
}
</style>
