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

router.get("/votes", (_req, res, _next) => {
  pool.getConnection().then(async (conn) => {
    return conn
      .query(
        `
        SELECT a.id, a.name, count(v.animalid) count
        FROM animals a 
        LEFT JOIN votes v on a.id = v.animalid 
        GROUP BY a.id;
      `
      )
      .then((result) => {
        const list = result.map((e) => ({
          id: e.animalid,
          name: e.name,
          count: Number(e.count),
        }));

        res.json(list);
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

module.exports = router;
