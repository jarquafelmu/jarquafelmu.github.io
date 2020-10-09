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
    this.react();
  },
  methods: {
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
    },
    react: function () {
      if (this.appSettings.scheme) {
        console.log(`applying dark theme`);
        this.applyDarkTheme();
      } else {
        console.log(`removing dark theme`);
        this.removeDarkTheme();
      }
    },
    applyDarkTheme: function () {
      // console.log(`'applyDarkTheme' fired`);
      let file = document.createElement(`link`);
      file.rel = `stylesheet`;
      file.href = this.darkThemePath;
      document.head.appendChild(file);
    },
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
    storeStateInCookie: function (daysToLive = 10) {
      // console.info(`storing cookie`);
      // console.log(`cookie name`, this.cookieSettings.identifier);
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
      // console.info(`packaged cookie`, cookie);
      document.cookie = cookie;
    },
    getStateFromCookie: function () {
      // console.info(`getting cookie`);
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
    getDevicePreference: function (preference) {
      const mediaQuery = window.matchMedia(preference);
      return mediaQuery.matches;
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
  /* color: #2c3e50; */
  margin-top: 60px;
}
</style>
