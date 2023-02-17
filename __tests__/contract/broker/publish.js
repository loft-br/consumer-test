import 'dotenv/config';

import  publisher  from '@pact-foundation/pact-node';
import path from 'path';

if (process.env.PACT_LOCAL_BROKER) {
  const opts = {
      pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts/')],
      pactBroker: process.env.PACT_LOCAL_BROKER,
      tags: ['test'],
      consumerVersion: '1.0.0',
  };

  publisher.publishPacts(opts)
    .catch(e => {
      console.log('Publishing failed: ', e.message);
    });
} else {
  console.log('None value defined to PACT_BROKER env variable');
}