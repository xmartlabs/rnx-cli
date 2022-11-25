# Command Reference for rnx-cli

React Native CLI comes with following commands:

- [`init`](#init)

### `init`

> **IMPORTANT**: Please note that this command is not available through `react-native-cli`, hence you need to either invoke it directly from `@react-native-community/cli` or `react-native` package which proxies binary to this CLI since 0.60.0, so it's possible to use it with e.g. `npx`.

Usage (with `npx`):

```sh
npx @xmartlabs/rnx-cli init <projectName> [options]
```

Initialize a new React Native project named <projectName> in a directory of the same name.

#### Options

#### `--templateVersion <string>`

Shortcut for `--template react-native-template-typescript@version`.
The versions available are the template ones and you can check it [here](https://github.com/react-native-community/react-native-template-typescript#usage-with-older-versions-of-react-native)
