;
'use strict';

var View = function(model){
  var View = this;

  this.model = model;
  this.ctx;
  this.interval;
  this.canvas = document.getElementById('play-spot');
  this.ctx    = this.canvas.getContext('2d');
  this.colors = {
    background: '#8869a2',
    border:     'black',
    table:      'green'
  };

  this.cellsize = 40;

  this.init = function(){
    View.start();
  };

  this.renderBoard = function () {
    this.ctx.fillStyle = this.colors.background;
    this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.colors.border;

    for (var x = 0.5; x < this.canvas.width; x += this.cellsize) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
    }
    for (var y = 0.5; y < this.canvas.height; y += this.cellsize) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
    }
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  };

  this.start = function(){
    View.interval = setInterval(
      function(){
        View.renderToConsole();
        View.model.startPieceIteration();
      },
      500
    );
  }

  this.stop = function(){
    View.clearInterval();
  }

  this.renderToConsole = function(){
    var state = View.model.currentState;
    console.log('-------------');
    for (row in state){
      console.log(state[row]);
    }
  };

  this.init();
};
