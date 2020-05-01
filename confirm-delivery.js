const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'your api key' })
  .base('your base');

exports.handler = (context, {subscriber, delivery, confirmed, response}, done) =>
  base('confirmations').create([
      {
        fields: { subscriber: [subscriber], confirmed, delivery: [delivery], response }
      }
    ]).then(records => done(null, records), done)
