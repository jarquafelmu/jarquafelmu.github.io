<template>
  <div id="scoreContainer" class="mt-3">
    <span id="correct">{{ correct }}</span>
    |
    <span id="total">{{ total }}</span>
    |
    <span id="threshold">{{ threshold }}</span>
  </div>
</template>
<script>
import { bus } from "../main";
export default {
  name: `ScoreDisplay`,
  data() {
    return {
      correct: 0,
      total: 0,
      threshold: 0,
    };
  },
  created: function () {
    this.registerListeners();
  },
  methods: {
    registerListeners: function () {
      bus.$on(`scoreUpdate`, (data) => {
        this.correct = data.correct;
        this.total = data.total;
        this.threshold = data.threshold;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
