# esp-vue

## ESPCO2 Checklist

- [x] Favicon
- [ ] Do Shake
  - [ ] Get shake.js
  - [ ] Get screen shaking working
  - [ ] check global setting for shaking
    - [ ] don't do shaking if the setting says that
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
- [ ] indicate user is wrong
  1. [ ] do vibration, if can't
  2. [ ] do screen shaking, if can't
  3. [ ] do other indicator
- [x] use transparent color
  - gif
  - png
  - svg?
- [x] do project in vue
- [ ] card hero hides
- [ ] user clicks on guess button
  - [ ] game chooses random card
- [ ] game shows actual card, grades attempt
  - [ ] sets timeout to remove card
  - [ ] play good sound if correct
    - [ ] show good aura
  - [ ] play bad sound if wrong
    - [ ] show bad aura
    - [ ] shake screen if able
    - [ ] vibrate device if able
    - [ ] update user score
      - [ ] sends event to scoreDisplay
  - [ ] game resumes
    - [ ] if score is at threshold then user wins
    - [ ] if score is about total then user loses
    - [ ] show modal asking user wants to play again
      - [ ] if yes, reset everything
      - [ ] if no, do nothing

### From ESPCO1

- [ ] Play pleasant sound for right answer
- [ ] Trigger device vibration for wrong answer
- [ ] Change counter from 25 to 10
- [ ] Change ESP threshold from 11 to 5
- [ ] Pick a random card each time

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
