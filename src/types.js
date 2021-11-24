export const TYPES = {
  COMMAND: "TYPES.COMMAND",
  RELAY: "TYPES.RELAY",
  SERIAL: "TYPES.SERIAL",
  RALLY: "TYPES.RALLY",
  RACE: "TYPES.RACE",
};

export function resolveType(script) {
  if (script.command) return TYPES.COMMAND;
  if (script.relay) return TYPES.RELAY;
  if (script.serial) return TYPES.serial;
  if (script.race) return TYPES.RACE;

  return false;
}
