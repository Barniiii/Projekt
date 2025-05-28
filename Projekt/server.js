const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const db = new sqlite3.Database('szamlak.db', (err) => {
  if (err) {
    console.error('Hiba az adatbázishoz csatlakozáskor:', err.message);
  } else {
    console.log('Csatlakozva a szamlak.db adatbázishoz');

    db.run(`
      CREATE TABLE IF NOT EXISTS szamlak (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        szamlaszam TEXT NOT NULL,
        tulajdonos TEXT NOT NULL,
        tipus TEXT NOT NULL,
        egyenleg REAL NOT NULL,
        nyitasdatuma TEXT NOT NULL
      )
    `);
  }
});

app.post('/szamlak', (req, res) => {
  const { szamlaszam, tulajdonos, tipus, egyenleg, nyitasdatuma } = req.body;

  const sql = `
    INSERT INTO szamlak (szamlaszam, tulajdonos, tipus, egyenleg, nyitasdatuma) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [szamlaszam, tulajdonos, tipus, egyenleg, nyitasdatuma], function (err) {
    if (err) {
      console.error('Hiba beszúráskor:', err.message);
      res.status(500).json({ error: 'Adatmentés sikertelen' });
    } else {
      res.status(201).json({ message: 'Számla sikeresen mentve', id: this.lastID });
    }
  });
});

app.get('/szamlak', (req, res) => {
  db.all('SELECT * FROM szamlak', [], (err, rows) => {
    if (err) {
      console.error('Hiba lekérdezéskor:', err.message);
      res.status(500).json({ error: 'Lekérdezés sikertelen' });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Szerver elindult: http://localhost:${PORT}`);
});