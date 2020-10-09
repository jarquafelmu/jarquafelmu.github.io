<template>
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
      <ScoreDisplay :score="score" class="col-auto mx-auto" />
    </div>
    <SettingsModal />
  </div>
</template>

<script>
import { bus } from "../main";
import { random } from "../js/utils";
import GameTitle from "./GameTitle.vue";
import CardHero from "./CardHero.vue";
import Instructions from "./Instructions.vue";
import SelectionRow from "./SelectionRow.vue";
import ScoreDisplay from "./ScoreDisplay.vue";
import SettingsModal from "./SettingsModal";
import SettingsBtn from "./SettingsBtn.vue";

// TODO: wire up game
// TODO: scoring
// TODO: show card
//
export default {
  name: `Manager`,
  data() {
    return {
      timeOutAmt: 3000,
      GameTitle: `ESP Tester`,
      selectedCard: null,
      cards: {
        plus: {
          id: 0,
          name: `plus`,
          src: `/img/cards/plus_stroke.svg`,
          alt: `a plus card`,
        },
        circle: {
          id: 1,
          name: `circle`,
          src: `/img/cards/circle_stroke.svg`,
          alt: `a circle card`,
        },
        square: {
          id: 2,
          name: `square`,
          src: `/img/cards/square_stroke.svg`,
          alt: `a square card`,
        },
        star: {
          id: 3,
          name: `star`,
          src: `/img/cards/star_stroke.svg`,
          alt: `a star card`,
        },
        waves: {
          id: 4,
          name: `waves`,
          src: `/img/cards/waves_stroke.svg`,
          alt: `a waves card`,
        },
        back: {
          id: 5,
          name: `back`,
          alt: `the back of the card`,
          isBack: true,
        },
      },
      score: {
        correct: 0,
        total: 0,
        target: 5,
        max: 10,
      },
    };
  },
  created: function () {
    this.setCardFace(this.cards.back);
    this.registerListeners();
  },
  components: {
    GameTitle,
    CardHero,
    Instructions,
    SettingsBtn,
    SelectionRow,
    SettingsModal,
    ScoreDisplay,
  },
  methods: {
    registerListeners: function () {
      bus.$on(`choice`, (data) => {
        // fires when the user clicks on a card in the bottom row
        // this.setCardFace(data);
        bus.$emit(`validateChoice`, data);
      });

      bus.$on(`validateChoice`, (data) => {
        const chosenCard = this.cards[random(0, this.cards.length)];

        if (chosenCard.id === data.id) {
          bus.$emit(`choiceCorrect`);
          this.score.correct++;
        } else {
          bus.$emit(`choiceWrong`);
        }
        this.score.total++;

        bus.$emit(`scoreUpdate`, this.score);
        bus.$emit(`pause`);
        setTimeout(() => {
          this.setCardFace(this.cards.back);
          bus.$emit(`unpause`);
        }, this.timeOutAmt);
      });
    },
    setCardFace: function (card) {
      this.selectedCard = card;
    },
  },
};
</script>
