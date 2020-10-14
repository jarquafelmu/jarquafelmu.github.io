<template>
  <div class="d-none">
    <audio id="roundWon">
      <source src="../assets/snd/round-won.mp3" type="audio/mpeg" />
      Your browser does not support the audio element
    </audio>
    <audio id="roundLost">
      <source src="../assets/snd/round-lost.mp3" type="audio/mpeg" />
      Your browser does not support the audio element
    </audio>
    <audio id="gameWon">
      <source src="../assets/snd/game-won.mp3" type="audio/mpeg" />
      Your browser does not support the audio element
    </audio>
    <audio id="gameLost">
      <source src="../assets/snd/game-lost.mp3" type="audio/mpeg" />
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
      soundRefs: [],
      soundPlaying: false,
      soundPlayingCheckInterval: 300,
      volume: 0,
    };
  },
  created: function () {
    // create listeners to play sounds
    bus.$on(`choiceCorrect`, () => this.playSound(this.roundWon));
    bus.$on(`choiceWrong`, () => this.playSound(this.roundLost));
    bus.$on(`playGameWon`, () => this.playSound(this.gameWon));
    bus.$on(`playGameLost`, () => this.playSound(this.gameLost));
    bus.$on(`checkSoundReadyState`, () => {
      bus.$emit(`soundReadyStatus`, this.anyPlaying());
    });
    bus.$on(`setVolume`, (percentage) => this.setVolume(percentage));
  },
  mounted() {
    this.soundRefs.push((this.roundWon = document.getElementById(`roundWon`)));
    this.soundRefs.push(
      (this.roundLost = document.getElementById(`roundLost`))
    );
    this.soundRefs.push((this.gameWon = document.getElementById(`gameWon`)));
    this.soundRefs.push((this.gameLost = document.getElementById(`gameLost`)));
    // this.setVolume(0.1);
  },
  methods: {
    /**
     * Invokes the passed in sound reference to play
     */
    playSound: function (ref) {
      bus.$emit(`soundStart`, ref);
      ref.volume = this.volume;
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
     * Sets the volume for the sounds
     */
    setVolume: function (percentage) {
      this.volume = percentage;
    },
    /**
     * Determines if any of the possible sounds are currently active
     */
    anyPlaying: function () {
      return this.soundRefs.any((ref) => this.isPlaying(ref));
    },
  },
};
</script>
