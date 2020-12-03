/* eslint-disable no-undef */
const createProductCard = (productData) => {
  const $productCard = $(`
  <div class="col-lg-4 col-md-6 mb-4">
  <div class="card h-100">
    <img class="card-img-top" src="${productData.thumbnail_photo_url}">
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

const productArray = [];



const writeProducts = (productData) => {
  $('.row').append(createProductCard(productData));
};

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/products/"
  }).done((products) => {
    for (product of products) {
      if (product.sold_out) {
        // eslint-disable-next-line camelcase
        product.thumbnail_photo_url = "../images/sold_out.png";
      }
      writeProducts(product);
      productArray.push(product);
    }
  });

  $("#lth-button").click(function() {
    productArray.sort(function(a, b) {
      if (a.cost < b.cost) {
        return -1;
      }

      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
    $('.row').empty();
    for (product of productArray) {
      writeProducts(product);
    }
  });

  $("#htl-button").click(function() {
    productArray.sort(function(a, b) {
      if (a.cost > b.cost) {
        return -1;
      }

      if (a.cost < b.cost) {
        return 1;
      }

      return 0;
    });
    $('.row').empty();
    for (product of productArray) {
      writeProducts(product);
    }
  });

});
