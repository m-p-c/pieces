# pieces

this repo contains various tools to help mutual aid projects.
 
this tool connects people who have access to sms to people distributing resources. through an automated text flow powered by twillio, recipients can answer basic questions required to customize a delivery or request, this data then auto populates a customizable database/spreadsheet hybrid called airtable. airtable allows you then to pick a row that will run a mass text to announce deliveries to subscribers. human discretion will be necessary to do needs matching but this can help automate most every other part of the information process. each different mutual aid group can utilize this flow and change it to suit their needs, the tools that make this up are fairly easy to use without knowing how to code.

a better readme is forthcoming. the gist for now:

1. first, clone [the template airtable](https://airtable.com/shrQ11TVOeT0oCXxo)

![screen shot of airtable clone option](Screen%20Shot%202020-05-13%20at%2010.23.31%20PM.png)

3. go to Help > API Documentation to get the id of the airtable base that you just cloned
4. get your airtable api key from your [airtable account page](https://airtable.com/account).
5. get the id for the base by going to the cloned table, clicking on "help" and accessing "API documentation"
    1. The introduction will tell you the id of the base (alpha-numeric code)
5. [confirm-delivery.js](confirm-delivery.js), [find-subscriber.js](find-subscriber.js), and [update-subscriber](update-subscriber.js) are twilio functions. you'll want to **edit them to include your airtable api keys** and **add them as twilio functions**
    1. You'll need to edit the apiKey and the base, filling in the values you obtained in the previous step 
10. In your twilio account, access "functions" (third icon on left-hand side)
11. In the functions menu, go to "configure" and add a dependency: name = airtable, version = ^0.8.1
12. in the function menu, go to "manage"
13. copy+paste each of the .js files above into new functions.  Make sure to remember the names/paths that you set
14. Access the "studio" (second icon on the left-hand side)
15. Click the "+" icon to add a new flow
16. Scroll down to "import from JSON"
17. Upload the [foodline.json](foodline.json) as your new flow, You should see a full SMS flow appear.
18. Update the lookup_subscriber block to use the find-subscriber function
19. Update the update_subscriber block to use the update-subscriber function
20. Update the accept_delivery and reject_delivery to use the confirm-delivery function
21. You should now have a minimal working example that should respond to SMS.  You will need to edit the flow and the Twilio variables to be appropriate for your group/workflow.   
