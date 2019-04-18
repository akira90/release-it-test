const mockConsole = require("jest-mock-console").default;

const mockedExec = jest.fn();
const mockedExit = jest.fn();

jest.mock("shelljs", () => ({
  exec: mockedExec,
  exit: mockedExit,
  config: {}
}));

const mockErr = jest.fn();
const mockOk = jest.fn();
const mockInfo = jest.fn();

jest.mock("../log", () => ({
  err: mockErr,
  ok: mockOk,
  info: mockInfo
}));

const mock_release_it = jest.fn();
jest.mock("release-it", () => mock_release_it);

const { release } = require("../release");

describe("release", async () => {
  it("throws error if git fails", async () => {
    mockedExec.mockImplementation(() => ({
      stdout: "",
      stderr: "it failed",
      code: 1
    }));

    try {
      await release();
    } catch (err) {
      expect(err.message).toMatch(/git command failed:/);
    }
  });

  it("detects no commits", async () => {
    mockedExec.mockImplementation(() => ({
      stdout: "0",
      stderr: "",
      code: 0
    }));

    await release();
    expect(mockOk).toBeCalledWith(
      "no changes found since last release, no need to release"
    );
  });

  it("releases it", async () => {
    mockedExec.mockImplementation(() => ({
      stdout: "1",
      stderr: "",
      code: 0
    }));

    await release();

    expect(mock_release_it).toBeCalledWith({
      "dry-run": false,
      "non-interactive": true,
      verbose: true
    });
  });
});
