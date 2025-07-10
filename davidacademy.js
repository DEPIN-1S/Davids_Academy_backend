var express = require("express");
var cors = require("cors");
var app = express();
var https = require("https");
var http = require("http");
const fs = require("fs");
require("dotenv").config({ encoding: "latin1" });

// var privateKey = fs.readFileSync('/etc/ssl/private.key', 'utf8').toString();

// var certificate = fs.readFileSync('/etc/ssl/certificate.crt', 'utf8').toString();

// var ca = fs.readFileSync('/etc/ssl/ca_bundle.crt').toString();

// var options = { key: privateKey, cert: certificate, ca: ca };

// var server = https.createServer(options, app);

var server = http.createServer(app);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors({
  origin: '*', // or specify your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Frame-Options', 'Content-Security-Policy']
}));
app.use(express.static("./"));

const adminRoute = require('./routes/adminRoute')
app.use('/davidacademy/admin', adminRoute)

server.listen(6040, () => {
  console.log("server running on port 6040");
});
