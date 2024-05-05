const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

const serviceAUrl = 'http://service-A:3001';
const serviceBUrl = 'http://service-B:3Message Driven Architecture002';
const flaskAppUrl = 'http://flask_app:5000'; // Assuming your Flask app runs on port 5000

app.use('/api/v1/flask-endpoint', (req, res) => {
  proxy.web(req, res, { target: flaskAppUrl }, (err) => {
    console.error(`Error forwarding request to Flask app: ${err.message}`);
    res.status(500).send('Internal Server Error');
  });
});


app.use('/api/v1/banking/pay-bill', (req, res) => {
  console.log(`Incoming request to /api/v1/banking/pay-bill: ${req.method} ${req.url}`);
  
  proxy.web(req, res, { target: serviceAUrl }, (err) => {
    console.error(`Error forwarding request to service A: ${err.message}`);
    res.status(500).send('Internal Server Error');
  });
});

app.use('/api/v1/admin/add-bill', (req, res) => {
  console.log(`Incoming request to /api/v1/admin/add-bill: ${req.method} ${req.url}`);
  
  proxy.web(req, res, { target: serviceBUrl }, (err) => {
    console.error(`Error forwarding request to service B: ${err.message}`);
    res.status(500).send('Internal Server Error');
  });
});


// Add this middleware to log the request received by the proxy
proxy.on('proxyReq', function (proxyReq, req, res, options) {
  console.log(`Received request to ${options.target.href}: ${req.method} ${req.url}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
