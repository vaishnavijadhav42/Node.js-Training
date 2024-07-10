const express = require('express');
const path = require('path');
const app = express();

const publicpath=path.join(__dirname,'public')
// Middleware to parse the body of POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files 
app.use(express.static(publicpath));

app.get('/', (req, res) => {
  res.sendFile(`${publicpath}/user_form.html`);
});


app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  
  console.log(`Name: ${name}, Email: ${email} ,Age:${age}`);
  
  // Send a response back to the client
  res.send(`<h3>Name: ${name}  ,   Email: ${email}  , Age:${age}</h3>`);
  
});



// Start the server
app.listen(4000);
