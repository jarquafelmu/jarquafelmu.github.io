<template>
  <div id="scoreContainer" class="mt-3">
    +<span id="scoreDisplay">{{ score.current }}</span> Correct
  </div>
</template>
<script>
export default {
  props: [`score`],
  name: `ScoreDisplay`,
};
</script>

<style lang="scss" scoped>

</style>
