<template>
  <div id="app">
    <Manager />
  </div>
</template>

<script>
import { bus } from './main';
import Manager from './components/Manager.vue';

export default {
  name: `App`,
  meta: {
    title: `ESP`,
  },
  data() {
    return {
      colorScheme: {
        enableDarkMode: false,
      },
      devicePreferences: {
        preferDarkMode: null,
        preferMotion: null,
      },
      cookieSettings: {
        preferDarkMode: null,
        preferMotion: null,
      },
      darkThemePath: `css/dark.css`,
      devicePreferencesTags: {
        motion: `(prefers-reduced-motion: reduce)`,
        scheme: `(prefers-color-scheme: dark)`,
      },
    };
  },
  components: {
    Manager,
  },
  created: function () {
    // TODO: get device settings
    // TODO: get cookie settings
    // TODO: apply settings
    // register bus with schemeChoiceChanged event
    bus.$on(`schemeChoiceChanged`, (data) => {
      console.log(`App saw scheme choice change. new choice is `, data);

      if (data) this.applyDarkTheme();
      else this.removeDarkTheme();
    });

    this.getDevicePreference(this.devicePreferencesTags.motion);
    this.getDevicePreference(this.devicePreferencesTags.scheme);
  },
  mounted: function () {},
  methods: {
    schemeListener: function () {
      // TODO: get scheme selector state from Manager
    },
    applyDarkTheme: function () {
      console.log(`'applyDarkTheme' fired`);
      let file = document.createElement(`link`);
      file.rel = `stylesheet`;
      file.href = this.darkThemePath;
      document.head.appendChild(file);
    },
    removeDarkTheme: function () {
      const styleSheet = document.querySelector(
        `link[rel=stylesheet][href*="${this.darkThemePath}"]`
      );

      if (!styleSheet)
        throw Error(
          `expected reference to darkster stylesheet element but didn't get anything: ${styleSheet}`
        );

      // disable sheet first to remove its styling effects
      styleSheet.disabled = true;
      // remove the stylesheet
      styleSheet.remove();
    },
    storeSchemeStateInCookie: function () {
      // TODO: store the scheme state in cookie
    },
    getSchemeStateFromCookie: function () {
      // TODO: get the scheme state from cookie
    },
    storeMotionInCookie: function () {
      // TODO: store the user's vibration option from cookie
    },
    getMotionFromCookie: function () {
      // TODO: get the user's motion option from cookie
    },
    getDevicePreference: function (preference) {
      // TODO: get the preference from the user's device
      const mediaQuery = window.matchMedia(preference);
      return mediaQuery.matches;
    },
    subscribeDevicePreference: function (/* event */) {
      // TODO: listen for changes with the given preference
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
