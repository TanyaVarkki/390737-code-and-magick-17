'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupWisardCoatColor = userDialog.querySelector('.setup-wizard .wizard-coat');
var setupWisardEyesColor = userDialog.querySelector('.setup-wizard .wizard-eyes');
var setupFireballColor = userDialog.querySelector('.setup-fireball-wrap');
var coatColorInput = userDialog.querySelector('input[name=coat-color]');
var eyesColorInput = userDialog.querySelector('input[name=eyes-color]');
var fireballColorInput = userDialog.querySelector('input[name=fireball-color]');

// закрытие окна при нажатии эскейп, при условии,
// что поле ввода имени не находится в фокусе
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && userDialog.querySelector('.setup-user-name:focus') === null) {
    closePopup();
  }
};

// открытие окна путем удаления класса хидден,
// отслеживание события onPopupEscPress
var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// закрытие окна путем добавления класса хидден,
// удаление отслеживания события onPopupEscPress
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// открытие окна по клику на иконку пользователя
setupOpen.addEventListener('click', function () {
  openPopup();
});

// открытие окна нажатием на энтер,если фокус на иконке пользователя
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// закрытие окна по клику на крестик
setupClose.addEventListener('click', function () {
  closePopup();
});

// закрытие окна нажатием на энтер, если фокус на крестике
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// изменение цвета мантии по клику
setupWisardCoatColor.addEventListener('click', function () {
  var newCoatColor = getRandomItem(WIZARD_COAT_COLORS);
  setupWisardCoatColor.style.fill = newCoatColor;
  coatColorInput.value = newCoatColor;
});

// изменение цвета глаз по клику
setupWisardEyesColor.addEventListener('click', function () {
  var newEyesColor = getRandomItem(WIZARD_EYES_COLORS);
  setupWisardEyesColor.style.fill = newEyesColor;
  eyesColorInput.value = newEyesColor;
});

// изменение цвета фаербола по клику
setupFireballColor.addEventListener('click', function () {
  var newFireballColor = getRandomItem(FIREBALL_COLORS);
  setupFireballColor.style.background = newFireballColor;
  fireballColorInput.value = newFireballColor;
});

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getRandomItem = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

var createWizard = function (quantity) {
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    wizards[i] = {
      name: getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES),
      coatColor: getRandomItem(WIZARD_COAT_COLORS),
      eyesColor: getRandomItem(WIZARD_EYES_COLORS)
    };
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var wizardsNumber = createWizard(4);
renderWizards(wizardsNumber);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
