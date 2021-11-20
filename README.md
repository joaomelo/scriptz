![github actions](https://github.com/joaomelo/sqript/actions/workflows/publish.yml/badge.svg)
[![codecov](https://codecov.io/gh/joaomelo/sqript/branch/main/graph/badge.svg?token=3ZkBAWh6qg)](https://codecov.io/gh/joaomelo/sqript)

# TL;DR

_What problem does it solve?_

Sqript is a CLI application that runs scripts built with [Typescript](https://www.typescriptlang.org/). Its goal is to make development workflows descriptive, composable, and easy to maintain.

# Motivation

_Why it was built?_

NPM [scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts) feature is fine, but I always found it difficult to keep my head around them as development workflows grow. Like in the following personal example.

![an unconformable personal npm scripts example](https://raw.githubusercontent.com/joaomelo/sqript/main/docs/npm-scripts-example.png)

I've also tried [Bash](https://www.gnu.org/software/bash/), [Gulp](https://gulpjs.com/), [Grunt](https://gruntjs.com/) and [ZX](https://github.com/google/zx). They are all great pieces of software (and probably a better alternative to you) but, somehow, I never felt at home with the API.

I think the point was to have something that offers the power and ergonomics of a modern language without losing the simplicity expected from tools peripheral to the programming challenge itself.

Let me show how it is used.

# Quick Start

The first step is install Sqript as a dev dependency.

`npm i -D sqript`

Now, create a `sqript.ts` file in the root project folder. Edit the file to create scripts. Let us create and export a simple one.

```ts
// sqript.ts

import { Command } from "sqript";

export const lint: Command = {
  name: "lint",
  instruction: "npx eslint . --ext .js,.jsx,.ts,.tsx",
};
```

There are two ways we can use Sqript to run this. The first one is passing its name as an argument in the command line like this: `npx sqript lint`. The second way is to just call `npx sqript` and it will show a list with available scripts for selection.

This is fine, but things becomes more fun when we use Sqript to compose and style more challenging scripts.

# Composing Scripts

Sqript handles scripts of two types. The first and basic one is the Command, which represent the core commands run in the shell. The Composition in the other hand, can combine commands or other composition to orchestrate complex workflows.

## Relay Composition

Let explore scenario where we want to run quality checks and then deploy a software to production. A composition in `RELAY` mode can achieve that.

```ts
import { Command, Composition } from "sqript";

export const test: Command = { name: "test", instruction: "jest" };

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

One think to note here is the export statements, we make every export script fo them available for execution by passing the `name` as argument or choosing from the Sqript list. Sqript will only have access to what we export in the `sqript.ts` file.

Other touch is that by importing `Command` and `Composition` we get code completion and validation when authoring `sqript.ts`.

Coming back to the `RELAY` mode, compositions set to this mode will attempt to run its scripts sequentially but will stop if any of them fail. This if useful if one want to stop the workflow when lint or test commands fail, for example.

Other sequential option is the `SERIAL` mode.

## Serial Composition

This kind of composition will run all child scripts one after another but will keep going even if one of them fails.

```ts
// ... base scripts definition

export const deploy: Composition = {
  name: "diagnoses",
  mode: "SERIAL",
  scripts: [lint, unitTests, integrationTests, e2eTests],
};
```

Serial composition could be useful to run a bunch of scripts we want to collect output of, independent if they fail or not. But Sqript can also orchestrate using a parallel approach with `RALLY` and `RACE`.

## Rally

Rally composition will start every child script together and keep running until every one of them exits.

```ts
export const servers: Composition = {
  name: "servers",
  mode: "RALLY",
  scripts: [testsWatchMode, localWebServer, cloudEnvEmulator],
};
```

Rally compositions could be useful to kickstart some dev environment that dependent on many pieces. But if we want an exit strategy, `RACE` mode can rescue us.

## Race

Race compositions will start every child script and exit as soon as any of them completes.

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

In the above example, we can see the that different composition modes can be put together to achieve more powerful workflows.

# Styling Prefixes

Sqript will print every `Command` output in the terminal with prefixes to enable disambiguation. But as scripts become more complex, especially in parallel modes, things can become hard to understand.

Every Script can have a `styles` property to set the prefix appearance and help identification. Styles support any values recognized by the great [Chalk](https://github.com/chalk/chalk#styles) package they also should be shown in code completion.

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

Please don't judge my aesthetics choices.

# Injecting Environment Variables

Other support feature is the ability to pass environment variables to `Command`s. The `env` can have a string value with the path to some valid `.env` file. Other valid value is an object with string values to be inject in the command.

```ts
-- TODO

export serverLocal: Command = {
  name: "server-local",
  instruction: "webpack serve",
  env: ".env"
}

export serverCi: Command = {
  name: "server-ci",
  instruction: "webpack serve",
  env: {
    myStringEnv: "myStringEnv",
  }
}


    };

    const runner = run(command);
    await runner.code;
    expectCallWith("MY_STRING_ENV");
  });
```

# Contribution

_How can I help?_

Bug reports and feature requests are welcome in the form of issues. However, I decided to keep the project closed to pull requests contributions.

# Wrapping up

_What to expect?_

The project has very limited ambitions. Although some bugs will undoubtedly come, there are not many more features that I expect to add. If you want to talk just contact me via [Social Media](https://joao.melo.plus).

🏜️ Fear is the mind-killer.

# License

Made by [João Melo](https://joao.melo.plus) and licensed under the GNU General Public License v3.0 — see the [LICENSE](LICENSE) file for details.
