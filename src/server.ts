import express from "express";
import cors from "cors";
import Database from "better-sqlite3";


const db = Database("./db/data.db", { verbose: console.log });
const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;

const getMuseums = db.prepare(`
SELECT * FROM museums;
`);
const getWorks = db.prepare(`
SELECT * FROM works;
`);
app.get("/museums", (req, res) => {
  res.send(getMuseums.all());
});
app.get("/works", (req, res) => {
  res.send(getWorks.all());
});

app.listen(port, () => {
  console.log(`
App running: http://localhost:${port}`);
});
