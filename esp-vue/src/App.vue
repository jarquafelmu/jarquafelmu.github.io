<template>
  <div id="app">
    <Manager />
  </div>
</template>

<script>
import { bus } from "./main";
import Manager from "./components/Manager.vue";

export default {
  name: `App`,
  meta: {
    title: `ESP`,
  },
  data() {
    return {
      appSettings: {
        scheme: false,
        motion: false,
        volume: 0.1,
      },
      defaultVolume: 0.1,
      cookieId: `espAppUserSettings`,
      cookieSettings: {
        scheme: null,
        motion: null,
        volume: null,
      },
      darkThemePath: `css/dark.css`,
      devicePreferences: {
        motion: `(prefers-reduced-motion: reduce)`,
        scheme: `(prefers-color-scheme: dark)`,
      },
      shakeClassName: `shaker`,
      shakeElement: null,
      gameReadyCheckQualifiers: {
        sound: false,
        paused: false,
      },
      bodyElement: null,
      useDarkMode: false,
    };
  },
  components: {
    Manager,
  },
  created: function () {
    // remove any listener
    bus.$off();
  },
  mounted() {
    this.prepare();
    this.registerListeners();
    this.$nextTick(function () {
      this.bodyElement = document.getElementsByTagName("BODY")[0];
      this.updateScheme();
    });
    console.log(this.bodyElement);
    this.shakeElement = document.querySelector(`.container`);
  },
  beforeDestroy() {
    bus.$off();
  },
  methods: {
    /**
     * Sets up the app settings for the game
     */
    prepare: function () {
      // get scheme and motion states from cookie
      if (!this.getStateFromCookie()) {
        console.log(`Did not find cookie`);
      }

      // if the cookie didn't contain the preference, fall back and get it from the device
      this.appSettings.scheme =
        this.cookieSettings.scheme !== null
          ? this.cookieSettings.scheme
          : this.getDevicePreference(this.devicePreferences.scheme);

      this.appSettings.motion =
        this.cookieSettings.motion !== null
          ? this.cookieSettings.motion
          : this.getDevicePreference(this.devicePreferences.motion);

      this.appSettings.volume =
        this.cookieSettings.volume || this.defaultVolume;

      bus.$emit(`setVolume`, this.appSettings.volume);
    },
    /**
     * Registers event listeners
     */
    registerListeners: function () {
      bus.$on(`requestSettings`, () => {
        // settings modal requests current state
        // sends current state
        bus.$emit(`setSettingsModal`, this.appSettings);
      });

      bus.$on(`updateSettings`, (data) => {
        // gets data from settings modal
        this.appSettings.motion = data.motion;
        this.appSettings.scheme = data.scheme;
        this.appSettings.volume = data.volume;
        this.storeStateInCookie();
        this.updateScheme();
      });

      bus.$on(`shake`, () => {
        // if appsettings motion is true then exit
        // because the user has chosen to supress motion
        if (this.appSettings.motion) return;
        this.shakeElement.classList.add(this.shakeClassName);
      });
      document.addEventListener(`animationend`, () => {
        this.shakeElement.classList.remove(this.shakeClassName);
      });

      bus.$on(`gameReadyCheck`, () => {
        bus.$on(`gameReadyResponse`, this.gameReadyCheck());
      });

      bus.$on(`pause`, () => (this.gameReadyCheckQualifiers.paused = true));
      bus.$on(`unpause`, () => (this.gameReadyCheckQualifiers.paused = false));

      bus.$on(
        `soundReadyStatus`,
        (status) => (this.gameReadyCheckQualifiers.sound = status)
      );

      bus.$on(`gameOver`, () => {
        // 2 seconds after the game is declared over, remove all event handling
        setTimeout(() => {
          bus.$off();
        }, 2000);
      });

      bus.$on(`choiceWrong`, () => {
        this.vibrate();
      });
    },
    /**
     * Applies or removes the dark theme
     */
    updateScheme: function () {
      if (this.appSettings.scheme) {
        this.applyDarkTheme();
      } else {
        this.removeDarkTheme();
      }
    },
    /**
     * Adds a dark theme stylesheet to the DOM
     */
    applyDarkTheme: function () {
      this.bodyElement.classList.add("darkmode");
    },
    /**
     * Removes the dark theme stylesheet from the DOM
     */
    removeDarkTheme: function () {
      this.bodyElement.classList.remove("darkmode");
    },
    /**
     * Creates a cookie with the desired information
     */
    storeStateInCookie: function (daysToLive = 10) {
      // encode value in order to escape semicolons, commas, and whitespace
      let strJson = JSON.stringify(this.appSettings);
      let cookie = `${this.cookieId}=${encodeURIComponent(strJson)}`;
      if (typeof daysToLive === `number`) {
        /* Sets the max-age attribute so that the cookie expires after the
        specified number of days */
        cookie = `${cookie}; max-age=${daysToLive * 24 * 60 * 60}`;
      }
      cookie = `${cookie}; samesite=lax`;
      document.cookie = cookie;
    },
    /**
     * Tries to retrieve a cookie with the desired information
     */
    getStateFromCookie: function () {
      // split cookie string and get all individual name=value pairs in an array
      let cookieArr = document.cookie.split(`;`);

      let foundCookie = false;
      // loop through the array elements
      cookieArr.forEach((cookie) => {
        let cookiePair = cookie.split(`=`);

        /* remove whitespace from cookie name */
        if (this.cookieId === cookiePair[0].trim()) {
          // decode the cookie value and return
          let results = decodeURIComponent(cookiePair[1]);
          results = JSON.parse(results);
          this.cookieSettings = results;
          foundCookie = true;
        }
      });

      return foundCookie;
    },
    /**
     * For the passed in preferenc, determine if the user device has that enabled
     */
    getDevicePreference: function (preference) {
      const mediaQuery = window.matchMedia(preference);
      return mediaQuery.matches;
    },
    /**
     * Queries different aspects of the game to see if they are ready for the game to resume
     */
    gameReadyCheck: function () {
      bus.$emit(`checkSoundReadyState`);
    },

    /**
     * Triggers the device to vibrate
     * @param {Array} pattern
     */
    vibrate: function (pattern = [100, 30, 200]) {
      if (!(`vibrate` in window.navigator)) {
        return console.error(
          `Your browser does not support device vibration. :(`
        );
      }
      window.navigator.vibrate(pattern);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
