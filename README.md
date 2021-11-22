THE FOLLOWING README IS A DRAFT AND THE PACKAGE CAPABILITIES STILL TO NOT REFLECT WHAT IS WRITTEN. DEV IS IN COURSE BUT NOT DONE YET.

![github actions](https://github.com/joaomelo/sqript/actions/workflows/publish.yml/badge.svg)
[![codecov](https://codecov.io/gh/joaomelo/sqript/branch/main/graph/badge.svg?token=3ZkBAWh6qg)](https://codecov.io/gh/joaomelo/sqript)

# TL;DR

_What problem does it solve?_

Sqript is an npm package that helps code and execute scripts with [Typescript](https://www.typescriptlang.org/). Its goal is to make development workflows descriptive, composable, and maintainable.

# Motivation

_Why it was built?_

NPM [scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts) feature is super convenient, but I always found it difficult to keep my head around the `package.json` scripts section as development workflows grow. Like in the following personal example.

![an unconformable personal npm scripts example](https://raw.githubusercontent.com/joaomelo/sqript/main/docs/npm-scripts-example.png)

I've also tried [Bash](https://www.gnu.org/software/bash/), [Gulp](https://gulpjs.com/), [Grunt](https://gruntjs.com/) and [ZX](https://github.com/google/zx). They are all great pieces of software (and probably a better alternative to you) but, somehow, I never felt at home with the API.

I think the point is to have something that offers the power and ergonomics of a modern language without losing the simplicity expected from tools peripheral to the programming challenge itself.

The next sections will show how Sqript works and enable you to decide if it deserves a try.

# Quick Start

The first step is to install Sqript as a dev dependency.

```shell
npm i -D sqript
```

Then create a `sqript.ts` file in the root project folder and open it so we can author our first script.

```ts
// sqript.ts

import { Command } from "sqript";

export const lint: Command = {
  name: "lint",
  instruction: "npx eslint . --ext .js,.ts",
};
```

There are two ways we can use Sqript to run the command we just created. The first is to pass the name as an argument in the command line. Like this:

```shell
npx sqript lint
```

The second way is to call Sqript without any arguments. It will show a list of available scripts. Just choose the one you want to run.

```shell
npx sqript
```

Things will become way more fun when we start to compose and style more challenging scripts in the next sections.

# Composing Scripts

Sqript handles scripts of two types: `Command` and `Composition`. Commands represent the core instructions run in the shell. Compositions, on the other hand, can combine scripts to orchestrate complex workflows.

## Relay

Let explore a scenario where we want to pass some quality checks and if, everything goes well, deploy to production. We could achieve that with a composition in `RELAY` mode.

```ts
import { Command, Composition } from "sqript";

export const test: Command = {
  name: "test",
  instruction: "jest",
};

export const compile: Composition = {
  name: "compile",
  mode: "RELAY",
  scripts: [
    { name: "clean", instruction: "npx rimraf dist/*" },
    { name: "tsc", instruction: "tsc" },
  ],
};

export const publish: Command = {
  name: "publish",
  instruction: "some-host-cli publish",
};

export const deploy: Composition = {
  name: "deploy",
  mode: "RELAY",
  scripts: [test, compile, publish],
};
```

One thing to observe here is the role of the `export` statement. Every script exported in `sqript.ts` will be available for execution. In the last example, not only does the `deploy` composition take advantage of the `compile` one, but we could execute `compile` independently with `npx sqript compile`.

Another side note is that we get code completion and validation when authoring `sqript.ts` by importing and using `Command` and `Composition` types on the scripts declarations.

Coming back to the `RELAY` subject, compositions set to this mode will attempt to run their scripts sequentially but will stop immediately if any of them fail. This is useful if one wants to cancel the workflow when lint or test commands fail, for example.

Another sequential option available is the `SERIAL` mode.

## Serial

Serial compositions run all their scripts one after another; but, contrary to `RELAY` mode, will keep going even if one of its child scripts fails.

```ts
// ... base scripts definition

export const diagnoses: Composition = {
  name: "diagnoses",
  mode: "SERIAL",
  scripts: [lint, unitTests, integrationTests, e2eTests],
};
```

Serial compositions could be useful to run a bunch of scripts we want to collect output from, independent of whether they fail or not.

We explored the two sequential modes `RELAY` and `SERIAL`, but Sqript can also orchestrate using parallel approaches with `RALLY` and `RACE`.

## Rally

Rally composition will start its scripts as early as possible and keep running until everyone exits.

```ts
export const servers: Composition = {
  name: "servers",
  mode: "RALLY",
  scripts: [testsWatchMode, localWebServer, cloudEnvEmulator],
};
```

Rally compositions could be useful to kickstart a local dev environment dependent on different components. But if we need an exit strategy, the alternative `RACE` mode can rescue us.

## Race

Like its Rally cousin, the Race composition will start every child script as soon as possible. But when anyone of them completes (no matter if with success or failure), the Race script will kill all the others and exit.

```ts
const testCiWorkflow: Composition = {
  name: "test-ci-workflow",
  mode: "RACE",
  scripts: [servers, testCi],
};

export const deploy: Composition = {
  name: "deploy",
  mode: "RELAY",
  scripts: [testCiWorkflow, publish],
};
```

In the above example, we can see that different composition modes can be put together to achieve challenging workflows.

The capability of putting together Commands and Compositions is the bulk Sqript offers. Nevertheless, there are still some secondary features is worth discussing.

# Styling Prefixes

Sqript will print every `Command` output in the terminal with prefixes to enable disambiguation. But as scripts become more complex, especially in parallel modes, things can be hard to understand.

Every Script can have a `styles` property to set the prefix appearance and help identification. The `styles` property is an array of strings supported by the great [Chalk](https://github.com/chalk/chalk#styles) package. The available values should be shown in code completion.

```ts
import { Composition } from "sqript";

export const testWorkflow: Composition = {
  name: "test-workflow",
  styles: ["underline", "blue"],
  mode: 'RACE'
  scripts: [
    {
      name: "server",
      styles: ["red"],
      instruction: "webpack serve --config webpack.config.js",
    },
    {
      name: "test",
      styles: ["bgGreenBright", "whiteBright"],
      instruction: "jest --coverage=false",
    }
  ],
};
```

Please don't judge my aesthetic choices.

# Commands Environment Variables

Another supported feature is the ability to pass environment variables to commands. The `env` property can be a string with the path to some `.env` file or a [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) with string values to be injected in the command.

```ts
export serverLocal: Command = {
  name: "server-local",
  instruction: "webpack serve",
  env: ".env"
}

export serverCi: Command = {
  name: "server-ci",
  instruction: "webpack serve",
  env: {
    SERVER_PORT: "8081"
  }
}
```

# Contribution

_How can I help?_

Bug reports and feature requests are welcome in the form of issues. However, I decided to keep the project closed to pull requests contributions.

# Wrapping up

_What to expect?_

The project has limited ambitions. The current API and features can be considered stable from now on.

I expect to apply the package to more projects to build confidence in its reliability and fix the undoubtedly coming bugs before the first major version promotion.

If you want to talk, feel free to contact me via [social media](https://joao.melo.plus).

🏜️ Fear is the mind-killer.

# License

Made by [João Melo](https://joao.melo.plus) and licensed under the GNU General Public License v3.0 — see the [LICENSE](LICENSE) file for details.
