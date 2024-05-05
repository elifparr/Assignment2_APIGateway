const express = require('express');

const app = express();
const port = 3001;

app.get('/api/v1/banking/pay-bill', (req, res) => {
  console.log(`Received request to /api/v1/banking/pay-bill: ${req.method} ${req.url}`);
  res.status(200).send('Response from Bank-Pay Bill');
});

app.listen(port, () => {
  console.log(`Service A listening on port ${port}`);
});