<<<<<<< HEAD
"use strict";
=======
'use strict';
>>>>>>> 45ded24abbe4ed575afee99b8e55555eaa52de0a

// set up the current year to change automathically //
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// make mobile nav work //
const btnNavEl = document.querySelector(".btn__mobile--nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav__open");
});

///////////////////////////////////////////////////////
// Slider Gallery
const gallerySlider = function () {
  const slidesGallery = document.querySelectorAll(".slide__gallery");
  const btnLeftGalleryEl = document.querySelector(".slider__button--prev");
  const btnRightGalleryEl = document.querySelector(".slider__button--next");
  const dotPagination = document.querySelector(".slider__pagination");

  let curSlideGallery = 0;
  const maxSlideGallery = slidesGallery.length;

  const createDotsPagination = function () {
    slidesGallery.forEach(function (_, i) {
      dotPagination.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__pagination" data-slide="${i}"></button>`
      );
    });
  };

  const activateDotPagination = function (slide) {
    document
      .querySelectorAll(".dots__pagination")
      .forEach((dot) => dot.classList.remove("dots__pagination--active"));

    document
      .querySelector(`.dots__pagination[data-slide="${slide}"]`)
      .classList.add("dots__pagination--active");
  };

  const goToSlideGallery = function (slide) {
    slidesGallery.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // next slide
  const nextSlideGallery = function () {
    if (curSlideGallery === maxSlideGallery - 1) {
      curSlideGallery = 0;
    } else {
      curSlideGallery++;
    }
    goToSlideGallery(curSlideGallery);
    activateDotPagination(curSlideGallery);
  };

  //previous slide
  const prevSlideGallery = function () {
    if (curSlideGallery === 0) {
      curSlideGallery = maxSlideGallery - 1;
    } else {
      curSlideGallery--;
    }
    goToSlideGallery(curSlideGallery);
    activateDotPagination(curSlideGallery);
  };

  const initGallery = function () {
    goToSlideGallery(0);
    createDotsPagination();

    activateDotPagination(0);
  };
  initGallery();

  btnRightGalleryEl.addEventListener("click", nextSlideGallery);
  btnLeftGalleryEl.addEventListener("click", prevSlideGallery);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlideGallery();
    if (e.key === "ArrowRight") nextSlideGallery();
  });

  dotPagination.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__pagination")) {
      const { slide } = e.target.dataset;
      goToSlideGallery(slide);
      activateDotPagination(slide);
    }
  });
};
gallerySlider();

//Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous slide

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });
  // -100%, 0%, 100%

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// STICKY NAV //

const sectionHeroEl = document.querySelector(".hero__section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
