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
let server;
if (process.env.USE_HTTPS === 'true') {
  const key = fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8');
  const cert = fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8');
  const ca = fs.readFileSync(process.env.SSL_CA_PATH, 'utf8');
  server = https.createServer({ key, cert, ca }, app);
  logger.info('HTTPS server enabled');
} else {
  server = http.createServer(app);
  logger.info('HTTP server enabled');
}
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
app.use('/api', loginRoutes);
app.use('/api/exam', examRoutes);
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
