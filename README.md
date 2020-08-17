# PrestoDriver

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to the javascript code in React Native.
We manage two env files: `.env` and `.env.dev` for production and staging respectively.

The `.env` file is ignored by git keeping those secrets out of the repo.

## :arrow_forward: How to Run App

1. Clone the repo
2. Create .env and .env.dev files (ask for credentials)
3. Install dependencies `yarn` or `npm i`
4. Install pods `cd ios && pod install && cd ..`
5. Run Build for either OS

- for iOS
  - run `npm run ios:dev` or `npm run ios:dev:x` for a notch version
- for Android
  - run `npm run android:dev`
