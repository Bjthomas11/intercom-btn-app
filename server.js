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
  // console.log(body.customer.name);
  // console.log(body.customer.email);
  // console.log(body.customer.phone);
  // console.log(body.customer.custom_attributes["Property Street Address"]);
  // console.log(body.customer.custom_attributes["Property City"]);
  // console.log(body.customer.custom_attributes["Property State or Province"]);
  // console.log(body.customer.custom_attributes["Property Postal Code"]);
  var name = body.customer.name;
  var email = body.customer.email;
  var phone = body.customer.phone;
  var street_address = body.customer.custom_attributes["Property Street Address"];
  var city = body.customer.custom_attributes["Property City"];
  var state = body.customer.custom_attributes["Property State or Province"];
  var zip = body.customer.custom_attributes["Property Postal Code"];
  
//   var test1 = "";
//   var obj1 = {
//     name: body.customer.name,
//     email: body.customer.email
//   }
  
//   for(var test2 in obj1){
//     test1 += obj1[test2];
//   }
//   console.log(test1);
  
  if(name && phone && street_address && city && state && zip){
    console.log("test")
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
  } else {
    response.send({
    canvas: {
      content: {
        components: [
          { type: "text", text: "not valid", 
           style: "header", align: "center" },
        ], 
      },
    },
  });
  }
});