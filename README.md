# react-videoplayer-hook-app
Sample project that shows an integration of

 - [capacitor-video-player] (https://github.com/jepiqueau/capacitor-video-player/blob/master/readme.md)

 - [react-video-player-hook] (https://www.npmjs.com/package/react-video-player-hook)

in a React App.



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |

## Installation

To start clone the project
```bash
git clone https://github.com/jepiqueau/react-videoplayer-hook-app.git 
cd react-videoplayer-hook-app
git remote rm origin
npm install
```

To install the latest release of the `capacitor-video-player` plugin
and the latest release of the `react-video-player-hook` hook 

```bash
npm run update
npx cap update
npm run build
npx cap copy
npx cap copy web
```

## Running the app

### BROWSER

```
npx cap serve
```

### IOS

```
npx cap open ios
```

### ANDROID

```
npx cap open android
```

### ELECTRON

```
npx cap open @capacitor-community/electron
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jepiqueau"><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="100px;" alt=""/><br /><sub><b>Jean Pierre Quéau</b></sub></a><br /><a href="https://github.com/jepiqueau/react-videoplayer-hook-app/commits?author=jepiqueau" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/piccinnigius"><img src="https://avatars0.githubusercontent.com/u/10252011?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Giuseppe Piccinni</b></sub></a><br /><a href="https://github.com/jepiqueau/react-videoplayer-hook-app/commits?author=piccinnigius" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

