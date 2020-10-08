<template>
  <div class="container">
    <SchemeToggle @change="schemeChangeHandler"></SchemeToggle>
    <div class="row">
      <div class="col">
        <h1><GameTitle :data="GameTitle"></GameTitle>!</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-auto mx-auto">
        <CardHero :card="selectedCard"></CardHero>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <h5><Instructions></Instructions></h5>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <SelectionRow :cards="cards" @choice="choice"></SelectionRow>
      </div>
    </div>
    <div class="row">
      <ScoreDisplay :score="score" class="col-auto mx-auto"></ScoreDisplay>
    </div>
  </div>
</template>

<script>
import GameTitle from "./GameTitle.vue";
import CardHero from "./CardHero.vue";
import Instructions from "./Instructions.vue";
import SelectionRow from "./SelectionRow.vue";
import ScoreDisplay from "./ScoreDisplay.vue";
import SchemeToggle from "./SchemeToggle.vue";

// TODO: wire up game
// TODO: scoring
// TODO: show card
//
export default {
  name: "Manager",
  data() {
    return {
      GameTitle: "ESP Tester",
      selectedCard: null,
      cards: {
        plus: {
          id: 0,
          name: "plus",
          src: "/img/cards/plus_stroke.svg",
          alt: "a plus card",
        },
        circle: {
          id: 1,
          name: "circle",
          src: "/img/cards/circle_stroke.svg",
          alt: "a circle card",
        },
        square: {
          id: 2,
          name: "square",
          src: "/img/cards/square_stroke.svg",
          alt: "a square card",
        },
        star: {
          id: 3,
          name: "star",
          src: "/img/cards/star_stroke.svg",
          alt: "a star card",
        },
        waves: {
          id: 4,
          name: "waves",
          src: "/img/cards/waves_stroke.svg",
          alt: "a waves card",
        },
        back: {
          id: 5,
          name: "back",
          alt: "the back of the card",
          isBack: true,
        },
      },
      score: {
        current: 0,
        target: 0,
        max: 0
      }
    };
  },
  created: function() {
    this.setCardFace(this.cards.back);
  },
  components: {
    GameTitle,
    CardHero,
    Instructions,
    SchemeToggle,
    SelectionRow,
    ScoreDisplay,
  },
  methods: {
    choice: function(card) {
      this.setCardFace(card);
    },
    setCardFace: function(card) {
      this.selectedCard = card;
    },
    schemeChangeHandler: function(target) {
      console.log(`'schemeChangeHandler' fired`)
      console.dir(target);
      console.log(`is target checked`, target.checked);
    }
  },
};
</script>
