<template>
  <div id="schemeToggleContainer" class="form-check form-switch sticky-top">
    <input type="checkbox" class="form-check-input" id="schemeToggleSwitch" @change="schemeChangeHandler(this)">
    <label id="schemeToggleLabel" for="schemeToggleSwitch" class="form-check-label">{{ currentScheme }}</label>
  </div>
</template>
<script>
export default {
  name:"SchemeToggle",
  data() {
    return {
      currentScheme: "Dark"
    }
  },
  methods: {
    schemeChangeHandler: function(target) {
      console.log(`'schemeChangeHandler' fired`)
      this.$emit('schemeChangeHandler', target)
    }
  }
}
</script>

<style lang="scss">
#schemeToggleContainer {
  // border: 1px solid red;
  position: absolute;
  right: 25%;
  top: 3%;
  font-size: 2rem;
  opacity: 15%;
  transition: 0.18s ease;

  &:hover {
    opacity: 1;
  }

  #schemeToggleSwitch {
    transition: 0.18s ease-in;

    &:checked {
      background-color: #343a40; // bootstraps' dark
    }
    &:not(:checked) {
      background-color: #F9FFF0; // ivory
    }
  }

  #schemeToggleLabel {
    user-select: none;
  }

  #schemeToggleSwitch, #schemeToggleLabel {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
