export class Timer {
  constructor (timerHtmlElement) {
    this.value = 0;
    this.unactive = true;
    this.timerElement = timerHtmlElement;
  }

  getTimeString() {
    let minutes = Math.floor(this.value / 60).toString();
    let seconds = (this.value % 60).toString();
    let time = '';
    if (minutes.length == 1) {
      time += '0'
    }
    time += minutes + ':';
    if (seconds.length == 1) {
      time += '0';
    }
    time += seconds;
    return time;
  }

  pauseUnpause() {
    this.unactive = this.unactive ? false : true;
  }

  startTimer() {
    let that = this;
    setInterval(function () {
      if (that.unactive) {
        return;
      }
      that.value++;
      $(that.timerElement).html(that.getTimeString());
    }, 1000);
  }

  reset() {
    $(this.timerElement).html('00:00');
    this.value = 0;
    this.unactive = true;
  }
}
