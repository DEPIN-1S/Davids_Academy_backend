// app.js
require('dotenv').config({ encoding: 'latin1' });
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const expressWinston = require('express-winston');
const logger = require('./utils/logger');
const path = require('path');
const app = express();

// ─── HTTPS/HTTP SETUP ──────────────────────────────────────────────────────────

let server;
if (process.env.NODE_ENV === 'production') {
  // Enable HTTPS in production
  const privateKey = fs.readFileSync('/etc/ssl/private.key', 'utf8');
  const certificate = fs.readFileSync('/etc/ssl/certificate.crt', 'utf8');
  const ca = fs.readFileSync('/etc/ssl/ca_bundle.crt', 'utf8');
  const options = { key: privateKey, cert: certificate, ca: ca };
  server = https.createServer(options, app);
} else {
  // Use HTTP in development/local
  server = http.createServer(app);
}

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.static(path.join(__dirname, 'public')));
// ─── REQUEST LOGGING ───────────────────────────────────────────────────────────
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
const adminRoute = require('./routes/adminRoute');

app.use('/davidsacademy', loginRoutes);
app.use('/davidsacademy/exam', examRoutes);
app.use('/davidsacademy/course', courseRoutes);
app.use('/davidsacademy/student', studentRoutes);
app.use('/davidsacademy/admin', adminRoute);

// ─── 404 HANDLER ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ result: false, message: 'Not Found' });
});

// ─── ERROR LOGGING & HANDLER ───────────────────────────────────────────────────
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
