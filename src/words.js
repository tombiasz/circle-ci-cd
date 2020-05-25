const { loremIpsum } = require("lorem-ipsum");

const MAX_WORDS = 10;

class WordsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WordsError';
  }
}

function ensureValidCount(count) {
  if (isNaN(count)) {
    throw new WordsError('count is not a number')
  }

  if (!isFinite(count)) {
    throw new WordsError('count is not a finite number')
  }

  const parsed = parseInt(count, 10);

  if (parsed <= 0) {
    throw new WordsError('count should be a positive number')
  }

  if (parsed > MAX_WORDS) {
    throw new WordsError(`count is more than ${MAX_WORDS}`)
  }

  return parsed;
}

function generateWords(count) {
  return loremIpsum({
    units: 'words',
    count: ensureValidCount(count)
  });
}

module.exports = {
  WordsError,
  generateWords,
}
