function Player(color) {
  this.color = color;
  this.settlements = {};
  this.cities = {};
  this.roads = {};
  this.availableRoads = {};
  this.availableSettlements = {};
}

Player.prototype.addSettlement = function(corner, player) {
	if (!(corner.key() in this.settlements) && (corner.key() in this.availableSettlements)) {
		var settlement = new Settlement(corner, player);
		this.settlements[corner.key()] = settlement;
	}

}
var MAIN_PLAYER = "red";
var PLAYERS = ["red", "orange", "green", "blue", "white", "SaddleBrown"];


