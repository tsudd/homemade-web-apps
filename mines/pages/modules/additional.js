export let changeProportions = function makeHeightEqualWidth(elementName, windowHeight, fieldWidth, columns = 8, rows = 8) {
  let elementWidth = Math.floor(Math.sqrt((windowHeight - 600) * fieldWidth / (columns * rows)));
  $(`.${elementName}`).width(elementWidth);
  $(`.${elementName}`).height(elementWidth);
}
