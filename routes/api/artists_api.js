const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/api", (req, res) => {
    let query = `SELECT * FROM artists`;
    console.log("Artist API called", query);
    db.query(query)
      .then(data => {
        res.send(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
