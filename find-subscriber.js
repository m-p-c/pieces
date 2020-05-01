const Airtable = require('airtable')
const base = new Airtable({ apiKey: 'your api key' })
  .base('your base')
const subscribers = base('subscribers')

async function lookup(digits) {
  const results = await subscribers.select({
    maxRecords: 1,
    filterByFormula: `{digits}='${digits}'`
  }).firstPage()
  if (!results[0]) {
      throw new Error('Not Found')
  }
  return results[0]
}

exports.handler = (context, event, done) =>
  lookup(event.digits)
    .then(
        user => done(null, user),
        err => done(err)
    )
