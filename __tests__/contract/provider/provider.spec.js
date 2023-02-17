import { Verifier } from '@pact-foundation/pact';

const providerService = `http://localhost:3378`;

describe('Pact Verification', () => {
  it('should validate the expectations of the consumer service', () => {
    const brokerOpts = {
      provider: 'api-exemple',
      providerBaseUrl: providerService,
      pactUrls: [`http://localhost:9292/pacts/provider/api-exemple/consumer/app-mobile-exemple/latest`],
      publishVerificationResult: true,
      providerVersion: '1.0.0'
    };

    return new Verifier(brokerOpts).verifyProvider();
  })
});