<template>
  <div>
    <div class="row">
      <label for="schemeToggleSwitch" class="col form-label text-left"
        >Use Dark mode?</label
      >
      <div class="col-sm-8">
        <div class="form-check form-switch">
          <input
            type="checkbox"
            class="form-check-input mx-auto"
            id="schemeToggleSwitch"
            v-model="scheme"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <label for="motionToggleSwitch" class="col form-label text-left"
        >Suppress motion?</label
      >
      <div class="col-sm-8">
        <div class="form-check form-switch">
          <input
            type="checkbox"
            class="form-check-input mx-auto"
            id="motionToggleSwitch"
            v-model="motion"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <label for="volumeRange" class="col form-label text-left">Volume</label>
      <div class="col-sm-8">
        <div class="form-check form-range">
          <input
            type="range"
            name="volumeRange"
            id="volumeRange"
            min="0"
            step="0.0001"
            max=".15"
            v-model.number="volume"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { bus } from "../main";
export default {
  name: `SettingOptions`,
  data() {
    return {
      scheme: false,
      motion: false,
      volume: 0.1,
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
          volume: this.volume,
        });
        bus.$emit(`setVolume`, this.volume);
      });
      bus.$on(`setSettingsModal`, (data) => {
        // listens for an event to set the state
        this.motion = data.motion;
        this.scheme = data.scheme;
        this.volume = data.volume;
      });
    },
  },
};
</script>

<style lang="scss">
</style>
