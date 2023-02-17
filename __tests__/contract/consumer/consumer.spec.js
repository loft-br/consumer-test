import 'dotenv/config';

import { Pact } from '@pact-foundation/pact';
import { eachLike, somethingLike, integer } from '@pact-foundation/pact/src/dsl/matchers';
import path from 'path';

import { fetchCharacters } from '../../../src/service/api';

const mockProvider = new Pact({
  consumer: 'app-mobile-exemple',
  provider: 'api-exemple',
  port: parseInt(process.env.MOCK_SERVER_PORT),
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'WARN',
  spec: 2,
  cors: true
});

describe('API Pact Test - listings', () => {
  beforeAll(async () => 
    await mockProvider.setup().then(() => {
      mockProvider.addInteraction({
        uponReceiving: 'a request to list all listings',
        withRequest: {
          method: 'GET',
          path: '/listings'
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: eachLike (
            {
              id: integer(1),
              street: somethingLike('Pires do Rio'),
              number: integer(58)
            },
            { min: 5 }
          )
        }
      });
    })
  );

  afterEach(() => mockProvider.verify());

  afterAll(() => mockProvider.finalize());

  it('should return the expected data', async () => {
    const response = await fetchCharacters();

    const {id, street, number } = response.data[0];

    expect(response.status).toEqual(200);
    expect(id).toBe(1);
    expect(street).toBe('Pires do Rio');
    expect(number).toBe(58);
  });
});