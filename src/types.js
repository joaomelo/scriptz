export const TYPES = {
  COMMAND: "COMMAND",
  RELAY: "RELAY",
  SERIAL: "SERIAL",
  RALLY: "RALLY",
  RACE: "RACE",
};

export function resolveType(script) {
  if (script.command) return TYPES.COMMAND;
  if (script.relay) return TYPES.RELAY;
  if (script.serial) return TYPES.SERIAL;
  if (script.race) return TYPES.RACE;
  if (script.rally) return TYPES.RALLY;

  return false;
}
