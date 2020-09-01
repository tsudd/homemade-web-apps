export let changeProportions = function makeHeightEqualWidth(elementName, fieldWidth, columns = 8, rows = 8) {
  let screenHeight = $(window).height();
  let elementWidth = Math.floor(Math.sqrt(screenHeight / 3 * fieldWidth / (columns * rows)));
  $(`.${elementName}`).width(elementWidth);
  $(`.${elementName}`).height(elementWidth);
}
