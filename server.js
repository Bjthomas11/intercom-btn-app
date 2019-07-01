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
  if(name && phone && street_address && city && state && zip){
      var lead = new Object();
      lead.APIKey = "1234234";
      lead.AppID = "12";
      lead.name = body.customer.name.val();
      lead.phone = body.customer.phone.val();
      lead.email = body.customer.email.val();
      lead.street_address = body.customer.custom_attributes["Property Street Address"].val();
      lead.city = body.customer.custom_attributes["Property City"].val();
      lead.state = body.customer.custom_attributes["Property State or Province"].val();
      lead.zip = body.customer.custom_attributes["Property Postal Code"].val();
      lead.leadSource = "test";
      lead.custom1 = $("#custom1").val();
      lead.id = "1";

      var APIKey = "1234234";
      var RefID = "12";

      function make_base_auth(APIKey, RefID) {
        var tok = btoa(APIKey) + ":" + btoa(RefID);

        return "Basic " + tok;
      }

      $.ajax({
        url: "http://arch-form.advestors.net/v2/leads/create",
        type: "POST",
        contentType: "application/json",

        data: JSON.stringify(lead),
        beforeSend: function(data) {
          data.setRequestHeader(
            "Authorization",
            make_base_auth(APIKey, RefID)
          );
        },
        success: function(data, textStatus, xhr) {
          console.log(JSON.stringify(data));
        },
        error: function(xhr, textStatus, errorThrown) {
          console.log("Error");
        }
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
          { type: "text", text: "not valid", 
           style: "header", align: "center" },
        ], 
      },
    },
  });
  }
});