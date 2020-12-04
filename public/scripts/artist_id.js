/* eslint-disable no-undef */
const createArtistPage = (productData) => {
  const $artistCard = $(`
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="/products/:${productData.product_id}"><img class="card-img-top" src="${productData.thumbnail_photo_url}" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="/products/:${productData.product_id}">${productData.product_name}</a>
        </h4>
        <h5>${productData.cost}</h5>
        <form action="/api/favourites/add" method="POST">
        <input class="form-control" type="hidden" name="productID" value="${productData.product_id}">
        <button class="favourite-button" type="submit">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
        </button>
      </form>
    </div>
  </div>
  `);

  return $artistCard;

};

const artistName = (productData) => {
  return $(`<h2>${productData[0].artist_name}</h2>`);
};

const artistWebsite = (artistWeb) => {
  return $(`<a href=${artistWeb[0].website}>Vist our website!</a>`);
};

const artistImage = (productData) => {
  return $(`<img class="d-block img-fluid" src=${productData[0].artist_image}>
  </div>`);
};

const productArray = [];



const writeProducts = (productData) => {
  $('.row').append(createArtistPage(productData));
};

$(() => {
  const num = window.location.pathname.split(':');
  $.ajax({
    method: "GET",
    url: `/api/artist/:${num[1]}/`
  }).done((data) => {
    if (data[0] === "artist only") {
      $('.col-lg-9').prepend(artistName(data[1]));
      $('.website').append(artistWebsite(data[1]));
      $('.band-photo').prepend(artistImage(data[1]));
    } else {
      $('.col-lg-9').prepend(artistName(data));
      $('.website').append(artistWebsite(data));
      $('.band-photo').prepend(artistImage(data));
      for (product of data) {
        if (product.sold_out) {
          // eslint-disable-next-line camelcase
          product.thumbnail_photo_url = "../images/sold_out.png";
        }
        writeProducts(product);
        productArray.push(product);
      }
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
