export let changeProportions = function makeHeightEqualWidth(name) {
  $('.' + name).height($('.' + name).width());
}
