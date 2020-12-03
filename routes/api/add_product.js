const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const artistEmail = req.session.email;
    const merchId = req.body['merch-id'];
    const merchName = req.body['merch-name-id'];
    const merchDescription = req.body['merch-description-id'];
    const cost = req.body.cost;
    const size = req.body['merch-size'];
    const thumbnailURL = req.body['merch-thumbnail-url-id'];
    const coverURL = req.body['merch-cover-photo-url-id'];
    let query = `
    INSERT INTO products (artist_id, merch_id, name, description, cost, size, thumbnail_photo_url, cover_photo_url, sold_out)
    VALUES((SELECT id FROM artists WHERE email = $1), $2, $3, $4, $5, $6, $7, $8, false)
    RETURNING *;
    `;
    db.query(query, [artistEmail, merchId, merchName, merchDescription, cost, size, thumbnailURL, coverURL])
      .then((data) => {
        res.redirect(`/products/:${data.rows[0].id}`);
      })
      .catch((error) => {
        console.log("product add error", error);
      });

  });
  return router;
};
