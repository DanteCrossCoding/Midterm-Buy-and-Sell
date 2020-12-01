/* eslint-disable no-undef */
const createProductCard = (productData) => {
  const $productCard = $(`
  <div class="col-lg-4 col-md-6 mb-4">
  <div class="card h-100">
    <a href="#"><img class="card-img-top" src="${productData.thumbnail_photo_url}" alt=""></a>
    <div class="card-body">
      <h4 class="card-title">
        <a href="/products/:${productData.id}">${productData.name}</a>
      </h4>
      <h5>${productData.cost}</h5>
  </div>
</div>
  `);

  return $productCard;

};

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/products/"
  }).done((products) => {
    for (product of products) {
      let $currProductCard = createProductCard(product);
      $('.row').append($currProductCard);
    }
  });
});
