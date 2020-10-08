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
        <div class="modal-header">
          <div class="modal-title">Settings</div>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col">
                <SchemeToggle />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="toggleModal">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { bus, bootstrap } from "../main";
import SchemeToggle from "./SchemeToggle";

export default {
  name: "SettingsModal",
  data() {
    return {
      modal: null,
    };
  },
  mounted() {
    const modalElement = document.getElementById("SettingsModalId");
    this.modal = new bootstrap.Modal(modalElement);
    this.registerShowModal();
  },
  components: {
    SchemeToggle,
  },
  methods: {
    toggleModal: function () {
      bus.$emit("displayModal", false);
    },
    registerShowModal: function () {
      const that = this;
      bus.$on("displayModal", (shouldShow) => {
        if (shouldShow) that.modal.show();
        else that.modal.hide();
      });
    },
  },
};
</script>
<style lang="scss"></style>
