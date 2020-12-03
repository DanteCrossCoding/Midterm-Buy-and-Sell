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
        <input class="form-control" type="hidden" name="productID" value="${productData[0].id}">
        <button class="favourite-button" type="submit">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
        </button>
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
