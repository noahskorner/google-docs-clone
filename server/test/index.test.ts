import request from 'supertest';
import app from '../src/app';

describe('Test the root path', () => {
  test('Root path test', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
