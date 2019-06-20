var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var TEXT_HEIGHT = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_DISTANCE = 50;


var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 5, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 5, CLOUD_Y + GAP + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '000';
    ctx.fillText(names[i], CLOUD_X + GAP * 5 + (BAR_WIDTH + BAR_DISTANCE) * i, CLOUD_Y + TEXT_HEIGHT + FONT_GAP + BAR_HEIGHT + GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 5 + (BAR_WIDTH + BAR_DISTANCE) * i, CLOUD_Y + TEXT_HEIGHT + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime))

    if (names[i] == 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    else {
      ctx.fillStyle = 'rgba(0, ' + Math.floor(83+50*i) + ', 138, 1)';
    }

    ctx.fillRect(CLOUD_X + GAP * 5 + (BAR_WIDTH + BAR_DISTANCE) * i, CLOUD_Y + TEXT_HEIGHT + FONT_GAP + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  };
};
