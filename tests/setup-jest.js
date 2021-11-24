import { jest } from "@jest/globals"; //required by jestjs.io/docs/ecmascript-modules

global.console.info = jest.fn(() => undefined);
