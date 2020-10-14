<template>
  <div
    id="SettingsModalId"
    class="modal fade"
    tabIndex="-1"
    aria-labelledby="SettingsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-info">
          <div class="modal-title">Settings</div>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col">
                <SettingOptions />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="saveSettings">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { bus, bootstrap } from "../main";
import SettingOptions from "./SettingOptions";

export default {
  name: `SettingsModal`,
  data() {
    return {
      modal: null,
    };
  },
  mounted() {
    const modalElement = document.getElementById(`SettingsModalId`);
    this.modal = new bootstrap.Modal(modalElement);
    this.registerListeners();
  },
  components: {
    SettingOptions,
  },
  methods: {
    saveSettings: function () {
      bus.$emit(`saveSettings`);
      bus.$emit(`displayModal`, false);
    },
    registerListeners: function () {
      bus.$on(`displayModal`, (shouldShow) => {
        // show modal
        if (shouldShow) {
          bus.$emit(`requestSettings`);
          this.modal.show();
        } else this.modal.hide();
      });
      bus.$on(`DEBUG_TRIGGER_SETTINGS_MODAL`, () => {
        this.modal.toggle();
      });
    },
  },
};
</script>
<style lang="scss"></style>
