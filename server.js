/* INSERT CODE HERE */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
        
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

/* 
  This is an endpoint that Intercom will POST HTTP request when the card needs to be initialized.
  This can happen when your teammate inserts the app into the inbox, or a new conversation is viewed.
*/

app.post("/initialize", (request, response) => {  
  const body = request.body;  
  response.send({
    canvas: {
      content: {
        components: [
          { type: "button", label: "Not Functioning", style: "primary", id: "url_button", action: {type: "submit"} },
        ], 
      },
    },
  });
});

app.post("/submit", (request, response) => {  
  // console.log(request);
  // console.log(response);
  const body = request.body;  
  // console.log(body);
  console.log(body.customer.name);
  console.log(body.customer.email);
  console.log(body.customer.phone);
  console.log(body.customer.custom_attributes);
  response.send({
    canvas: {
      content: {
        components: [
          { type: "text", text: "test", 
           style: "header", align: "center" },
        ], 
      },
    },
  });
});