/* 상품 목록 누르면 형광펜 효과, 목록 교체 */
const $recommend = document.querySelector(".menu_recommend");
const $newArrivals = document.querySelector(".menu_new");
const $bestItem = document.querySelector(".menu_best");

let newarrivalItemList = null;
let recommendItemList = null;
let bestItemList = null;

fetch("./json/newarrivals.json")
  .then((res) => res.json())
  .then((result) => {
    newarrivalItemList = result;
    makeList(newarrivalItemList); //초기화면 설정
  });

fetch("./json/recommend.json")
  .then((res) => res.json())
  .then((result) => {
    recommendItemList = result;
  });

fetch("./json/bestitem.json")
  .then((res) => res.json())
  .then((result) => {
    bestItemList = result;
  }); //fetch는 그냥 처음 한번만 연결하면 됨!

/* 신상품 */
$newArrivals.addEventListener("click", (e) => {
  $newArrivals.classList.add("menu_line");
  $recommend.classList.remove("menu_line");
  $bestItem.classList.remove("menu_line");
  makeList(newarrivalItemList);
});

/* 추천 상품 */
$recommend.addEventListener("click", (e) => {
  $recommend.classList.add("menu_line");
  $newArrivals.classList.remove("menu_line");
  $bestItem.classList.remove("menu_line");
  makeList(recommendItemList);
});

/* 베스트 상품 */
$bestItem.addEventListener("click", (e) => {
  $bestItem.classList.add("menu_line");
  $newArrivals.classList.remove("menu_line");
  $recommend.classList.remove("menu_line");
  makeList(bestItemList);
});

/* 상품 목록 불러오기 */
const $swiperWrapper = document.querySelector(".swiper-wrapper");

//json 내용 함수로 만들기
function makeList(data) {
  $swiperWrapper.innerHTML = null;
  data.forEach((item) => {
    const $div = document.createElement("div");
    $div.className = "item_pic_box swiper-slide";
    $div.innerHTML = `
    <div id="item_pic_${item.id}" class="itemPic">
      <img src="${item.image}">
      <div class="pic_explain">
        <p class="item_title_${item.id}">${item.title}</p>
        <p class="item_price_${item.id}">${item.price.toLocaleString(
      "ko-KR"
    )}원</p>
      </div>
    </div>`;
    $swiperWrapper.appendChild($div);

    //img hover 시 이름, 가격, 어둡게
    const $imgHover = document.querySelectorAll(".itemPic");
    const $imgExplain = document.querySelectorAll(".pic_explain");

    $imgHover.forEach((item, idx) => {
      const imgChangeDarken = item.querySelector("img");
      item.addEventListener("mouseover", (e) => {
        $imgExplain.forEach((list, idx2) => {
          if (idx === idx2) {
            list.style.display = "block";
            imgChangeDarken.style.filter = "brightness(65%)";
          }
        });
      });
      item.addEventListener("mouseout", (e) => {
        $imgExplain.forEach((list, idx2) => {
          if (idx === idx2) {
            list.style.display = "none";
            imgChangeDarken.style.filter = "none";
          }
        });
      });
    });
  });

  createSwiper();
}

/* swiper 연결 */
var swiper = null; //전역변수
function createSwiper() {
  if (swiper) {
    swiper.destroy(true, true);
  }
  swiper = new Swiper(".swiper", {
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
  }); //swiper를 호출하기 위해서 함수로 만들어 줌
}

/* 미디어쿼리 */

/* contentMood에 buy now 텍스트 삭제 */
const $buyText = document.querySelector(".left_buy");
function mobResize() {
  window.addEventListener("scroll", (e) => {
    if (innerWidth <= 1220) {
      $buyText.style.display = "none";
    } else {
      $buyText.style.display = "block";
    }
  });
}
mobResize();

/* 커뮤니티 이동 텍스트 내용 변경 */
const $CommuText = document.querySelector(".commu_text");

function CommuTextChange() {
  window.addEventListener("scroll", (e) => {
    if (innerWidth > 750) {
      $CommuText.innerHTML = `
          <span>#HAPPY</span><span>#EXCITED</span><span>#ANGRY</span><span>#SLEEPY</span>
          <pre></pre>
          <span>#SAD</span><span>#PLEASED</span><span>#BORED</span><span>#RELAXED</span>
          <pre></pre>
          <span>#NERVOUS</span><span>#PEACEFUL</span><span>#LONELY</span><span>#CALM</span>
      `;
    } else {
      $CommuText.innerHTML = `
          <span>#HAPPY</span><span>#EXCITED</span>
          <pre></pre>
          <span>#ANGRY</span><span>#SLEEPY</span>
          <pre></pre>
          <span>#SAD</span><span>#PLEASED</span>
          <pre></pre>
          <span>#BORED</span><span>#RELAXED</span>
          <pre></pre>
          <span>#NERVOUS</span><span>#PEACEFUL</span>
          <pre></pre>
          <span>#LONELY</span><span>#CALM</span>
      `;
    }
  });
}
CommuTextChange();
