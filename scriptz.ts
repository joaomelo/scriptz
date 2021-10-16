import { sxz, TextColor, BgColor, Command } from '../src/types'; //github;lkajhdlhd

export const firebaseEmulators: Command = {
  name: 'emulators',
  instruction: 'firebase emulators:start',
  textColor: TextColor.White,
  bgColor: BgColor.Yellow
};

export const echo: Command = {
  name: 'echo',
  instruction: 'echo "sxz"',
  textColor: TextColor.Black,
  bgColor: BgColor.White
};

sxz([ firebaseEmulators, echo ]); // como importar dinamicamente?