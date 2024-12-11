require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const awsServerlessExpress = require('aws-serverless-express');
const CommandService = require('./services/command');
const QueryService = require('./services/query');
const { PrismaClient } = require('@prisma/client');

const port = process.env.API_PORT ?? 3000;
const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

const commandService = new CommandService(prisma);
const queryService = new QueryService(prisma);

app.get('/url/:code', async (req, res) => {
  try {
    const code = req.params.code;
    const url = await queryService.findOneByCode(code);
    if (!url) {
      res.status(404).send('URL not found');
    } else {
      res.send(url);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/url', async (req, res) => {
  try {
    const urls = await queryService.findAll();
    res.json(urls);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/url', async (req, res) => {
  try {
    const url = req.body.url;
    if (!url) {
      res
        .status(400)
        .send("Body must contain a 'url' key with the URL to shorten");
      return;
    }

    const newCode = await commandService.shortUrl(url);

    res.json({
      code: newCode,
      original: url,
    });
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`URL Shortener API listening on port ${port}`);
});

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
