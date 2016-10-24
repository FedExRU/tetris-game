;
'use strict';

var Model = function(){
  var Model = this;
  this.currentState;
  this.currentPiece;
  this.isCollision;

  this.pieceCoordsState = [0,5];

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
    Model.changePiece();
    Model.currentState = Model.buildInitMatrix();
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
    for (var i = 0; i < Model.sizes.rows; i++) {
      for (var j = 0; j < Model.sizes.calls; j++) {
        element = Model.currentState[i][j];
        if(element === 1){
          Model.currentState[i][j] = 0;
        }
      }
    }
  };

  // pieces logic

  this.startPieceIteration = function(){
    Model.movePieceDown(); // move piece down
    Model.clearMatrix(); // clear matrix before draw

    Model.renderPiece( // render piece on matrix
      Model.currentPiece,
      Model.pieceCoordsState
    );
    // TODO Model.checkCollision(); // check if collision
  }

  this.movePieceDown = function(){
    coords = Model.pieceCoordsState
    // TODO move to check colision
    if (coords[0] == Model.sizes.rows - 1){ // sad path
      Model.endOfPathEvent();
    } else {
      Model.pieceCoordsState[0] = coords[0] + 1;
    }
  };

  this.changePiece = function(){
    keys = Object.keys(Model.piecesCoords);
    key = keys[Math.floor((Math.random() * 7))];
    Model.currentPiece = Model.piecesCoords[key];
  };

  this.endOfPathEvent = function(){
    Model.pieceCoordsState[0] = 0;
    Model.freezPiece();
    Model.changePiece();
  };

  this.freezPiece = function(){
    for (var i = 0; i < Model.sizes.rows; i++) {
      for (var j = 0; j < Model.sizes.calls; j++) {
        element = Model.currentState[i][j];
        if(element === 1){
          Model.currentState[i][j] = 2;
        }
      };
    };
  };

  this.renderPiece = function(piece, coords, symbol){
    var symbol = symbol || 1;

    for(pixel in piece){
      pixel  = piece[pixel];
      coords = Model.getMatrixCoordsFromPixel(pixel);

      matrix_value = Model.currentState[coords[0]];
      if(Model.isCanDraw(matrix_value)){
        matrix_value = Model.currentState[coords[0]][coords[1]];
        if(Model.isCanDraw(matrix_value)){
          Model.currentState[coords[0]][coords[1]] = symbol;
        }
      }
    };
  };

  // convert piece coords to coords relative matrix
  this.getMatrixCoordsFromPixel = function(pixel){
    var coords  = Model.pieceCoordsState;
    var new_piece_coords = [
      coords[0] + pixel[0],
      coords[1] - pixel[1]
    ];
    return new_piece_coords;
  };

  // return false if cell contain 'undefined' or 2
  this.isCanDraw = function(symbol) {
    if((symbol == undefined) && (symbol == 2)) {
      return false;
    } else {
      return true;
    };
  };

  this.initialize();
};
