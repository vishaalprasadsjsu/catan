function FourPlayerBoard() {
  this.type = "Four";
  this.players = 4;
}

FourPlayerBoard.prototype = new FullscreenBoard();

FourPlayerBoard.prototype.init = function(tilespace) {
  // Let the original Board set up itself.
  FullscreenBoard.prototype.init.call(this, tilespace);
  
  // define what resources are available
  var resources = [
    DESERT,
    BRICK, BRICK, BRICK,
    ORE, ORE, ORE,
    WOOD, WOOD, WOOD, WOOD,
    SHEEP, SHEEP, SHEEP, SHEEP,
    WHEAT, WHEAT, WHEAT, WHEAT
  ];

  // shuffle the resources
  resources = _.shuffle(resources);

  // make a mutable copy of the token arrangement
  var tokens = FourPlayerBoard.TOKEN_ARRANGEMENT.slice();

  // use the relative tile arrangement with the tile we found to be in the center
  // to look up all other tiles.
  _.each(FourPlayerBoard.RELATIVE_TILE_ARRANGEMENT, function(position) {
    // Get the tile and place a resource on it.
    var x = position.x + tilespace.centerTile.x;
    var y = position.y + tilespace.centerTile.y;

    var tile = this.getTile(x, y);
    tile.resource = resources.pop(0);

    // Place a token on every tile but the desert.
    if (tile.resource !== DESERT) {
      var value = tokens.shift();
      tile.token = new Token(value);
    // Place the robber on the desert.
    } else {
      this.robber = new Robber(tile);
    }
  }, this);

  return this;
}

FourPlayerBoard.prototype.placePorts = function() {
  // the minimum number of edges between each port.
  var portSpace = Math.floor(this.tilespace.coastalEdges.length / this.NUMBER_OF_PORTS);

  // a random offset that shifts where ports are placed in the sequence.
  // this prevents ports from always appearing in the same place.
  var offset = _.sample([1,2]);

  // keep track of how many ports have been placed already.
  var ports = 0;

  // guarantee there are is at least one special port for each resource
  var portTypes = [BRICK, WHEAT, ORE, SHEEP, WOOD];

  // fill the remaining port slots with basic default 3:1 ports
  while (portTypes.length < this.NUMBER_OF_PORTS) {
    portTypes.push({name: "default", color: "#444", ratio: 3});
  }

  portTypes = _.shuffle(portTypes);

  for (var i = 0; i < this.tilespace.coastalEdges.length; i++) {
    if (i % portSpace === offset && ports < this.NUMBER_OF_PORTS) {
      var edge = this.tilespace.coastalEdges[i];
      edge.isPort = true;
      edge.port = portTypes.pop();
      ports++;

      this.ports[edge.c1.key()] = edge.port;
      this.ports[edge.c2.key()] = edge.port;
    }
  }
};

FourPlayerBoard.prototype.NUMBER_OF_PORTS = 9;
FourPlayerBoard.TOKEN_ARRANGEMENT = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
FourPlayerBoard.RELATIVE_TILE_ARRANGEMENT = [{"x":-150,"y":-86},{"x":-75,"y":-129},{"x":0,"y":-172},{"x":75,"y":-129},{"x":150,"y":-86},{"x":150,"y":0},{"x":150,"y":86},{"x":75,"y":129},{"x":0,"y":172},{"x":-75,"y":129},{"x":-150,"y":86},{"x":-150,"y":0},{"x":-75,"y":-43},{"x":0,"y":-86},{"x":75,"y":-43},{"x":75,"y":43},{"x":0,"y":86},{"x":-75,"y":43},{"x":0,"y":0}];
