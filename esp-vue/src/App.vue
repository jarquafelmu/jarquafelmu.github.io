<template>
  <div id="app">
    <Manager msg="Coming soon..." />
  </div>
</template>

<script>
import Manager from "./components/Manager.vue";

export default {
  name: "App",
  meta: {
    title: "ESP",
  },
  data() {
    return {
      colorScheme: {
        enableDarkMode: false,
      },
      devicePreferences: {
        scheme: null,
        motion: null,
      },
      cookieSettings: {
        scheme: null,
        motion: null,
      },
      darkThemePath: "css/darkster.css",
      devicePreferencesTags: {
        motion: "",
        scheme: ""
      }
    };
  },
  components: {
    Manager,
  },
  methods: {
    schemeListener: function() {
      // TODO: get scheme selector state from Manager
    },
    applyDarkTheme: function() {
      let file = document.createElement('link');
      file.rel = 'stylesheet';
      file.href = this.darkThemePath;
      document.head.appendChild(file);
    },
    removeDarkTheme: function() {
      // TODO: figure out how to target a specific stylesheet for removal
    },
    storeSchemeStateInCookie: function() {
      // TODO: store the scheme state in cookie
    },
    getSchemeStateFromCookie: function() {
      // TODO: get the scheme state from cookie
    },
    storeMotionInCookie: function() {
      // TODO: store the user's vibration option from cookie
    },
    getMotionFromCookie: function() {
      // TODO: get the user's motion option from cookie
    },
    getDevicePreference: function(preference){
      // TODO: get the preference from the user's device
    },
    subscribeDevicePreference: function(event) {
      // TODO: listen for changes with the given preference
    }
  }
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
