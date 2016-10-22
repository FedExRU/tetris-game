;
'use strict';

var AppModel = function(){
  var AppModel = this;

  this.currentPieceCoords = [1,5];
  this.sizeOptions = {
    calls: 10,
    rows:  20,
  };

  this.piecesCoords = {
    q:  [[-1,0], [0,0], [1,0], [2,0]],
    w:  [[0,-1], [-1,0],[0,0], [1,0]],
    e:  [[0,-1], [1,-1],[0,0], [1,0]],
    r:  [[-1,-1],[-1,0],[0,0], [1,0]],
    t:  [[-1,-1],[-1,0],[0,0], [0,0]],
    y:  [[0,-1], [1,-1],[-1,0],[0,0]],
    u:  [[-1,-1],[0,-1],[0,0], [1,0]],
  };

  this.isCollision = false;

  this.buildInitMatrix = function(){
    var state = new Array();

    for(var i=0; i < this.sizeOptions.rows; i++){
      state[i] = new Array();
      for(var j=0; j < this.sizeOptions.calls; j++){
        state[i][j] = 0;
      }
    }
    return state;
  };
  this.currentState = this.buildInitMatrix();

  this.movePieceDown = function(){
    coords = AppModel.currentPieceCoords
    AppModel.renderPiece()
    AppModel.currentPieceCoords[0] = coords[0] + 1;
  };

  this.clearHistory = function(){
    var renderCoords = AppModel.currentPieceCoords;
    AppModel.currentState[
      renderCoords[0] - 1
    ][
      renderCoords[1]
    ] = 0
  }
  this.renderPiece = function(piece, coords){
    var renderCoords = AppModel.currentPieceCoords;
    AppModel.currentState[
      renderCoords[0]
    ][
      renderCoords[1]
    ] = 1;
    AppModel.clearHistory();
  };
  this.checkCollision = function(){};

};
