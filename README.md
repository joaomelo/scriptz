![github actions](https://github.com/joaomelo/sqript/actions/workflows/publish.yml/badge.svg)
[![codecov](https://codecov.io/gh/joaomelo/sqript/branch/main/graph/badge.svg?token=3ZkBAWh6qg)](https://codecov.io/gh/joaomelo/sqript)

# TL;DR

_What problem does it solve?_

**Sqript** is an npm package that helps code and execute scripts with JavaScript. Its goal is to make development workflows descriptive, composable, and maintainable.

# Motivation

_Why it was built?_

NPM [scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts) feature is super convenient, but I always found it difficult to keep my head around the `package.json` scripts section as development workflows grow in number and complexity. Even when using terrific packages like [concurrently](https://www.npmjs.com/package/concurrently), composing scripts came at the cost of readability. See if you agree with me after looking at this personal example below.

![an unconformable personal npm scripts example](https://raw.githubusercontent.com/joaomelo/sqript/main/docs/npm-scripts-example.png)

I've also tried [Bash](https://www.gnu.org/software/bash/), [Gulp](https://gulpjs.com/), [Grunt](https://gruntjs.com/) and [ZX](https://github.com/google/zx). They are all great pieces of battle tested software (and possibly a better alternative to you) but, somehow, I never felt at home with the API.

I think the point is to have something that offers the power and ergonomics of a modern language without losing the simplicity expected from tools peripheral to the programming challenge itself.

The next sections will show how **Sqript** works and enable you to decide if it deserves a try.

# Quick Start

The first step is to install **Sqript** as a dev dependency.

```shell
npm i -D sqript
```

You can install it globally if you prefer, perhaps in the case of using it in a mono repo or on a non-node project.

```shell
npm i -g sqript
```

Then create a `sqript.config.js` file in the root project folder and open it so we can author our first script.

```js
// sqript.config.js
export const lint = {
  name: "lint",
  command: "eslint . --ext .js",
};
```

There are two ways we can use **Sqript** to run the command we just created. The first is to pass the name as an argument in the command line. Like this:

```shell
npx sqript lint
```

The second way is to call **Sqript** without any arguments. It will show a list of available scripts. Just choose the one you want to run.

```shell
npx sqript
```

Things will become way more fun when we start to compose and style more challenging scripts in the next sections.

# Composing Scripts

The last section explored the most basic script type supported: `command`. Nevertheless, **Sqript** can handle more complex ones to enable scripts orchestration. The next type we will look at is the `relay`.

## Relay

Let's explore a scenario where we want to pass some quality checks and if, everything goes well, deploy to production. We could achieve that with a `relay`.

```js
export const test = {
  name: "test",
  command: "jest",
};

export const compile = {
  name: "compile",
  relay: [
    { name: "clean", command: "rimraf dist/*" },
    { name: "tsc", command: "tsc" },
  ],
};

export const publish = {
  name: "publish",
  command: "some-host-cli publish",
};

export const deploy = {
  name: "deploy",
  relay: [test, compile, publish],
};
```

One thing to observe here is the role of the `export` statement. Every script exported in `sqript.config.js` will be available for execution. In the last example, not only does the `deploy` composition take advantage of the `compile` one, but we could execute `compile` independently with `npx sqript compile`.

Coming back to the `relay` subject, relays attempt to run their scripts sequentially but will stop immediately if any of them fail. This is useful if one wants to cancel the workflow when lint or test commands fail, for example.

Another sequential type available is the `serial` script.

## Serial

Serial runs all its scripts one after another; but, contrary to `relay`, will keep going even if one of its child scripts fails.

```js
// ... base scripts definition

export const diagnoses = {
  name: "diagnoses",
  serial: [lint, unitTests, integrationTests, e2eTests],
};
```

Serial can be useful to run a bunch of scripts we want to collect output from, independent of whether they fail or not.

We explored the two sequential types: `relay` and `serial`, but **Sqript** can also orchestrate using parallel approaches with `rally` and `race`.

## Rally

Rally will start all its children as early as possible and keep running until everyone exits, no matter if with failure or success.

```js
export const servers = {
  name: "servers",
  rally: [testsWatchMode, localWebServer, cloudEnvEmulator],
};
```

Compositions with `rally` could be useful to kickstart an ongoing local dev environment dependent on different components. But if we need an exit strategy, the `race` alternative comes to the rescue.

## Race

Like its `rally` cousin, `race` will start every child script as soon as possible. But when anyone of them completes (no matter if with success or failure), `race` will kill all the others and exit.

```js
const testCiWorkflow = {
  name: "test-ci-workflow",
  race: [servers, testCi],
};

export const deploy = {
  name: "deploy",
  relay: [testCiWorkflow, publish],
};
```

In the above example, we can see that different script types can be put together to achieve challenging workflows.

The capability of putting together scripts with different execution rules is the bulk of what **Sqript** offers. Even so, there are still some secondary features worth discussing.

# Styling Prefixes

**Sqript** will print every `command` output in the terminal with prefixes to enable disambiguation. But as scripts become more complex, especially in parallel modes, things can be hard to disambiguate.

Every script can have a `styles` property to set the prefix appearance. The `styles` property is an array of strings supported by the great [Chalk](https://github.com/chalk/chalk#styles) package.

```js
export const testWorkflow = {
  name: "test-workflow",
  styles: ["underline", "blue"],
  race: [
    {
      name: "server",
      styles: ["red"],
      command: "webpack serve --config webpack.config.js",
    },
    {
      name: "test",
      styles: ["bgGreenBright", "whiteBright"],
      command: "jest --coverage=false",
    },
  ],
};
```

Please don't judge my aesthetic choices.

# Commands Environment Variables

Another supported feature is the ability to pass environment variables to commands. The `env` property can be a string with the path to some `.env` file or an object with string values to be injected in the command.

```js
const serverTemplate = (type) => ({
  name: `server-${type}`,
  command: "webpack serve",
  styles: ["bgWhite", "yellow"],
});

export const serverLocal = {
  ...serverTemplate("local"),
  env: ".env",
};

export const serverCi = {
  ...serverTemplate("ci"),
  env: {
    SERVER_PORT: "8081",
  },
};
```

The last example creates scripts variations taking advantage of a function and the spread operator. Although naive, it highlights a promising potential available to every **Sqript** config file.

# Contribution

_How can I help?_

Bug reports and feature requests are welcome in the form of issues. However, I decided to keep the project closed to pull requests contributions.

# Wrapping up

_What to expect?_

The project has limited ambitions. The current set of features and their API can be considered stable from now on.

I expect to apply the package to more projects before the first major version promotion. It will build confidence in its reliability and fix the undoubtedly coming bugs.

If you want to talk, feel free to contact me via [social media](https://joao.melo.plus).

🏜️ Fear is the mind-killer.

# License

Made by [João Melo](https://joao.melo.plus) and licensed under the GNU General Public License v3.0 — see the [LICENSE](LICENSE) file for details.
