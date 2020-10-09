<template>
  <div>
    <div class="form-check form-switch">
      <input
        type="checkbox"
        class="form-check-input"
        id="schemeToggleSwitch"
        v-model="scheme"
      />
      <label for="schemeToggleSwitch" class="form-check-label"
        >Use Dark mode?</label
      >
    </div>
    <div class="form-check form-switch">
      <input
        type="checkbox"
        class="form-check-input"
        id="motionToggleSwitch"
        v-model="motion"
      />
      <label for="motionToggleSwitch" class="form-check-label"
        >Suppress motion?</label
      >
    </div>
  </div>
</template>
<script>
import { bus } from "../main";
export default {
  name: `SchemeToggle`,
  data() {
    return {
      scheme: false,
      motion: false,
    };
  },
  props: [`card`],
  created: function () {
    this.registerListeners();
  },
  methods: {
    registerListeners: function () {
      bus.$on(`saveSettings`, () => {
        // listens for a request for the settings state
        bus.$emit(`updateSettings`, {
          // sends the settings state
          motion: this.motion,
          scheme: this.scheme,
        });
      });
      bus.$on(`setSettingsModal`, (data) => {
        // listens for an event to set the state
        this.motion = data.motion;
        this.scheme = data.scheme;
      });
    },
  },
};
</script>

<style lang="scss">
</style>
