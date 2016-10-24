;
'use strict';

(new function() {
  var App = this;
  this.files = [
    'js/Controller.js',
    'js/Model.js',
    'js/View.js',
    'js/lib.js',
    'js/mouseController.js'];
  this.model;
  this.view;
  this.controller;

  this.init = function() {
    this.model = new Model();
    this.view  = new View(this.model);
    this.controller = new Controller(this.model, this.view);
    // view.renderBoard();
    view.renderToConsole();
  };

  return function() {
    var head = document.getElementsByTagName('head')[0];
    for(var key in  App.files)
    {
      var script = document.createElement('script');
      script.src = App.files[key];
      script.onload = App.start;
      head.appendChild(script);
    }
    window.onload = App.init
  };
})();
