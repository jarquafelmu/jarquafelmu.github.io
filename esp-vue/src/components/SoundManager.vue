<template>
  <div class="d-none">
    <audio id="roundWon">
      <source src="/assets/snd/round-won.mp3" type="audio/mpeg" />
      Your browser does not support the audio element
    </audio>
    <audio id="roundLost">
      <source src="/assets/snd/round-lost.mp3" type="audio/mpeg" />
      Your browser does not support the audio element
    </audio>
    <audio id="gameWon">
      <source src="/assets/snd/game-won.mp3" type="audio/mpeg" />
      Your browser does not support the audio element
    </audio>
    <audio id="gameLost">
      <source src="/assets/snd/game-won.mp3" type="audio/mpeg" />
      Your browser does not support the audio element
    </audio>
  </div>
</template>
<script>
import { bus } from "../main";
export default {
  name: `SoundManager`,
  data() {
    return {
      roundWon: null,
      roundLost: null,
      gameWon: null,
      gameLost: null,
      soundArr: [],
    };
  },
  created: function () {
    // create listeners to play sounds
    bus.$on(`choiceCorrect`, () => this.playSound(this.roundWon));
    bus.$on(`choiceWrong`, () => this.playSound(this.roundLost));
    bus.$on(`gameWon`, () => this.playSound(this.gameWon));
    bus.$on(`gameLost`, () => this.playSound(this.roundLost));
    bus.$on(`checkSoundReadyState`, () => {
      bus.$emit(`soundReadyStatus`, this.anyPlaying());
    });
  },
  mounted() {
    this.soundArr.push((this.roundWon = document.getElementById(`roundWon`)));
    this.soundArr.push((this.roundLost = document.getElementById(`roundLost`)));
    this.soundArr.push((this.gameWon = document.getElementById(`gameWon`)));
    this.soundArr.push((this.gameLost = document.getElementById(`gameLost`)));
  },
  methods: {
    /**
     * Invokes the passed in sound reference to play
     */
    playSound: function (ref) {
      ref.play();
    },
    /**
     * Determines if the passed in reference to a sound object is playing
     */
    isPlaying: function (ref) {
      if (!ref.paused || ref.currentTime) return true;
      return false;
    },
    /**
     * Determines if any of the possible sounds are currently active
     */
    anyPlaying: function () {
      return this.soundArr.any((ref) => this.isPlaying(ref));
    },
  },
};
</script>
