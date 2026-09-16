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
const sslKeyPath = '/etc/ssl/private.key';
const sslCertPath = '/etc/ssl/certificate.crt';
const sslCaPath = '/etc/ssl/ca_bundle.crt';
const hasSslFiles =
  process.env.NODE_ENV === 'production' &&
  fs.existsSync(sslKeyPath) &&
  fs.existsSync(sslCertPath) &&
  fs.existsSync(sslCaPath);

if (hasSslFiles) {
  const options = {
    key: fs.readFileSync(sslKeyPath, 'utf8'),
    cert: fs.readFileSync(sslCertPath, 'utf8'),
    ca: fs.readFileSync(sslCaPath, 'utf8'),
  };
  server = https.createServer(options, app);
} else {
  // Production VPS uses HTTP; put HTTPS on Nginx if needed.
  // Missing /etc/ssl certs must not crash the live process.
  if (process.env.NODE_ENV === 'production') {
    logger.warn('SSL certs not found; starting production server over HTTP');
  }
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

// ✅ Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
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
const topicRoutes = require('./routes/topicRoutes'); // [NEW] Topic Routes

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// For backward compatibility or if Nginx proxies /api to /
app.get('/api', (req, res) => {
  res.send('API is running 🚀');
});

app.use('/davidsacademy', loginRoutes);
app.use('/davidsacademy/exam', examRoutes);
app.use('/davidsacademy/course', courseRoutes);
app.use('/davidsacademy/student', studentRoutes);
app.use('/davidsacademy/admin', adminRoute);
app.use('/davidsacademy/topic', topicRoutes); // [NEW] Mount Topic API

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
const PORT = process.env.PORT;
server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT} (${hasSslFiles ? 'HTTPS' : 'HTTP'})`);
});
