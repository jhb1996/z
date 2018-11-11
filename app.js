/**
 * app.js
 */


const express = require('express')

// Create Express app
const app = express()

// A sample route
// app.get('/', (req, res) => res.send('Hello World!'))

// // Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'))  

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('/', function(req, res, next) {
//   // Handle the get for this route
// });

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/', function(req, res, next) {
 // Handle the post for this route
});


// const http = require('http');

// // Create an instance of the http server to handle HTTP requests
// let app = http.createServer((req, res) => {  
//     // Set a response type of plain text for the response
//     res.writeHead(200, {'Content-Type': 'text/plain'});

//     // Send back a response and end the connection
//     res.end('Hello World!\n');
// });

// // Start the server on port 3000
// app.listen(1337, '127.0.0.1');  
// console.log('Node server running on port 3000'); 