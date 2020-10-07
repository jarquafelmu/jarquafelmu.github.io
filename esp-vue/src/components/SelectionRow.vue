<template>
  <div
    id="btn-row"
    class="col-auto d-flex justify-content-center text-center m-auto"
  >
    <div
      class="card border rounded border-primary zener-card m-1 shadow"
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
export default {
  props: ["cards"],
  name: "SelectionRow",
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    choice: function(index) {
      this.$emit("choice", this.cards[index]);
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
    // border-width: 2px !important;

    .card-img {
      padding-right: 30px !important;
      // padding-left: 1px;
      // width: 50px;
    }

    &:hover {
      display: content-box;
      background-color: rgb(100, 100, 100, 0.3);
      opacity: 1;
    }
  }
}
</style>
