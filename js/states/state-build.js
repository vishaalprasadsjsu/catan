function StateBuild(game) {
  this.game = game;
  this.board = game.board;

  $("button.roll").show();
  $("button.roll").attr("disabled", false);
}

StateBuild.prototype.execute = function(thing) {
  var player = this.game.currentPlayer;
  if (thing instanceof Corner) {
    // console.log("Corner",thing.key(),this.board.getCornerToEdges());
    var corner = thing;
    var key = corner.key();
    console.log(this.board.getCornerToEdges()[corner.key()]);
    this.board.buildSettlement(corner,player);
    // upgrade settlements to cities
    // if (this.board.settlements[key]) {
    //   var settlement = this.board.settlements[key]
    //   if (settlement.getPlayer() == player) {
    //       this.board.buildCity(corner, player);
    //   }
    // } else {
    //   this.board.buildSettlement(corner, player);
    // }
  } 
  else if (thing instanceof Edge) {
    console.log(thing)
    this.board.buildRoad(thing,player);
  }

  this.game.scores.update();
  this.game.trade.update();

  if (this.game.scores.maxScore >= Scores.GOAL) {
    Banner(this.game.scores.winText(), this.game.scores.leader, true);

    $("button.trade").attr("disabled", true);
    $("button.roll").attr("disabled", true);
    $("button.endturn").show();

    $("button.endturn").attr("disabled", true);
    $("button.endturn").hide();
  }
}


// StateBuild.prototype.canbuildSettlement = function(corner,player) {
//   if (!Resources.buySettlement(player)) {
//     Banner("Can't afford a Settlement!");
//     return false;
//   }
//   if (settlements[key] instanceof City) {
//     Banner("Already a city!");
//     return false;
//   }
//   cornerKey = corner.key()
//   settlements = this.board.getSettlements();
//   var canBuy = false
//   if ((this.board.isCornerOccupied === false) && (this.board.isTwoAway(cornerKey))) {
//       canBuy = true;
//   }
//   return false

// };

// FullscreenBoard.prototype.canPlaceSettlement = function(cornerKey) {
//   return !this.board.isCornerOccupied(cornerKey) &&
//          this.board.isTwoAway(cornerKey);
// };

StateBuild.prototype.shouldGhostRoad = function(edge) {
  var result = false;

  // the road can be placed if it's touching a settlement.
  _.each(this.board.settlements, function(settlement) {
    if (settlement.corner.equals(edge.c1) || settlement.corner.equals(edge.c2)) {
      if (settlement.player === MAIN_PLAYER) {
        result = true;
      }
    }
  });

  _.each(this.board.cities, function(city) {
    if (city.corner.equals(edge.c1) || city.corner.equals(edge.c2)) {
      if (city.player === MAIN_PLAYER) {
        result = true;
      }
    }
  });

  // or if it's touching an existing road network.
  _.each(this.board.roads, function(road) {
    if (road.player === MAIN_PLAYER) {
      var neighbors = this.board.edgeGraph[road.edge.key()];
      if (_.contains(neighbors, edge)) {
        result = true;
      }
    }
  }, this);

  return result;
};

StateBuild.prototype.shouldGhostCorner = function(corner) {
  var isNearNeighbor = false;

  var takenCornerKeys = _.union(
    _.keys(this.board.settlements, this),
    _.keys(this.board.cities, this)
  );

  // can't place right next to other settements or citites.
  _.each(takenCornerKeys, function(key) {
    var neighbors = this.board.cornerGraph[key];
    if (_.contains(neighbors, corner)) {
      isNearNeighbor = true;
    }
  }, this);

  var isTouchingRoad = false;
  _.each(this.board.roads, function(road) {
    if (road.edge.c1 === corner || road.edge.c2 === corner) {
      isTouchingRoad = true;
    }
  });

  var settlement = this.board.settlements[corner.key()];
  var cityUpgrade = settlement && settlement.player === MAIN_PLAYER;

  return (!isNearNeighbor && isTouchingRoad) || cityUpgrade;
};

StateBuild.prototype.shouldGhostRobber = function(tile) {
  return true;
};

StateBuild.prototype.AIBuildRoad = function(edge) {

}
