/* 상품 목록 누르면 형광펜 효과, 목록 교체 */
const $recommend = document.querySelector(".menu_recommend");
const $newArrivals = document.querySelector(".menu_new");
const $bestItem = document.querySelector(".menu_best");

/* 신상품 */
$newArrivals.addEventListener("click", (e) => {
  $newArrivals.classList.add("menu_line");
  $recommend.classList.remove("menu_line");
  $bestItem.classList.remove("menu_line");
});

/* 추천 상품 */
$recommend.addEventListener("click", (e) => {
  $recommend.classList.add("menu_line");
  $newArrivals.classList.remove("menu_line");
  $bestItem.classList.remove("menu_line");

  fetch("./json/recommend.json")
    .then((res) => res.json())
    .then((result) => {
      recommendList(result);
    });

  function recommendList(result) {
    result.forEach((item) => {
      const $changeRecommend = document.querySelector(".item_pic_box");
      $changeRecommend.innerHTML = `
      <div class="item_pic_${item.id}">
        <img src="${item.image}">
        <div class="item_title_${item.id}">${item.title}</div>
        <div class="item_price_${item.id}">${item.price}</div>
      </div>`;
      $swiperWrapper.appendChild($changeRecommend);
    });
  }
});

/* 베스트 상품 */
$bestItem.addEventListener("click", (e) => {
  $bestItem.classList.add("menu_line");
  $newArrivals.classList.remove("menu_line");
  $recommend.classList.remove("menu_line");

  fetch("./json/bestitem.json")
    .then((res) => res.json())
    .then((list) => {
      bestList(list);
    });

  function bestList(list) {
    list.forEach((item) => {
      const $changeBest = document.querySelector(".item_pic_box");
      $changeBest.innerHTML = `
      <div class="item_pic_${item.id}">
        <img src="${item.image}">
        <div class="item_title_${item.id}">${item.title}</div>
        <div class="item_price_${item.id}">${item.price}</div>
      </div>`;
      $swiperWrapper.appendChild($changeBest);
    });
  }
});

/* item 목록 json 연결*/
const $swiperWrapper = document.querySelector(".swiper-wrapper");

fetch("./json/newarrivals.json")
  .then((res) => res.json())
  .then((data) => {
    makeList(data);
  });

/* 상품 목록 불러오기*/
function makeList(data) {
  data.forEach((item) => {
    const $div = document.createElement("div");
    $div.className = "item_pic_box swiper-slide";
    $div.innerHTML = `
    <div class="item_pic_${item.id}">
      <img src="${item.image}">
      <div class="item_title_${item.id}">${item.title}</div>
      <div class="item_price_${item.id}">${item.price}</div>
    </div>`;
    $swiperWrapper.appendChild($div);
  });

  /* swiper 연결 */
  var swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      "@0.00": {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      "@0.75": {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      "@1.00": {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      "@1.50": {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });
}
