<template>
  <div id="schemeToggleContainer" class="form-check form-switch sticky-top">
    <input
      type="checkbox"
      class="form-check-input"
      id="schemeToggleSwitch"
      @change="schemeChangeHandler"
    />
    <label
      id="schemeToggleLabel"
      for="schemeToggleSwitch"
      class="form-check-label"
      >{{ currentScheme }}</label
    >
  </div>
</template>
<script>
import { bus } from "../main";
export default {
  name: `SchemeToggle`,
  data() {
    return {
      schemeCheckState: false,
      currentScheme: `Dark`,
    };
  },
  methods: {
    schemeChangeHandler: function () {
      this.schemeCheckState = document.getElementById(
        `schemeToggleSwitch`
      ).checked;
      bus.$emit(`schemeChoiceChanged`, this.schemeCheckState);
    },
  },
};
</script>

<style lang="scss">
// BUG: massive jumping around for switch when changing to darkmode
#schemeToggleContainer {
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
      background-color: #f9fff0; // ivory
    }
  }

  #schemeToggleLabel {
    user-select: none;
  }

  #schemeToggleSwitch,
  #schemeToggleLabel {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
