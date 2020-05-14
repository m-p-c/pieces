# pieces

this repo contains various tools to help mutual aid projects.
 
this tool connects people who have access to sms to people distributing resources. through an automated text flow powered by twillio, recipients can answer basic questions required to customize a delivery or request, this data then auto populates a customizable database/spreadsheet hybrid called airtable. airtable allows you then to pick a row that will run a mass text to announce deliveries to subscribers. human discretion will be necessary to do needs matching but this can help automate most every other part of the information process. each different mutual aid group can utilize this flow and change it to suit their needs, the tools that make this up are fairly easy to use without knowing how to code.

a better readme is forthcoming. the gist for now:

1. first, clone [the template airtable](https://airtable.com/shrQ11TVOeT0oCXxo) and get your airtable api keys.
2. [confirm-delivery.js](confirm-delivery.js), [find-subscriber.js](find-subscriber.js), and [update-subscriber](update-subscriber.js) are twilio functions. you'll want to **edit them to include your airtable api keys** and **add them as twilio functions**
3. [foodline.json](foodline.json) is a twilio studio flow. you'll want to **edit it to point to the functions you just created** and then **upload it to studio**.