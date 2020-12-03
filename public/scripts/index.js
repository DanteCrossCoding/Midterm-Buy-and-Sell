/* eslint-disable no-undef */

const createIndexCard = (productData) => {
  const $productCard = $(`
  <div class="col-lg-4 col-md-6 mb-4">
  <div class="card h-100">
    <a href="#"><img class="card-img-top" src="${productData.thumbnail_photo_url}" alt=""></a>
    <div class="card-body">
      <h4 class="card-title">
        <a href="/products/:${productData.id}">${productData.name}</a>
      </h4>
      <h5>${productData.cost}</h5>
      <form action="/api/favourites/add" method="POST">
      <input class="form-control" type="hidden" name="productID" value="${productData.id}">
      <button type="submit">Favorite</button>
    </form>
    </div>
  </div>
  </div>
  `);
  return $productCard;

};

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/index/"
  }).done((products) => {
    for (let product of products) {
      if (product.sold_out) {
        // eslint-disable-next-line camelcase
        product.thumbnail_photo_url = "../images/sold_out.png";
      }
      let $currProductCard = createIndexCard(product);
      $('.row').append($currProductCard);
    }
  });
});
