const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const blocks = [];

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const data = req.body;
  const prevHash = blocks.length ? blocks[blocks.length - 1].hash : "0000";
  const block = {
    index: blocks.length,
    timestamp: Date.now(),
    data,
    prevHash,
    hash: Math.random().toString(36).substring(2, 15) // stub hash
  };
  blocks.push(block);
  res.json({ status: "saved", block });
});

app.get('/chain', (req, res) => {
  res.json(blocks);
});

app.listen(3001, () => console.log("Blockchain microservice running"));
