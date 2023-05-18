//swiping products
var swiper = new Swiper(".mySwiper", {
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: 3000,
  },
  disableOnInteraction: false,
  lazyLoading: 'true',
});
var swiper1 = new Swiper(".mySwiper1", {
  slidesPerView: 1,
  spaceBetween: 20,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {

    528: {
      slidesPerView: 1.5,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2
    },
    1080: {
      slidesPerView: 3.5
    }
  }
});
//  menu bar slider

const menu = document.getElementById('menu');
menu.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.aside-menu').classList.toggle('active');
})







