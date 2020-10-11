<template>
  <div
    id="GameOverModalId"
    class="modal fade"
    tabIndex="-1"
    aria-labelledby="GameOverModalId"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div
          class="modal-header bg-primary"
          :class="{ 'bg-success': gameWon, 'bg-danger': !gameWon }"
        >
          <div class="modal-title text-light display-7">Game Over</div>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col display-8">The game is over. {{ msg }}</div>
            </div>
            <div class="row">
              <div class="col text-muted">Refresh the page to try again.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { bus, bootstrap } from "../main";
import { random } from "./../js/utils";

export default {
  name: `GameOverModalId`,
  data() {
    return {
      modal: null,
      msg: ``,
      gameWon: false,
      winningMsgs: [
        `You won, ya dingus`,
        `You won, maybe you won't next time`,
        `Look who just might have ESP`,
        `Beginners luck.`,
        `Best 2 out of 3?`,
        `You cheated some how, didn't you?`,
      ],
      losingMsgs: [
        `Your mother was a hampster and your father smelt of elderberries!`,
        `Better luck next time.`,
        `Best 2 out of 3?`,
        `Proof that humanity will never rise over AI.`,
      ],
    };
  },
  mounted() {
    const modalElement = document.getElementById(`GameOverModalId`);
    this.modal = new bootstrap.Modal(modalElement, {
      backdrop: `static`,
      keyboard: false,
    });
    this.registerListeners();
  },
  methods: {
    saveSettings: function () {
      bus.$emit(`saveSettings`);
      bus.$emit(`displayModal`, false);
    },
    registerListeners: function () {
      bus.$on(`gameLost`, () => {
        this.getRandomMessage(this.losingMsgs);
        this.gameWon = false;
      });
      bus.$on(`gameWon`, () => {
        this.getRandomMessage(this.winningMsgs);
        this.gameWon = true;
      });
      bus.$on(`gameOver`, () => {
        this.modal.show();
      });
      bus.$on(`DEBUG_TRIGGER_GAMEOVER_MODAL`, () => {
        this.modal.toggle();
      });
    },
    getRandomMessage: function (source) {
      this.msg = source[random(0, source.length)];
    },
  },
};
</script>
<style lang="scss"></style>
