import { Script, Composition, Command } from './script';

interface Runner {
  settled: Boolean;
  start: () => void;
  kill: () => void;
  status: () => Promise<number>
}

class CommandRunner implements Runner {
  settled = false;
  private command;

  constructor(command: Command) {
    this.command = command;
  };

  start() {
    const tag = createTag(command);
    console.info(`${tag}started`);

    // const scriptEnv = parseEnv({ file: envFile, vars: envVars });

    const runningProcess = spawn(command.instruction, {
      shell: true
      // env: scriptEnv
    });

    const kill = () => runningProcess.kill();

    tagToConsole(tag, runningProcess.stdout);
    tagToConsole(tag, runningProcess.stderr);

    const code = new Promise<number>(resolve => {
      runningProcess.on('close', code => {
        const finalCode = code === null ? 1 : code;
        console.info(`${tag}exited with code ${finalCode}`);
        resolve(finalCode);
      });
    });
  }
}


class CompositionRunner {
  private script: Script;
  private children: Runner[] = [];
  private settled = false;

  constructor(script: Script) {
    this.script = script;
    if (isComposition(script)) {
      script.scripts.forEach(s => {
        this.children.push(new Runner(s));
      })
    }
  }

  kill() {
    this.settled = true;
    this.children.forEach(child => child.kill());
  }

  status() {

  }
}

function isComposition(script: Script): script is Composition {
  return (script as Composition).scripts !== undefined;
}