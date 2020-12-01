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
      <form action="/api/favourites/add" method="POST">
        <button name="favourite-button" type="submit" value="${productData.id}">Favourite</button>
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
      writeProducts(product);
      productArray.push(product);
    }
  });

  $("#lth-button").click(function() {
    console.log(productArray);
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
