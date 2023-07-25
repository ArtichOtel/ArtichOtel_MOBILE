# Installation
*You must install [Node.JS](https://nodejs.org/) & [Yarn](https://yarnpkg.com/) to run this project.*
```bash
git clone git@github.com:ArtichOtel/ArtichOtel_MOBILE.git
cd ArtichOtel_MOBILE/
yarn 
```

# Running with WSL2 ubuntu (windows)
```
npm install --global @expo/ngrok@^4.1.0 (tunnel)
cd ArtichOtel_MOBILE/
yarn expo start --tunnel
```

# Running
## Directly on mobile
```bash
cd ArtichOtel_MOBILE/
yarn expo start
```
Scan the QR Code for [Expo Go App](https://expo.dev/client).

*(If you encounter an `ApiV2Error: Entity Not Authorized` when developping, try to add the `--offline` argument. Like : `yarn expo start --offline`)*
## Emulate
### OSX to iOS
[See the Reat Native Documentation](https://reactnative.dev/docs/environment-setup?package-manager=yarn&guide=native)
