require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const pinoHttp = require('pino-http');
const { logger } = require('../lib/logger');
const PORT = process.env.PORT || 4000;
const allowedOrigin =process.env.FRONTEND_URL;


const app = express();

// ✅ sécurité
app.use(helmet());

app.use(compression());

// ✅ body parser
app.use(express.json());

// ✅ pino HTTP 
app.use(pinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (req.method === 'OPTIONS') return 'debug';
    return 'info';
  }
}));

app.use(cors({
  origin:allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true 
}));
app.use(express.json());

app.use("/api/auth", require("../routes/auth.routes"));
app.use("/api/technologies", require('../routes/technologies.routes'));
app.use("/api/projects", require('../routes/project.routes'));
app.use("/api/contacts", require('../routes/contact.routes'));

app.use((err, req, res, next) => {
  req.log.error({
    err,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
  });

  res.status(err.status || 500).json({
    message: err.message || "Erreur interne",
    ...process
  });
  next(err);
});

app.listen(PORT, ()=>{
    console.log("backend running on port", PORT);
});