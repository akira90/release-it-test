const mockConsole = require("jest-mock-console").default;
const { info, ok, err } = require("../log");

describe("test log functions", () => {
  beforeEach(() => {
    mockConsole();
  });
  it("err calls console.error()", () => {
    err("hello");
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it("info calls console.log()", () => {
    info("hello");
    expect(console.log).toHaveBeenCalledTimes(1);
  });
  it("ok calls console.log()", () => {
    ok("hello");
    expect(console.log).toHaveBeenCalledTimes(1);
  });
});
