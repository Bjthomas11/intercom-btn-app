
/* INSERT CODE HERE */
"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const jsdom = require("jsdom");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// http://expressjs.com/en/starter/static-files.html

// http://expressjs.com/en/starter/basic-routing.html
app.use(express.static('public'));
        
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

/* 
  This is an endpoint that Intercom will POST HTTP request when the card needs to be initialized.
  This can happen when your teammate inserts the app into the inbox, or a new conversation is viewed.
  
  
*/

// Demo using plain javascript
() => {
    var button = document.querySelector(".primary");
  var clickBtn = document.querySelector('#ember1044');

  // Disable the button on initial page load
  button.disabled = true;

  //add event listener
  clickBtn.addEventListener('click', function(event) {
      button.disabled = !button.disabled;
    console.log("test");
  });
};

() => {
  const button = document.querySelector(".primary");
  button.addEventListener("click", function(){
    console.log("test");
  })
};


app.post("/initialize", (request, response) => {
  const body = request.body;
  response.send({
    canvas: {
      content: {
        components: [
          { type: "button", label: "Submit", style: "primary", id: "lead-button", action: {type: "submit"} },
        ], 
      },
    },
  });
});
app.post("/submit", (request, response) => {  
  const body = request.body;  
  response.send({
    canvas: {
      content: {
        components: [
          { type: "text", text: "Lead Succesfully Submitted" 
          },
        ], 
      },
    },
  });
});

$(".primary").on("click", function(){
  console.log("test");
});

// var phoneNum = $('#ember1295 > span').text();
