'use strict';

(function () {
  // изменяем цвет глаз, мантии, и фаербола по клику
  // передаем данные в соответствующие скрытые инпуты

  var setupWisardCoatColor = document.querySelector('.setup-wizard .wizard-coat');
  var setupWisardEyesColor = document.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballColor = document.querySelector('.setup-fireball-wrap');
  var coatColorInput = document.querySelector('input[name=coat-color]');
  var eyesColorInput = document.querySelector('input[name=eyes-color]');
  var fireballColorInput = document.querySelector('input[name=fireball-color]');

  // изменение цвета мантии по клику
  setupWisardCoatColor.addEventListener('click', function () {
    var newCoatColor = window.utils.getRandomItem(window.utils.WIZARD_COAT_COLORS);
    setupWisardCoatColor.style.fill = newCoatColor;
    coatColorInput.value = newCoatColor;
  });

  // изменение цвета глаз по клику
  setupWisardEyesColor.addEventListener('click', function () {
    var newEyesColor = window.utils.getRandomItem(window.utils.WIZARD_EYES_COLORS);
    setupWisardEyesColor.style.fill = newEyesColor;
    eyesColorInput.value = newEyesColor;
  });

  // изменение цвета фаербола по клику
  setupFireballColor.addEventListener('click', function () {
    var newFireballColor = window.utils.getRandomItem(window.utils.FIREBALL_COLORS);
    setupFireballColor.style.background = newFireballColor;
    fireballColorInput.value = newFireballColor;
  });

})();
