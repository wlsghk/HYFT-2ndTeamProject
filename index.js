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
            <img src="./img/emotion/nervous2.jpg" />
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
            <img src="./img/emotion/lonely2.jpg" />
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
            <img src="./img/emotion/lonely.jpg" />
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
    } else {
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

/* smooth scroll
class Scrooth {
  constructor({
    element = window,
    strength = 10,
    acceleration = 1.2,
    deceleration = 0.975,
  } = {}) {
    this.element = element;
    this.distance = strength;
    this.acceleration = acceleration;
    this.deceleration = deceleration;
    this.running = false;

    this.element.addEventListener("wheel", this.scrollHandler.bind(this), {
      passive: false,
    });
    this.element.addEventListener("mousewheel", this.scrollHandler.bind(this), {
      passive: false,
    });
    this.scroll = this.scroll.bind(this);
  }

  scrollHandler(e) {
    e.preventDefault();

    if (!this.running) {
      this.top = this.element.pageYOffset || this.element.scrollTop || 0;
      this.running = true;
      this.currentDistance = e.deltaY > 0 ? 0.1 : -0.1;
      this.isDistanceAsc = true;
      this.scroll();
    } else {
      this.isDistanceAsc = false;
      this.currentDistance = e.deltaY > 0 ? this.distance : -this.distance;
    }
  }

  scroll() {
    if (this.running) {
      this.currentDistance *=
        this.isDistanceAsc === true ? this.acceleration : this.deceleration;
      Math.abs(this.currentDistance) < 0.1 && this.isDistanceAsc === false
        ? (this.running = false)
        : 1;
      Math.abs(this.currentDistance) >= Math.abs(this.distance)
        ? (this.isDistanceAsc = false)
        : 1;

      this.top += this.currentDistance;
      this.element.scrollTo(0, this.top);

      requestAnimationFrame(this.scroll);
    }
  }
}

const scroll = new Scrooth({
  element: window,
  strength: 20,
  acceleration: 1.5,
  deceleration: 0.975,
}); */

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
