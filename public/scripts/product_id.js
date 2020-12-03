/* eslint-disable no-undef */
const createProductIDCard = (productData) => {
  const $productCard = $(`
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="${productData[0].thumbnail_photo_url}" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="products/:${productData[0].id}">${productData[0].name}</a>
        </h4>
        <h5>${productData[0].cost}</h5>
        <h5><a href="mailto:${productData[0].artist_email}?subject=${productData[0].name}">Contact us about this product!</a></h5>
        <form action="/api/favourites/add" method="POST">
        <input class="form-control" type="hidden" name="productID" value="${productData.id}">
        <button type="submit">Favorite</button>
      </form>
    </div>
  </div>
  `);
  return $productCard;
};



$(() => {
  const num = window.location.pathname.split(':');
  $.ajax({
    method: "GET",
    url: `/api/products/:${num[1]}/`
  }).done((product) => {
    if (product[0].sold_out) {
      // eslint-disable-next-line camelcase
      product[0].thumbnail_photo_url = "../images/sold_out.png";
    }
    $('.row').append(createProductIDCard(product));
  });
});
