
/* INSERT CODE HERE */
"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var Intercom = require('intercom-client');
// const jsdom = require("jsdom");
// const {JSDOM} = jsdom;

const app = express();
router.use(express.json());

// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }
 
//     var $ = require("jquery")(window);
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(__dirname));

// http://expressjs.com/en/starter/static-files.html

// http://expressjs.com/en/starter/basic-routing.html
// app.use(express.static('public'));
        
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

/* 
  This is an endpoint that Intercom will POST HTTP request when the card needs to be initialized.
  This can happen when your teammate inserts the app into the inbox, or a new conversation is viewed.
  
  
*/

// Demo using plain javascript
// () => {
//     var button = document.querySelector(".primary");
//   var clickBtn = document.querySelector('#ember1044');

//   // Disable the button on initial page load
//   button.disabled = true;

//   //add event listener
//   clickBtn.addEventListener('click', function(event) {
//       button.disabled = !button.disabled;
//     console.log("test");
//   });
// };

// () => {
//   const button = document.querySelector(".primary");
//   button.addEventListener("click", function(){
//     console.log("test");
//   })
// };

// Lead api https://api.intercom.io/contacts

// LIST ALL LEADS
// $ curl https://api.intercom.io/contacts \
// -H 'Authorization:Bearer G9rOjIyM2JkMzA2XzBhNGZfNDkwOF9hYmEzXzg4NDM0ZDljNjM5MjoxOjA='' \
// -H 'Accept: application/json'

// token: dG9rOjIyM2JkMzA2XzBhNGZfNDkwOF9hYmEzXzg4NDM0ZDljNjM5MjoxOjA
// -H 'Authorization:Bearer dG9rOjIyM2JkMzA2XzBhNGZfNDkwOF9hYmEzXzg4NDM0ZDljNjM5MjoxOjA=' \


router.post("/initialize", (request, response) => {
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
router.post("/submit", (request, response) => {  
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
