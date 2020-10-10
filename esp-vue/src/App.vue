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
      },
      cookieId: `espAppUserSettings`,
      cookieSettings: {
        scheme: null,
        motion: null,
      },
      darkThemePath: `css/dark.css`,
      devicePreferences: {
        motion: `(prefers-reduced-motion: reduce)`,
        scheme: `(prefers-color-scheme: dark)`,
      },
      shakeClassName: `my-custom-shake`,
      shakeElement: null,
      gameReadyCheckQualifiers: {
        sound: false,
        paused: false,
      },
    };
  },
  components: {
    Manager,
  },
  created: function () {
    // remove any listener
    bus.$off();
    this.body = document.getElementsByTagName(`BODY`)[0];
  },
  mounted() {
    this.prepare();
    this.registerListeners();
    this.react();
    this.shakeElement = document.querySelector(`.container`);
  },
  methods: {
    /**
     * Sets up the app settings for the game
     */
    prepare: function () {
      // get scheme and motion states from cookie
      this.getStateFromCookie();

      // if this is null then our cookie didn't have anything, so check the device preference
      this.appSettings.scheme =
        this.cookieSettings.scheme !== null
          ? this.cookieSettings.scheme
          : this.getDevicePreference(this.devicePreferences.scheme);

      this.appSettings.motion =
        this.cookieSettings.motion !== null
          ? this.cookieSettings.motion
          : this.getDevicePreference(this.devicePreferences.motion);
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
        this.storeStateInCookie();
        this.react();
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
    },
    /**
     * Applies or removes the dark theme
     */
    react: function () {
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
      let file = document.createElement(`link`);
      file.rel = `stylesheet`;
      file.href = this.darkThemePath;
      document.head.appendChild(file);
    },
    /**
     * Removes the dark theme stylesheet from the DOM
     */
    removeDarkTheme: function () {
      const styleSheet = document.querySelector(
        `link[rel=stylesheet][href*="${this.darkThemePath}"]`
      );

      if (!styleSheet) return;

      // disable sheet first to remove its styling effects
      styleSheet.disabled = true;
      // remove the stylesheet
      styleSheet.remove();
    },
    /**
     * Creates a cookie with the desired information
     */
    storeStateInCookie: function (daysToLive = 10) {
      // encode value in order to escape semicolons, commas, and whitespace
      let strJson = JSON.stringify(this.appSettings);
      // console.log(`strJson`, strJson);
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

      // loop through the array elements
      cookieArr.forEach((cookie) => {
        let cookiePair = cookie.split(`=`);

        /* remove whitespace from cookie name */
        if (this.cookieId === cookiePair[0].trim()) {
          // decode the cookie value and return
          let results = decodeURIComponent(cookiePair[1]);
          results = JSON.parse(results);
          this.cookieSettings = results;
          return true;
        }
      });

      // didn't find our cookie
      return false;
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
