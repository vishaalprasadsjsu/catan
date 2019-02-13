function Road(edge, player) {
  this.edge = edge;
  this.player = player;
}

Road.prototype.getPlayer = function() {
	return this.player;
}

Road.prototype.key = function() {
  return this.edge.key();
};
