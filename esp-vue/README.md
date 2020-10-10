# esp-vue

## ESPCO2 Checklist

- [x] Favicon
- [x] Do Shake
  - [x] Get csshake
  - [x] Get screen shaking working
  - [x] check global setting for shaking
    - [x] don't do shaking if the setting says that
      - [x] glowing red highlight around card or other indicator of errorness
- [x] Do dark mode
  - [x] make dark mode css
  - [x] make selector
    - [x] could be button, or something else. click on something and change display mode
  - [x] tie dark mode css and selector
  - [x] first time user
    - [x] check dark mode setting on device
    - [x] if not then start in light mode
    - [x] anytime the mode changes, store the result in the cookie
- [x] store the user preferences in a cookie
- [x] indicate user is wrong
  1. [x] do vibration, if can't
  2. [x] do screen shaking, if can't
  3. [x] do other indicator
- [x] use transparent color
  - gif
  - png
  - svg?
- [x] do project in vue
- [x] card hero hides
- [x] user clicks on guess button
  - [x] game chooses random card
- [x] game shows actual card, grades attempt
  - [x] sets timeout to remove card
  - [x] play good sound if correct
    - [x] show good aura
  - [x] play bad sound if wrong
    - [x] show bad aura
    - [x] shake screen if able
    - [x] vibrate device if able
    - [x] update user score
      - [x] sends event to scoreDisplay
  - [x] game resumes
    - [x] if score is at threshold then user wins
    - [x] if score is about total then user loses
    - [x] show modal asking user wants to play again
      - [x] if yes, reset everything
      - [x] if no, do nothing

### From ESPCO1

- [x] Play pleasant sound for right answer
- [x] Trigger device vibration for wrong answer
- [x] Change counter from 25 to 10
- [x] Change ESP threshold from 11 to 5
- [x] Pick a random card each time

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
