// jest.mock("../lib/release");
const mockConsole = require("jest-mock-console").default;

describe("release IIFE", () => {
  beforeAll(() => {
    mockConsole();
  });
  beforeEach(() => {
    jest.resetModules();
  });

  it("invokes release when imported", async () => {
    const mock_release_fn = jest.fn();
    jest.mock("../lib/release", () => {
      return { release: mock_release_fn };
    });

    const { release } = require("../release");
    expect(mock_release_fn).toBeCalledTimes(1);
  });

  it("catches and prints errors", async () => {
    const mock_release_fn = () => {
      throw "mock error";
    };
    jest.mock("../lib/release", () => {
      return { release: mock_release_fn };
    });
    const mock_err_fn = jest.fn();

    jest.mock("../lib/log", () => {
      return { err: mock_err_fn };
    });
    const { release } = require("../release");
    expect(mock_err_fn).toBeCalledWith("release failed");
  });
});
