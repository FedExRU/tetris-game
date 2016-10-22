;
'use strict';

function mouseController(element, move, click) {
  var mouseController = this;
  this.x = 0;
  this.y = 0;
  this.element = element;
  this.moveApp = move;
  this.clickApp = click;

  this.move = function (e) {
    this.x = e.pageX - this.element.offsetLeft;
    this.y = e.pageY - this.element.offsetTop;

    this.moveApp(this.x, this.y)
  }

  this.click = function () {
    this.clickApp(this.x, this.y);
  }

  this.element.addEventListener('mousemove', function (e) {
    mouseController.move(e);
  })

  this.element.addEventListener('click', function (e) {
    mouseController.click(e);
  })
}
