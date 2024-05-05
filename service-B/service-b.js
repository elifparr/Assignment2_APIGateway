const express = require('express');

const app = express();
const port = 3002;

app.get('/api/v1/admin/add-bill', (req, res) => {
  console.log(`Received request to /api/v1/admin/add-bill: ${req.method} ${req.url}`);
  res.status(200).send('Response from Admin - Add Bill');
});

app.listen(port, () => {
  console.log(`Service B listening on port ${port}`);
});
