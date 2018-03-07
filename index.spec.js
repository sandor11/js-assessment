const units = require("./index");
const validCandidate = units.validCandidate;
const makeInputTestable = units.makeInputTestable;
const testForLanguage = units.testForLanguage;

describe("Given we need to ensure the public API for our module is producing the correct result", () => {
  it("will return false for falsy input", () => {
    expect(validCandidate(null)).toBe(false);
    expect(validCandidate(undefined)).toBe(false);
    expect(validCandidate([])).toBe(false);
    expect(validCandidate("")).toBe(false);
    expect(validCandidate(false)).toBe(false);
  });
  it("will return true give a valid string or an array containing one of either script, or an ESX variant", () => {
    const es6 = "ES6";
    const es2017 = ["ES2017"];
    const script = ["script", "array"];
    const scriptStr = "script array with other words.";
    expect(validCandidate(es6)).toBe(true);
    expect(validCandidate(es2017)).toBe(true);
    expect(validCandidate(script)).toBe(true);
    expect(validCandidate(scriptStr)).toBe(true);
  });
});

describe("Given we need to test our input conversion rules", () => {
  it("Will return a string given a string", () => {
    const value = "A string";
    expect(typeof makeInputTestable(value)).toBe("string");
  });

  it("Will return a space separated string given an array", () => {
    const value = ["ES6", "and", "some", "other", "words"];
    expect(typeof makeInputTestable(value)).toBe("string");
    expect(makeInputTestable(value)).toBe("ES6 and some other words");
  });

  it("will return a string given an integer", () => {
    const value = 99999;
    expect(typeof makeInputTestable(value)).toBe("string");
  });
});

describe("Given we need to test our regex for identifying valid javascript keywords", () => {
  it("will return true if the word script is present in a string or an array", () => {
    const value = ["Javascript"];
    expect(testForLanguage(value)).toBe(true);
    expect(testForLanguage(value[0])).toBe(true);
  });

  it("will return true if there is some form of ES6 or ES2017 present in a string or an array", () => {
    const es6 = "ES6";
    const es2017 = ["ES2017"];
    expect(testForLanguage(es6)).toBe(true);
    expect(testForLanguage(es2017)).toBe(true);
  });

  it("will return false if the word script is not present in a string or an array, and there is no valid ES[0-9] values", () => {
    const value = ["Javascrpt"];
    expect(testForLanguage(value)).toBe(false);
    expect(testForLanguage(value[0])).toBe(false);
  });

  it("will return false if there isnoform of ES6 or ES2017 present in a string or an array, and there is no mention of script", () => {
    const es6 = "ESO";
    const es2017 = ["ESFF6"];
    expect(testForLanguage(es6)).toBe(false);
    expect(testForLanguage(es2017)).toBe(false);
  });
});
