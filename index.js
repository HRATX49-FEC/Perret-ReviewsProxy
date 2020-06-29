require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer({});
const bodyParser = require('body-parser');

const ServerOne = 'http://localhost:5200/';
      // ServerTwo = 'http://localhost:5100',
      // ServerThree = 'http://localhost:5300',
      // ServerFour = 'http://localhost:5400';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/reviews", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: ServerOne});
});

// app.get("/app2/*", function(req, res) {
//     console.log('redirecting to Server2');
//     apiProxy.web(req, res, {target: ServerTwo});
// });

// app.get("/app3/*", function(req, res) {
//     console.log('redirecting to Server3');
//     apiProxy.web(req, res, {target: ServerThree});
// });

// app.get("/app4/*", function(req, res) {
//     console.log('redirecting to Server3');
//     apiProxy.web(req, res, {target: ServerFour});
// });

app.listen(process.env.PORT, () => {
  console.log(`Ready on port: ${process.env.PORT}`)
})