const { generateWords, WordsError } = require('../../src/words');

describe('generateWords', () => {
  test('should generate proper number of words', () => {
    const result = generateWords(2);

    expect(result.split(' ')).toHaveLength(2)
  });

  test('should throw error if argument is not a number', () => {
    expect(() => generateWords('not-a-number')).toThrow(new WordsError('count is not a number'));
  });

  test('should throw error if argument is not a finite number', () => {
    expect(() => generateWords(Infinity)).toThrow(new WordsError('count is not a finite number'));
  });

  test('should throw error if argument is a negative number', () => {
    expect(() => generateWords(-1)).toThrow(new WordsError('count should be a positive number'));
  });

  test('should throw error if you try to generate more than 10 errors', () => {
    expect(() => generateWords(11)).toThrow(new WordsError('count is more than 10'));
  });
})
