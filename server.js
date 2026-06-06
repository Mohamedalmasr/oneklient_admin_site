/* eslint-disable @typescript-eslint/no-require-imports */

process.env.NODE_ENV = process.env.NODE_ENV || "production";

const { createServer } = require("node:http");
const next = require("next");

const rawPort = process.env.PORT || "3000";
const numericPort = Number(rawPort);
const listenTarget = Number.isNaN(numericPort) ? rawPort : numericPort;
const hostname = process.env.HOSTNAME || "0.0.0.0";
const dev = process.env.NODE_ENV === "development";

const app = next({
  dev,
  hostname,
  ...(Number.isNaN(numericPort) ? {} : { port: numericPort }),
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(listenTarget, () => {
    console.log(`ONEklient frontend listening on ${rawPort}`);
  });
});
