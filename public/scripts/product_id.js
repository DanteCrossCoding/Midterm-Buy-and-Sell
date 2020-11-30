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
    </div>
  </div>
  `);

  return $productCard;

}


$(() => {
  const num = window.location.pathname.split(':');
  $.ajax({
    method: "GET",
    url: `/products/:${num[1]}/api`
  }).done((product) => {
    console.log(product)
    // for(product of products) {
    //   let $currProductCard = createProductCard(product);
    //   $('.row').append($currProductCard);
    // }
    let $currProductCard = createProductIDCard(product);
    $('.row').append($currProductCard);
  });;
});
