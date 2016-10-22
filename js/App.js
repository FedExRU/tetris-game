;
'use strict';

(new function() {
  var App = this;
  this.files = [
    'js/AppController.js',
    'js/AppModel.js',
    'js/AppView.js',
    'js/GameLocation.js',
    'js/GamePattern.js',
    'js/lib.js',
    'js/mouseController.js'];
  this.model;
  this.view;
  this.controller;

  this.init = function() {
    this.model = new AppModel();
    this.view  = new AppView(this.model);
    this.controller = new AppController(this.model, this.view);
    view.renderBoard();
    // view.renderToConsole();
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
