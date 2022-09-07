import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const db = Database("./db/data.db", { verbose: console.log });
const app = express();
const port = 4000;
app.use(cors());
const getMuseums = db.prepare(`
SELECT * FROM museums;
`);
const getWorks = db.prepare(`
SELECT * FROM works;
`);
app.get("/museums", (req, res) => {
  res.send(getMuseums);
});
app.get("/works", (req, res) => {
  res.send(getWorks);
});

app.listen(port, () => {
  `
App running: http://localhost:${port}`;
});
