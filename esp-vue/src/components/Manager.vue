<template>
  <div>
    <div class="container">
      <SettingsBtn />
      <div class="row">
        <div class="col">
          <h1><GameTitle :data="GameTitle" />!</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-auto mx-auto">
          <CardHero :card="selectedCard" />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <h5><Instructions /></h5>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <SelectionRow :cards="cards" />
        </div>
      </div>
      <div class="row">
        <ScoreDisplay class="col-auto mx-auto" />
      </div>
    </div>
    <SettingsModal />
    <GameOverModal />
    <SoundManager />
  </div>
</template>

<script>
import { bus } from "../main";
import { random } from "../js/utils";
import cards from "../assets/cards";
import GameTitle from "./GameTitle";
import CardHero from "./CardHero";
import Instructions from "./Instructions";
import SelectionRow from "./SelectionRow";
import ScoreDisplay from "./ScoreDisplay";
import SettingsModal from "./SettingsModal";
import SettingsBtn from "./SettingsBtn";
import SoundManager from "./SoundManager";
import GameOverModal from "./GameOverModal";

export default {
  name: `Manager`,
  data() {
    return {
      timeOutAmt: 1500,
      GameTitle: `ESP Tester`,
      selectedCard: null,
      cards: cards,
      score: {
        correct: 0,
        total: 0,
        threshold: 5,
        max: 10,
      },
      gameEnded: false,
    };
  },
  created: function () {
    this.resetCard();
    this.registerListeners();
  },
  components: {
    GameTitle,
    CardHero,
    Instructions,
    SettingsBtn,
    SelectionRow,
    SettingsModal,
    SoundManager,
    ScoreDisplay,
    GameOverModal,
  },
  methods: {
    registerListeners: function () {
      bus.$on(`choice`, (data) => {
        // fires when the user clicks on a card in the bottom row
        // this.setCardFace(data);
        bus.$emit(`validateChoice`, data);
      });

      bus.$on(`validateChoice`, (data) => {
        this.selectedCard = this.getCard();
        this.setCardFace(this.selectedCard);

        if (this.selectedCard.id === data.id) {
          bus.$emit(`choiceCorrect`);
          this.score.correct++;
        } else {
          bus.$emit(`choiceWrong`);
          bus.$emit(`shake`);
        }
        this.score.total++;

        bus.$emit(`scoreUpdate`, this.score);

        {
          // check score against goals
          if (this.checkForEnd()) return;
        }

        // pause interaction with the game to give the user time to appreciate this round
        bus.$emit(`pause`);
        this.resetTimeout = setTimeout(() => {
          this.resetCard();
          if (!this.gameEnded) bus.$emit(`unpause`);
        }, this.timeOutAmt);
      });
      bus.$on(`soundStop`, () => {
        // the game should reset and unpause a soon as the sound is finished,
        // but the timeout should ensure that it happens.
        // if this fires correctly however, it should clear the timeout so that it
        // doesn't also happen
        this.resetCard();
        if (!this.gameEnded) bus.$emit(`unpause`);
        clearTimeout(this.resetTimeout);
      });
    },
    setCardFace: function (card) {
      this.selectedCard = card;
    },
    getCard: function () {
      const randomIndex = random(0, Object.keys(this.cards).length - 1);
      const randomKey = Object.keys(this.cards)[randomIndex];
      return this.cards[randomKey];
    },
    resetCard: function () {
      this.setCardFace(this.cards.back);
      bus.$emit(`resetCard`);
    },
    checkForEnd: function () {
      if (this.gameEnded) return true;
      const gameWon = this.score.correct >= this.score.threshold;
      const gameLost = this.score.total >= this.score.max;
      const gameOver = gameWon || gameLost;
      if (gameOver) {
        if (gameWon) bus.$emit(`gameWon`);
        else if (gameLost) bus.$emit(`gameLost`);
        setTimeout(() => {
          if (gameWon) bus.$emit(`playGameWon`);
          else if (gameLost) bus.$emit(`playGameLost`);
        }, 1000);
        bus.$emit(`gameOver`);

        return (this.gameEnded = true);
      }

      return false;
    },
  },
};
</script>
