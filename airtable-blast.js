const deliveries = base.getTable('deliveries')
const subscribers = base.getTable('subscribers')

/**
 * @type {deliveriesTable_Record?}
 */
let delivery = null
while (!delivery) {
    output.clear()
    output.markdown(
        '# 💌 send upcoming delivery notification\n\n' +
        'Send a text to all subscribers with delivery information ' +
        'and collect their confirmations / updates.')
    delivery = await input.recordAsync('Pick a delivery to text about', deliveries);
}

const already = delivery.getCellValue('confirmation_sent')
output.table({
    [delivery.getCellValue('type')]: delivery.getCellValue('date'),
})
output.markdown(delivery.getCellValue('contents'))
if (already) {
    output.markdown(`**⚠️ a confirmation text was already sent on ${already}. clicking send will send another. ⚠️**`)
}

const TWILIO_SID = 'your twilio sid'
const TWILIO_TOKEN = 'your twilio token'
const FLOW_URL = `https://studio.twilio.com/your flow execution url`
const From = 'your phone number'

const Authorization = 'Basic ' + btoa(TWILIO_SID + ':' + TWILIO_TOKEN)

const encode = p => 
  Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

/**
 * @param subscriber {subscribersTable_Record}
 */
async function confirm(subscriber) {
    const rsp = await fetch(FLOW_URL, {
        method: 'POST',
        headers: {
            Authorization,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: encode({
            From,
            To: subscriber.getCellValue('digits'),
            Parameters: JSON.stringify({
                subscriber: subscriber.id,
                delivery: delivery.id
            })
        })
    })
    return rsp.json()
}

if (await input.buttonsAsync('notify all subscribers?', [
    {label: 'send', variant: 'primary'},
    {label: 'cancel', variant: 'secondary'},
]) === 'send') {
    const subs = await subscribers.selectRecordsAsync({ fields: ['digits', 'name'] })
    const confirmations = subs.records.map(s => confirm(s).then(console.log, e => console.error))
    console.log(`Sending ${confirmations.length} texts.`)    
    await Promise.all(confirmations)
    console.log('Done.')
}