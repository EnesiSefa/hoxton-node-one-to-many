import Database from "better-sqlite3";

const db = Database("./db/data.db", { verbose: console.log });

const museums = [
  { id: 1, name: "Louvre Museum" },
  { id: 2, name: "The British Museum" },
];
const works = [
  {
    id: 1,
    name: "Mona Lissa",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",

    year: 1503,
    painter: "Leonardo da Vinci",
    museumId: 1,
  },
  {
    id: 2,
    name: "La Primavera",
    photo:
      "https://artincontext.org/wp-content/uploads/2022/01/Mythological-Famous-Artwork.jpg",
    year: 1480,
    painter: "Sandro Botticelli",
    museumId: 1,
  },
];
const deleteWorksTable = db.prepare(`
    DROP TABLE IF EXISTS works
    `);
    deleteWorksTable.run()

const deleteMuseums = db.prepare(`
    DROP TABLE IF EXISTS museums
    `);
deleteMuseums.run();
const createMuseumsTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS museums (
      id INTEGER ,
      name TEXT NOT NULL,
      PRIMARY KEY (id)
  );`);
createMuseumsTable.run();

const createMuseumsRow = db.prepare(`
    INSERT INTO museums (name) VALUES (@name);
    `);
for (let museum of museums) {
  createMuseumsRow.run({ name: museum.name });
}

const createWorksTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS works(
        id INTEGER ,
        name TEXT NOT NULL,
        painter TEXT NOT NULL,
        photo TEXT,
        year INTEGER,
        museumId INTEGER,
        PRIMARY KEY (id),
        FOREIGN KEY (museumId) REFERENCES museums(id)
        )
    `);
createWorksTable.run();

const createWorksRow = db.prepare(`
    INSERT INTO works (name,painter,photo,year,museumId) VALUES (@name,@painter, @photo, @year, @museumId)`);
for (let work of works) {
  createWorksRow.run({
    name: work.name,
    painter: work.painter,
    photo: work.photo,
    year: work.year,
    museumId: work.museumId,
  });
}
