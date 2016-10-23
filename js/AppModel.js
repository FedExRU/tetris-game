;
'use strict';

var AppModel = function(){
  var AppModel = this;
  this.currentState;
  this.currentPiece;
  this.isCollision;

  this.currentPieceCoords = [0,5];

  this.sizes = { calls: 10, rows:  20 };

  this.piecesCoords = {
    q:  [[-1,0], [0,0], [1,0], [2,0]],
    w:  [[0,-1], [-1,0],[0,0], [1,0]],
    e:  [[0,-1], [1,-1],[0,0], [1,0]],
    r:  [[-1,-1],[-1,0],[0,0], [1,0]],
    t:  [[-1,-1],[-1,0],[0,0], [0,0]],
    y:  [[0,-1], [1,-1],[-1,0],[0,0]],
    u:  [[-1,-1],[0,-1],[0,0], [1,0]],
  };

  this.initialize = function(){
    AppModel.changePiece();
    AppModel.currentState = AppModel.buildInitMatrix();
  }

  // matrix logic

  this.buildInitMatrix = function(){
    var state = new Array();

    for(var i=0; i < this.sizes.rows; i++){
      state[i] = new Array();
      for(var j=0; j < this.sizes.calls; j++){
        state[i][j] = 0;
      }
    }
    return state;
  };

  this.checkCollision = function(){};

  this.clearMatrix = function(){
    for (var i = 0; i < AppModel.sizes.rows; i++) {
      for (var j = 0; j < AppModel.sizes.calls; j++) {
        element = AppModel.currentState[i][j];
        if(element === 1){
          AppModel.currentState[i][j] = 0;
        }
      }
    }
  };

  // pieces logic

  this.startPieceIteration = function(){
    AppModel.clearMatrix(); // clear matrix before draw

    AppModel.renderPiece( // render piece on matrix
      AppModel.currentPiece,
      AppModel.currentPieceCoords
    );
    AppModel.checkCollision(); // check if collision
    AppModel.movePieceDown(); // move piece down
  }

  this.movePieceDown = function(){
    coords = AppModel.currentPieceCoords
    AppModel.currentPieceCoords[0] = coords[0] + 1;
    // TODO move to check colision
    if (coords[0] == AppModel.sizes.rows){ // sad path
      AppModel.endOfPathEvent();
    }
  };

  this.changePiece = function(){
    keys = Object.keys(AppModel.piecesCoords);
    key = keys[Math.floor((Math.random() * 7))];
    AppModel.currentPiece = AppModel.piecesCoords[key];
  };

  this.endOfPathEvent = function(){
    AppModel.changePiece();
    AppModel.renderPiece(
      AppModel.currentPiece, AppModel.currentPieceCoords, 2
    );
    alert();
    AppModel.currentPieceCoords[0] = 0;
  }


  this.renderPiece = function(piece, coords, symbol){
    var symbol = symbol || 1;
    var renderCoords = coords;
    AppModel.currentPieceCoords = [renderCoords[0], renderCoords[1]]

    for(pixel in piece){

      var pixelCoords = piece[pixel];
      var drawCoords  = AppModel.currentPieceCoords;

      var key   = pixelCoords[0];
      var value = pixelCoords[1];

      draw_key   = drawCoords[0] - value;
      draw_value = drawCoords[1] - key;

      canDraw = AppModel.currentState[draw_key];
      if(!(canDraw == undefined)){
        canDraw = AppModel.currentState[draw_key][draw_value];
        if(!(canDraw == undefined)){
          AppModel.currentState[draw_key][draw_value]= symbol;
        }
      };
    };
  };

  this.initialize();
};
