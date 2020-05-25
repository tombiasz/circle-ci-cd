const request = require('supertest');
const { server } = require('../../src/server');

describe('GET / - words handler', () => {
  test('should respond with 2 words by default', async () => {
    const result = await request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(result.body.words.split(' ')).toHaveLength(2)
  });

  test('should respond with number of words passed as "count" query param', async () => {
    const count = 6;

    const result = await request(server)
      .get('/')
      .query({ count })
      .expect('Content-Type', /json/)
      .expect(200)

    expect(result.body.words.split(' ')).toHaveLength(count)
  });

  test('should respond with error if count is not a number', async () => {
    const result = await request(server)
      .get('/')
      .query({ count: 'not-a-number' })
      .expect('Content-Type', /json/)
      .expect(400)

    expect(result.body.error).toBe('count is not a number')
  });

  test('should respond with error if count is a negative number', async () => {
    const result = await request(server)
      .get('/')
      .query({ count: -123 })
      .expect('Content-Type', /json/)
      .expect(400)

    expect(result.body.error).toBe('count should be a positive number')
  });

  test('should respond with error if count is a negative number', async () => {
    const result = await request(server)
      .get('/')
      .query({ count: Infinity })
      .expect('Content-Type', /json/)
      .expect(400)

    expect(result.body.error).toBe('count is not a finite number')
  });

  test('should respond with error if count is more than 10', async () => {
    const result = await request(server)
      .get('/')
      .query({ count: 11 })
      .expect('Content-Type', /json/)
      .expect(400)

    expect(result.body.error).toBe('count is more than 10')
  });
});
