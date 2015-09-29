function BoardDrawer(ctx, game) {
   this.ctx = ctx;

  this.game = game;
  this.board = game.board;

   this.tileDrawer = new TileDrawer(ctx);
   this.roadDrawer = new RoadDrawer(ctx);
   this.settlementDrawer = new SettlementDrawer(ctx);
   this.cityDrawer = new CityDrawer(ctx);
}

BoardDrawer.prototype.draw = function() {
  var game = this.game;
  var board = this.board;

  this.ctx.save();

  this.tileDrawer.drawTiles(board.tiles);
  this.roadDrawer.drawRoads(board.roads);
  this.settlementDrawer.drawSettlements(board.settlements);
  this.cityDrawer.drawCities(board.cities);

  for (var i = 0; i < board.everything.length; i++) {
    if (board.everything[i].hover) {
      var thing = board.everything[i];

      Point.draw(this.ctx, thing.x, thing.y, 4);
    }
  }

  if (board.hovering) {
    var thing = board.hovering;
    if (thing instanceof Corner) {
      if (game.state.shouldGhostCorner(thing)) {
        var corner = thing;
        var key = corner.key();

        // if there's no settlement nor city.
        if (!board.settlements[key] && !board.cities[key]) {
          var settlement = board.settlements[key];
          this.settlementDrawer.ghost(corner)
        // if there's only no city.
        } else if (!board.cities[key]) {
          var city = board.cities[key];
          this.cityDrawer.ghost(corner)
        }
      }
    } else if (thing instanceof Edge) {
      if (game.state.shouldGhostRoad(thing)) {
        var edge = thing;
        var key = edge.key();

        var road = board.roads[edge];
        if (!road) {
          this.roadDrawer.ghost(edge);
        }
      }
    } else if (thing instanceof Tile) {
      if (game.state.shouldGhostRobber(thing)) {

      }
    }

  }
};