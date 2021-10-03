import { prompt } from 'enquirer';

export async function obtainName(availableNames: string[]): Promise<string> {
  const cliName = process.argv[2];
  if (typeof cliName === 'string' && availableNames.includes(cliName)) {
    return cliName
  };

  const response = await prompt({
    type: 'select',
    name: 'name',
    message: 'Choose a script to run',
    choices: availableNames
  });
  assertIsUserResponse(response);

  const { name } = response;
  return name;    
}

interface UserScriptSelection {
  name: string;
}

function assertIsUserResponse(response: object): asserts response is UserScriptSelection {
  const { name } = (response as UserScriptSelection);
  if (!(typeof name === 'string' )) {
    throw new Error('Invalid user response')
  }
}