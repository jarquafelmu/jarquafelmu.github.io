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
// import bootstrap from "~Bootstrap";

export default {
  name: "SettingsModal",
  data() {
    return {
      modal: null,
    };
  },
  created: function () {
    this.modal = new bootstrap.Modal(
      document.getElementById("SettingsModalId")
    );
    console.dir(`stored modal:`, this.modal);
    this.registerShowModal();
  },
  components: {
    SchemeToggle,
  },
  methods: {
    toggleModal: function () {
      // document.querySelector("#toggleSettingsModal").click();
    },
    registerShowModal: function () {
      const that = this;
      bus.$on("showModal", () => {
        console.log("request received to show modal");
        that.modal.show();
      });
    },
  },
};
</script>
<style lang="scss">
</style>
