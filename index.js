/* 상품 목록 누르면 형광펜 효과, 목록 교체 */
const $recommend = document.querySelector(".menu_recommend");
const $newArrivals = document.querySelector(".menu_new");
const $bestItem = document.querySelector(".menu_best");

let newarrivalItemList = null;
let recommendItemList = null;
let bestItemList = null;
let lonelyItemList = null;

// 헤더전체 시작
const $up = document.querySelector(".header-up");
const $upX = document.querySelector(".header-up .fa-xmark");
const $barIcon = document.querySelector(".fa-bars");
const $barMenu = document.querySelector(".bar-menu");
const $cartIcon = document.querySelector(".fa-cart-shopping");
const $cartMenu = document.querySelector(".cart-menu");
const $cartX = document.querySelector(".cart-right-title .fa-xmark");

$upX.addEventListener("click", () => {
  $up.style.display = "none";
});
$barIcon.addEventListener("click", () => {
  if ($barMenu.classList.contains("hidden")) {
    $barMenu.classList.toggle("hidden");
    $cartMenu.classList.toggle("hidden", true);
    $barMenu.classList.remove("menu-off");
    $barMenu.classList.add("menu-on");
  } else {
    $barMenu.classList.remove("menu-on");
    $barMenu.classList.add("menu-off");
    setTimeout(() => {
      $barMenu.classList.toggle("hidden");
      $cartMenu.classList.toggle("hidden", true);
    }, 1400);
  }
});
$cartIcon.addEventListener("click", () => {
  if ($cartMenu.classList.contains("hidden")) {
    $cartMenu.classList.toggle("hidden");
    $barMenu.classList.toggle("hidden", true);
    $cartMenu.classList.remove("cart-off");
    $cartMenu.classList.add("cart-on");
  }
});
$cartX.addEventListener("click", () => {
  if (!$cartMenu.classList.contains("hidden")) {
    $cartMenu.classList.remove("cart-on");
    $cartMenu.classList.add("cart-off");
    setTimeout(() => {
      $cartMenu.classList.toggle("hidden");
      $barMenu.classList.toggle("hidden", true);
    }, 900);
  }
});
//헤더끝

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

fetch("./json/lonelyitem.json")
  .then((res) => res.json())
  .then((result) => {
    lonelyItemList = result;
  });

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

/* 우울함 상품 교체 */

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
        <p class="item_price_${item.id}">${item.price.toLocaleString("ko-KR")}원</p>
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
  window.addEventListener("load", (e) => {
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

    //스크롤 글자 배경색 변경--------------------------------------------------
    const $box = document.querySelector("#contentCommunity");
    const $dummy = document.querySelector("#contentEmpty-choi");
    const $dummy2 = document.querySelector("#contentEmpty2");
    const $dummy3 = document.querySelector("#contentEmpty3");
    const $span = document.querySelectorAll(".commu_text span");
    const $container = document.querySelector("#container");
    const $contentMood = document.querySelector("#contentMood");
    const $contentFixedImg = document.querySelector("#contentFixedImg");
    $span.forEach((e) => {
      e.style.transition = "all 0.3s";
    });
    addEventListener("scroll", () => {
      let value = window.scrollY;
      if (value > 3000 && value < 7800) {
        let aa = Math.round(value * 0.003) - 12;
        const cal251 = Math.min((8500 - value) * 0.05, 251);
        const cal249 = Math.min((8500 - value) * 0.05, 249);
        const cal247 = Math.min((8500 - value) * 0.05, 247);
        $box.style.backgroundColor = `rgb(${cal251},${cal249},${cal247})`;
        $dummy.style.backgroundColor = `rgb(${cal251},${cal249},${cal247})`;
        $dummy2.style.backgroundColor = `rgb(${cal251},${cal249},${cal247})`;
        $dummy3.style.backgroundColor = `rgb(${cal251},${cal249},${cal247})`;
        $container.style.backgroundColor = `rgb(${cal251},${cal249},${cal247})`;
        $contentMood.style.backgroundColor = `rgb(${cal251},${cal249},${cal247})`;
        $contentFixedImg.style.backgroundColor = `rgb(${cal251},${cal249},${cal247})`;
        $span[aa].style.color = `white`;
      }
    });
  });
  // ---------------------------------------------------------------------------------------------
}
CommuTextChange();

// --------------------------------------------------------

/* 기분별 상품 이동 모양 변경 */
const moodRightContent = document.querySelector(".mood_right_container");
function moodRightChange() {
  window.addEventListener("scroll", (e) => {
    if (innerWidth > 1220) {
      moodRightContent.innerHTML = `
      <ul class="mood_right_content">
        <li class="mood_box">
          <a href="#">
            <img src="./img/emotion/angry.jpg" />
          </a>
          <div class="mood_text">
            <div>
              <h2 class="mood_title">ANGRY</h2>
              <p class="mood_more_view">more view</p>
            </div>
          </div>
        </li>
        <li class="mood_box">
          <a href="#">
            <img src="./img/emotion/nervous.jpg" />
          </a>
          <div class="mood_text">
            <div>
              <h2 class="mood_title">NERVOUS</h2>
              <p class="mood_more_view">more view</p>
            </div>
          </div>
        </li>
        <li class="mood_box">
          <a href="#">
            <img src="./img/emotion/bored.jpg" />
          </a>
          <div class="mood_text">
            <div>
              <h2 class="mood_title">BORED</h2>
              <p class="mood_more_view">more view</p>
            </div>
          </div>
        </li>
        <li class="mood_box">
          <a href="#">
            <img src="./img/emotion/lonely.jpg" />
          </a>
          <div class="mood_text">
            <div>
              <h2 class="mood_title">LONELY</h2>
              <p class="mood_more_view">more view</p>
            </div>
          </div>
        </li>
        <li class="mood_box">
          <a href="#">
            <img src="./img/emotion/sad.jpg" />
          </a>
          <div class="mood_text">
            <div>
              <h2 class="mood_title">SAD</h2>
              <p class="mood_more_view">more view</p>
            </div>
          </div>
        </li>
      </ul>
      `;
    } else if (innerWidth > 630) {
      moodRightContent.innerHTML = `
        <ul class="mood_right_content">
          <li class="mood_box">
            <a href="#"><img src="./img/emotion/angryMob.png" alt="" /></a>
            <div class="mood_text">
              <h2 class="mood_title">ANGRY</h2>
            </div>
          </li>
          <li class="mood_box">
            <a href="#"><img src="./img/emotion/nervousMob.png" alt="" /></a>
            <div class="mood_text">
              <h2 class="mood_title">NERVOUS</h2>
            </div>
          </li>
          <li class="mood_box">
            <a href="#"
              ><img src="./img/emotion/boredMob.png" alt="" class="boredImg"
            /></a>
            <div class="mood_text">
              <h2 class="mood_title">BORED</h2>
            </div>
          </li>
          <li class="mood_box">
            <a href="#"><img src="./img/emotion/lonelyMob.png" alt="" /></a>
            <div class="mood_text">
              <h2 class="mood_title">LONELY</h2>
            </div>
          </li>
          <li class="mood_box">
            <a href="#"><img src="./img/emotion/sadMob.png" alt="" /></a>
            <div class="mood_text">
              <h2 class="mood_title">SAD</h2>
            </div>
          </li>
        </ul>`;
    } else {
      moodRightContent.innerHTML = `
        <ul class="mood_right_content">
          <li class="mood_box">
            <a href="#"><img src="./img/emotion/angryMob.png" alt="" /></a>
          </li>
          <li class="mood_box">
            <a href="#"><img src="./img/emotion/nervousMob.png" alt="" /></a>
          </li>
          <li class="mood_box">
            <a href="#"
              ><img src="./img/emotion/boredMob.png" alt="" class="boredImg"
            /></a>
            </div>
          </li>
          <li class="mood_box">
            <a href="#"><img src="./img/emotion/lonelyMob.png" alt="" /></a>
          </li>
          <li class="mood_box">
            <a href="#"><img src="./img/emotion/sadMob.png" alt="" /></a>
          </li>
        </ul>`;
    }
  });
}
moodRightChange();

/* 탑 버튼 */
const $topBtn = document.querySelector("#topBtn");
$topBtn.style.visibility = "hidden";

window.addEventListener("scroll", (e) => {
  if (scrollY > 1600) {
    $topBtn.style.visibility = "visible";
  } else if (scrollY <= 1600) {
    $topBtn.style.visibility = "hidden";
  }
});

$topBtn.addEventListener("click", (e) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* 스크롤 시 깜빡이는 애니메이션 */
(function () {
  let observer = new IntersectionObserver((e) => {
    e.forEach((box) => {
      if (box.isIntersecting) {
        box.target.style.opacity = 1;
      } else {
        box.target.style.opacity = 0;
      }
    });
  });

  let $animation = document.querySelectorAll(".amation");
  for (let i = 0; i < $animation.length; i++) {
    observer.observe($animation[i]);
  }
})();

/* 이모티콘 클릭 시 추천 상품 변경 */
const $happyEmo = document.querySelector(".item_emo_happy");
const $boringEmo = document.querySelector(".item_emo_boring");
const $sadEmo = document.querySelector(".item_emo_sad");
const $lonelyEmo = document.querySelector(".item_emo_lonely");
const $angryEmo = document.querySelector(".item_emo_angry");
const $nervousEmo = document.querySelector(".item_emo_nervous");

const $itemTitle = document.querySelector(".item_title");
const $itemSubTitle = document.querySelector(".item_subTitle");

$happyEmo.addEventListener("click", (e) => {
  $happyEmo.style.opacity = "1";
  $happyEmo.style.width = "5rem";
  $boringEmo.style.opacity = "0.4";
  $boringEmo.style.width = "3.125rem";
  $sadEmo.style.opacity = "0.4";
  $sadEmo.style.width = "3.125rem";
  $lonelyEmo.style.opacity = "0.4";
  $lonelyEmo.style.width = "3.125rem";
  $angryEmo.style.opacity = "0.4";
  $angryEmo.style.width = "3.125rem";
  $nervousEmo.style.opacity = "0.4";
  $nervousEmo.style.width = "3.125rem";

  //행복 이모티콘 누르면 타이틀과 상품 변경
  $itemTitle.innerHTML = `
  WE SUPPORT
  <pre></pre>
  #HAPPINESS
  `;
  $itemSubTitle.innerHTML = `
  행복한 순간 행복한 선택
  `;

  makeList(newarrivalItemList);
});

$boringEmo.addEventListener("click", (e) => {
  $boringEmo.style.opacity = "1";
  $boringEmo.style.width = "5rem";
  $happyEmo.style.opacity = "0.4";
  $happyEmo.style.width = "3.125rem";
  $sadEmo.style.opacity = "0.4";
  $sadEmo.style.width = "3.125rem";
  $lonelyEmo.style.opacity = "0.4";
  $lonelyEmo.style.width = "3.125rem";
  $angryEmo.style.opacity = "0.4";
  $angryEmo.style.width = "3.125rem";
  $nervousEmo.style.opacity = "0.4";
  $nervousEmo.style.width = "3.125rem";
});

$sadEmo.addEventListener("click", (e) => {
  $sadEmo.style.opacity = "1";
  $sadEmo.style.width = "5rem";
  $happyEmo.style.opacity = "0.4";
  $happyEmo.style.width = "3.125rem";
  $boringEmo.style.opacity = "0.4";
  $boringEmo.style.width = "3.125rem";
  $lonelyEmo.style.opacity = "0.4";
  $lonelyEmo.style.width = "3.125rem";
  $angryEmo.style.opacity = "0.4";
  $angryEmo.style.width = "3.125rem";
  $nervousEmo.style.opacity = "0.4";
  $nervousEmo.style.width = "3.125rem";
});

$nervousEmo.addEventListener("click", (e) => {
  $nervousEmo.style.opacity = "1";
  $nervousEmo.style.width = "5rem";
  $happyEmo.style.opacity = "0.4";
  $happyEmo.style.width = "3.125rem";
  $boringEmo.style.opacity = "0.4";
  $boringEmo.style.width = "3.125rem";
  $sadEmo.style.opacity = "0.4";
  $sadEmo.style.width = "3.125rem";
  $angryEmo.style.opacity = "0.4";
  $angryEmo.style.width = "3.125rem";
  $lonelyEmo.style.opacity = "0.4";
  $lonelyEmo.style.width = "3.125rem";
});

$angryEmo.addEventListener("click", (e) => {
  $angryEmo.style.opacity = "1";
  $angryEmo.style.width = "5rem";
  $happyEmo.style.opacity = "0.4";
  $happyEmo.style.width = "3.125rem";
  $boringEmo.style.opacity = "0.4";
  $boringEmo.style.width = "3.125rem";
  $sadEmo.style.opacity = "0.4";
  $sadEmo.style.width = "3.125rem";
  $nervousEmo.style.opacity = "0.4";
  $nervousEmo.style.width = "3.125rem";
  $lonelyEmo.style.opacity = "0.4";
  $lonelyEmo.style.width = "3.125rem";
});

$lonelyEmo.addEventListener("click", (e) => {
  $lonelyEmo.style.opacity = "1";
  $lonelyEmo.style.width = "5rem";
  $happyEmo.style.opacity = "0.4";
  $happyEmo.style.width = "3.125rem";
  $boringEmo.style.opacity = "0.4";
  $boringEmo.style.width = "3.125rem";
  $sadEmo.style.opacity = "0.4";
  $sadEmo.style.width = "3.125rem";
  $angryEmo.style.opacity = "0.4";
  $angryEmo.style.width = "3.125rem";
  $nervousEmo.style.opacity = "0.4";
  $nervousEmo.style.width = "3.125rem";
  //외로움 이모티콘을 누르면 타이틀과 상품 변경
  $itemTitle.innerHTML = `
  YOU FEEL
  <pre></pre>
  #LONELY
  `;
  $itemSubTitle.innerHTML = `
  외로운 당신을 위로하는 선택
  `;
  makeList(lonelyItemList);
});

/* 모바일에서 aos 애니메이션 삭제 */
window.addEventListener("resize", (e) => {
  if (innerWidth < 630) {
    const $div = document.querySelectorAll("div");
    const $img = document.querySelectorAll("img");
    for (let i = 0; i < $div.length; i++) {
      $div[i].removeAttribute("data-aos");
      {
        for (let j = 0; j < $img.length; j++) {
          $img[j].removeAttribute("data-aos");
        }
      }
    }
  }
});

/* ContentMood 타이틀 변경 */
