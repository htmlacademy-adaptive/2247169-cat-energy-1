// Showing and hiding menu in mobile

let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

// Compare slider
const compareSlider = document.querySelector('.compare-slider');
const beforeContainer = document.querySelector('.compare-slider__picture--before');
const sliderHandle = document.querySelector('.compare-slider__dragme');
const body = document.body;

  if (compareSlider) {
    let isActive = false;

    sliderHandle.addEventListener('mousedown', () => {
      isActive = true;
    });

    body.addEventListener('mouseup', () => {
      isActive = false;
    });

    body.addEventListener('mouseleave', () => {
      isActive = false;
    });

    const beforeAfterSlider = (x) => {
      let shift = Math.max(0, Math.min(x, compareSlider.offsetWidth));
      beforeContainer.style.width = `${shift}px`;
      sliderHandle.style.left = `${shift}px`;
    };

    const pauseEvents = (e) => {
      e.stopPropagation();
      e.preventDefault();
      return false;
    };

    body.addEventListener('mousemove', (e) => {
      if (!isActive) {
        return;
      }

      let x = e.pageX;
      x -= compareSlider.getBoundingClientRect().left;
      beforeAfterSlider(x);
      pauseEvents(e);
    });

    sliderHandle.addEventListener('touchstart', () => {
      isActive = true;
    });

    body.addEventListener('touchend', () => {
      isActive = false;
    });

    body.addEventListener('touchcancel', () => {
      isActive = false;
    });

    body.addEventListener('touchmove', (e) => {
      if (!isActive) {
        return;
      }

      let x;

      let i;
      for (i = 0; i < e.changedTouches.length; i++) {
        x = e.changedTouches[i].pageX;
      }

      x -= compareSlider.getBoundingClientRect().left;

      beforeAfterSlider(x);
      pauseEvents(e);
    }, { passive: false });
  }

  // Checking the correct inputs
  const form = document.querySelector('.program-form');
  const inputs = document.querySelectorAll('.input__control');
  const inputControl = document.querySelector('.input__control');
  const inputEmail = document.querySelector('.input__control--email');
  const inputPhone = document.querySelector('.input__control--phone');

  if(form) {
    form.addEventListener('submit', function (e) {
      for (let i = inputs.length - 1; i >= 0; i--) {
        if ((inputs[i].id != 'age') && (inputs[i].id != 'commentaries')) {
          if ((!inputs[i].value)) {
            inputs[i].classList.add('input__control--error');
            inputs[i].focus();
            e.preventDefault();
          } else {
          inputs[i].classList.remove('input__control--error');
          }
        }
      }

      checkValidEmail();
      checkValidPhone();

    });

    function checkValidEmail() {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!inputEmail.value.match(validRegex)) {
        inputEmail.parentElement.classList.add('input--error');
      } else {
        inputEmail.parentElement.classList.remove('input--error');
      }
    }

    function checkValidPhone() {
      const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

      if (!inputPhone.value) {
        inputPhone.parentElement.classList.add('input--error');
      } else {
        inputPhone.parentElement.classList.remove('input--error');
      }
    }

    document.addEventListener('click', function (e) {
      for (let i = 0; i < inputs.length; i++) {
        if ((inputs[i].value)) {
          inputs[i].classList.remove('input--error');
          inputs[i].classList.remove('input__control--error');
        }
      }
    });
  }

// Map marker
ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
    center: [59.938631, 30.323037],
    zoom: 17,
    controls: []
  });

  myMap.controls.add('zoomControl');
  myMap.controls.add('rulerControl', {
  scaleLine: false
  });
  myMap.behaviors.disable('scrollZoom');

  var options = {};

  if (document.body.clientWidth < 768) {
    options = {
    iconLayout: 'default#image',
    iconImageHref: './img/pin.svg',
    iconImageSize: [48, 60],
    iconImageOffset: [-30, -45]
  };
  } else if (document.body.clientWidth >= 768 && document.body.clientWidth < 1366) {
    options = {
      iconLayout: 'default#image',
      iconImageHref: './img/pin.svg',
      iconImageSize: [80, 106],
      iconImageOffset: [-55, -105]
    };
  } else if (document.body.clientWidth >= 1366) {
    myMap.setCenter([59.938797, 30.319902]);
    options = {
      iconLayout: 'default#image',
      iconImageHref: './img/pin.svg',
      iconImageSize: [80, 106],
      iconImageOffset: [-55, -105]
    };
  }

  var myPlacemark = new ymaps.Placemark([59.938631, 30.323037], {
    hintContent: 'Магазин Cat Energy',
  }, options);

    myMap.geoObjects.add(myPlacemark);
  });
