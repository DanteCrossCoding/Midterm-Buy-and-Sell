const express = require('express');
const router  = express.Router();

module.exports = ((db) => {
  router.get('/', (req, res) => {
    const query = `
    SELECT * FROM products WHERE artist_id = (SELECT id FROM artists WHERE email = $1)
    `;
    db.query(query, [req.session['artist-email']])
      .then((data) => {
        res.send(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
});
