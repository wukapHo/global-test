import { sendData } from "./sendData.js";

window.onload = () => {
  slideFirst();
  slideSecond();
}

const fieldMin = document.querySelector('#field-min'),
      fieldMax = document.querySelector('#field-max'),
      firstSlider = document.querySelector('#slider1'),
      secondSlider = document.querySelector('#slider2'),
      sliderTrack = document.querySelector('.form__slider-track'),
      minGap = 0;

firstSlider.addEventListener('input', slideFirst);
secondSlider.addEventListener('input', slideSecond);
fieldMin.addEventListener('change', changeMin);
fieldMax.addEventListener('change', changeMax);

function slideFirst() {
  if (parseInt(secondSlider.value) - parseInt(firstSlider.value) <= minGap) {
    firstSlider.value = parseInt(secondSlider.value) - minGap;
  }

  fieldMin.value = firstSlider.value;
  fillSlider();
}

function slideSecond() {
  if (parseInt(secondSlider.value) - parseInt(firstSlider.value) <= minGap) {
    secondSlider.value = parseInt(firstSlider.value) + minGap;
  }

  fieldMax.value = secondSlider.value;
  fillSlider();
}

function fillSlider() {
  const percentLeft = ((firstSlider.value - firstSlider.min) / (secondSlider.max - firstSlider.min)) * 100,
        percentRigth = ((secondSlider.value - firstSlider.min) / (secondSlider.max - firstSlider.min)) * 100;

  sliderTrack.style.background = `linear-gradient(to right, #dedede ${percentLeft}%, #fa8072 ${percentLeft}%, #fa8072 ${percentRigth}%, #dedede ${percentRigth}%)`;
}

function changeMin() {
  if (fieldMin.value < 0) {
    fieldMin.value = 0;
  }

  if (parseInt(fieldMax.value) - parseInt(fieldMin.value) <= minGap) {
    fieldMin.value = parseInt(fieldMax.value) - minGap;
  }

  firstSlider.min = fieldMin.value;
  secondSlider.min = fieldMin.value;
  firstSlider.value = fieldMin.value;

  fillSlider();
}

function changeMax() {
  if (parseInt(fieldMax.value) - parseInt(fieldMin.value) <= minGap) {
    fieldMax.value = parseInt(fieldMin.value) + minGap;
  }

  if (fieldMax.value > secondSlider.max) {
    firstSlider.max = fieldMax.value;
    secondSlider.max = fieldMax.value;
  }

  secondSlider.value = fieldMax.value;
  fillSlider();
}

const submitBtn = document.querySelector('.form__button');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  sendData({ min: fieldMin.value, max: fieldMax.value });
});
