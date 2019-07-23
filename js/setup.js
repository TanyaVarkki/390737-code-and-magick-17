'use strict';

(function () {
  // создаем похожих персонажей путем клонирования исходного образца

  var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var similarListElement = document.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var createWizard = function (quantity) {
    var wizards = [];
    for (var i = 0; i < quantity; i++) {
      wizards[i] = {
        name: window.utils.getRandomItem(WIZARD_NAMES) + ' ' + window.utils.getRandomItem(WIZARD_SURNAMES),
        coatColor: window.utils.getRandomItem(window.utils.WIZARD_COAT_COLORS),
        eyesColor: window.utils.getRandomItem(window.utils.WIZARD_EYES_COLORS)
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

  document.querySelector('.setup-similar').classList.remove('hidden');

})();
