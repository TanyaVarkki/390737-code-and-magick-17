'use strict';

(function () {
  // открытие, закрытие окна и перетаскивание

  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var dialogHandler = userDialog.querySelector('.upload');
  var setupClose = userDialog.querySelector('.setup-close');
  var setupSubmit = userDialog.querySelector('.setup-submit');

  // закрытие окна при нажатии эскейп, при условии,
  // что поле ввода имени не находится в фокусе
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE && userDialog.querySelector('.setup-user-name:focus') === null) {
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
    window.utils.isEnterEvent(evt, openPopup);
  });

  // закрытие окна по клику на крестик
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  // закрытие окна нажатием на энтер, если фокус на крестике
  setupClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });

  // реализуем перетаскивание окна
  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // Запомним координаты точки, с которой мы начали перемещать диалог
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    // При каждом движении мыши нам нужно обновлять смещение относительно
    // первоначальной точки, чтобы диалог смещался на необходимую величину.
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    // При отпускании кнопки мыши нужно переставать слушать события движения мыши.
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);


      // при отпускании мыши мы повесим обработчик на click, который отменит
      // действие по умолчанию, если перемещение имело место
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    // Добавим обработчики события передвижения мыши и отпускания кнопки мыши.
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // При повторном открытии/закрытии диалога, положение диалога должно сбрасываться на изначальное
    var onCloseDialog = function () {
      userDialog.style.top = null;
      userDialog.style.left = null;
    };

    setupSubmit.addEventListener('click', onCloseDialog);
    setupClose.addEventListener('click', onCloseDialog);

    // при закрытии диалога кнопкой esc
    var onEscCLoseDialog = function (escCloseEvt) {
      window.utils.isEscEvent(escCloseEvt, onCloseDialog);
    };
    document.addEventListener('keydown', onEscCLoseDialog);

  });

  window.dialog = {
    userDialog: userDialog
  };

})();
