var express = require("express");
var router = express.Router();

const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: "root",
  password: "rootpass",
  connectionLimit: 5,
  database: "vote",
});

router.get("/animals", (_req, res, _next) => {
  pool.getConnection().then(async (conn) => {
    return conn
      .query("SELECT * FROM animals")
      .then((result) => {
        res.status(200);
        res.json(result);
        res.end();
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.end();
      })
      .finally(() => {
        conn.end();
      });
  });
});

router.post("/vote", (req, res, _next) => {
  let vote = parseInt(req.query.animal);

  pool.getConnection().then(async (conn) => {
    try {
      try {
        await conn.query(
          "INSERT INTO votes SET animalid = (SELECT id FROM animals WHERE id=?)",
          [vote]
        );

        res.status(200);
        res.end();
      } catch {
        res.status(301);
        res.end();
      }
    } finally {
      conn.end();
    }
  });
});

module.exports = router;
