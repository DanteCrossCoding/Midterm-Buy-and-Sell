/* eslint-disable no-undef */
const createArtistPage = (productData) => {
  const $artistCard = $(`
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="${productData.thumbnail_photo_url}" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="artists/:${productData.id}">${productData.name}</a>
        </h4>
        <h5>${productData.cost}</h5>
        <form action="/api/removeproduct/" method="POST">
          <input class="form-control" type="hidden" name="productID" value="${productData.id}">
          <button type="submit">Delete</button>
        </form>
        <form action="/api/sold-out/" method="POST">
          <input class="form-control" type="hidden" name="productID" value="${productData.id}">
          <button type="submit">Mark Sold</button>
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
      if (product.sold_out) {
        // eslint-disable-next-line camelcase
        product.thumbnail_photo_url = "../images/sold_out.png";
      }
      $('.row').append(createArtistPage(product));
    }
  });

});
