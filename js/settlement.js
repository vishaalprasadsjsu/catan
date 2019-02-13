function Settlement(corner, player) {
  this.corner = corner;
  this.player = player;
}

Settlement.prototype.getPlayer = function() {
	return this.player;
}

Settlement.prototype.key = function() {
  return this.corner.key();
};

