import { Express } from 'express';
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app: Express) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};