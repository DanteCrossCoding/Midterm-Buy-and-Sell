const createArtistPage = (artistData) => {
  const $artistCard = $(`
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="${artistData.thumbnail_photo_url}" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="artists/:${artistData.id}">${artistData.product_name}</a>
        </h4>
        <h5>${artistData.cost}</h5>
        <form action="/api/removeproduct/" method="POST">
        <input class="form-control" type="hidden" name="productID" value="${artistData.id}">
        <button type="submit">Delete</button>
      </form>
    </div>
  </div>
  `);

  return $artistCard;

};
$(() => {
  $.ajax({
    method: "GET",
    url: `/api/artists/products`
  }).done((data) => {
    for (product of data) {
      $('.row').append(createArtistPage(product));
    }
  });

});
