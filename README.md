# RNX-CLI - A CLI for React Native made by Xmartlabs team.

## Description

In all these years that we are developing React Native apps we always have the problematic or the question of `"Its good to have a base project/boilerplate?"`

We went to have something to have nothing to have some things but in all the cases we always find problems like <br>
"This is hard to maintain" <br>
"We lose a lot of time, its more easier to use an existing boilerplate"<br>
"I dont like the configurations that comes with this" <br>

And some much more..

In the last few years we are using [react-native-typescript-template]() that is maintained by the community with good results. But we want to go to the next level and avoid to losing time adding some setup things and some configurations that are always the same.

Thats the reason we create this CLI, it takes the aforementioned template and adds all the setup things like linting, babel, github, assets config, etc and lets the project ready to start coding without losing a minute.

## What it adds?

**Base**

- Styling configuration, ESlint, Prettier, etc.
- Babel & Typescript configuration to support absolute imports.
- `react-native-svg` and `svg-transformer` configuration.
- Assets import file.
- Github configuration: pull-request template, git hooks.

**Extras**

- React Navigation: if you want it adds a minimal setup of the latest version of React Navigation, all the typing and a base screen.
- Repository config and git hooks config, if you have you can pass the link of an empty repo and it does all for yourself

## Quick start

Prerequisites:

- For vanilla React Native, make sure you're set up for React Native by following [the official documentation](https://reactnative.dev/docs/environment-setup).
- Expo, **not supported**.

```bash
# Get walked through the prompts for the different options to start your new app
npx rnx-cli i TodoApp

npx rnx-cli init TodoApp

```

# License

MIT - see LICENSE
