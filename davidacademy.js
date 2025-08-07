// app.js
require('dotenv').config({ encoding: 'latin1' });
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const expressWinston = require('express-winston');
const logger = require('./utils/logger');
const app = express();
// ─── HTTPS SETUP ────────────────────────────────────────────────────────────────


//var privateKey = fs.readFileSync('/etc/ssl/private.key', 'utf8').toString();

// var certificate = fs.readFileSync('/etc/ssl/certificate.crt', 'utf8').toString();

// var ca = fs.readFileSync('/etc/ssl/ca_bundle.crt').toString();

// var options = { key: privateKey, cert: certificate, ca: ca };

//var server = https.createServer(options, app);

 var server = http.createServer(app);


// ─── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// ─── REQUEST LOGGING ────────────────────────────────────────────────────────────
// Logs all HTTP requests via Winston
app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
}));
// ─── ROUTES ────────────────────────────────────────────────────────────────────
const loginRoutes = require('./routes/loginRoutes');
const examRoutes = require('./routes/examRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoute');



app.use('/davidsacademy', loginRoutes);
app.use('/davidsacademy/exam', examRoutes);
app.use('/davidsacademy/course', courseRoutes);
app.use('/davidsacademy/student', studentRoutes);


// ─── 404 HANDLER ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ result: false, message: 'Not Found' });
});
// ─── ERROR LOGGING & HANDLER ──────────────────────────────────────────────────
// Logs error via Winston, then returns JSON
app.use(expressWinston.errorLogger({
  winstonInstance: logger,
}));
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    result: false,
    message: err.message || 'Internal Server Error',
  });
});

// ─── START SERVER ──────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 6040;
server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
