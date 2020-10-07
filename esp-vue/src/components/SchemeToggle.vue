<template>
  <div id="schemeToggleContainer" class="form-check form-switch sticky-top">
    <input type="checkbox" class="form-check-input" id="schemeToggleSwitch">
    <label for="schemeToggleSwitch" class="form-check-label">{{ currentScheme }}</label>
  </div>
</template>
<script>
export default {
  name:"SchemeToggle",
  data() {
    return {
      currentScheme: "dark"
    }
  }
}
</script>

<style lang="scss">
// #schemeToggleContainer {
//   #schemeToggleSwitch {
//     &.on {

//     }
//     &.off {

//     }
//   }
// }
</style>
