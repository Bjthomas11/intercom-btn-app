/* INSERT CODE HERE */
const express = require('express');
const bodyParser = require('body-parser');
var btoa = require('btoa');
const app = express();
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

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
  //var firstName = body.customer.custom_attributes.firstName;
  //var lastName = body.customer.custom_attributes.lastName;
  var name = body.customer.name;
  var email = body.customer.email;
  var phone = body.customer.phone;
  var address = body.customer.custom_attributes["Property Street Address"];
  var city = body.customer.custom_attributes["Property City"];
  var state = body.customer.custom_attributes["Property State or Province"];
  var zip = body.customer.custom_attributes["Property Postal Code"];
  var parts = name.split(" ");
  var firstName = parts[0];
  if(parts.length > 2){
    var lastName = parts[parts.length];
  }else{
    var lastName = parts[1];
  }
  console.log(`${firstName} - first name`);
  console.log(`${lastName} - last name`);
  console.log(name);
  console.log(parts);
  console.log(body.customer);
  console.log(body.customer.custom_attributes);
  
  
  if(firstName && lastName && phone && address && city && state && zip){
    $(document).ready(function() {
      var lead = new Object();
      // lead.APIKey = "7845444";
    lead.firstName = firstName;
    lead.lastName = lastName;
    lead.phoneNumber = phone;
    lead.email = email;
    lead.address = address;
    lead.city = city;
    lead.state = state;
    lead.zip = zip;

      var APIKey = "7845444";
      var RefID = "47";

      function make_base_auth(APIKey, RefID) {
        var tok = btoa(APIKey) + ":" + btoa(RefID);

        return "Basic " + tok;
      }

      $.ajax({
        url: "http://arch-form.advestors.net/v3/leads/create",
        type: "POST",
        contentType: "application/json",
        data: lead,
        beforeSend: function(data) {
          data.setRequestHeader(
            "Authorization",
            make_base_auth(APIKey, RefID)
          );
        },
        success: function(data, textStatus, xhr) {
          console.log(data);
        },
        error: function(xhr, textStatus, errorThrown) {
          console.log("Error");
          console.log(errorThrown);
          console.log(textStatus);
          console.log(xhr);
        }
      });
    });
    console.log("test");
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
    console.log("empty");
    response.send({
    canvas: {
      content: {
        components: [
          { type: "text", text: "Please fill out all fields", 
           style: "header", align: "center" },
        ], 
      },
    },
  });
  }
});

// username: 7845444
// pswd: 47