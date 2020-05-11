# pieces

this repo contains the pieces of an app that connects twilio sms to airtable and back again.

a better readme is forthcoming. the gist for now:

1. first, clone [the template airtable](https://airtable.com/shrQ11TVOeT0oCXxo) and get your airtable api keys.
2. [confirm-delivery.js](confirm-delivery.js), [find-subscriber.js](find-subscriber.js), and [update-subscriber](update-subscriber.js) are twilio functions. you'll want to **edit them to include your airtable api keys** and **add them as twilio functions**
3. [foodline.json](foodline.json) is a twilio studio flow. you'll want to **edit it to point to the functions you just created** and then **upload it to studio**.
