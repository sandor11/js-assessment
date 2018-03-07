var validCandidate = languages => {
  if (!languages) {
    return false;
  }
  return testForLanguage(makeInputTestable(languages));
};
exports.validCandidate = validCandidate;

var makeInputTestable = languages => {
  if (Array.isArray(languages)) {
    return languages.join(" ");
  }
  return String(languages);
};
exports.makeInputTestable = makeInputTestable;

var testForLanguage = text => {
  return /script|ES\d{1,4}/g.test(text);
};
exports.testForLanguage = testForLanguage;
