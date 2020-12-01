const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/list", (req, res) => {
    const query = `
    SELECT products.*
    FROM users
    JOIN favourites ON user_id = users.id
    JOIN products ON product_id = products.id
    GROUP BY products.id, users.email
    HAVING users.email = '${req.session.email}';
    `;
    db.query(query)
      .then((data) => {
        console.log(data.rows);
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
