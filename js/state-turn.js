function StateTurn(game) {
  this.game = game;

  this.index = 0;
  this.currentTurn = PLAYERS[this.index];
}

StateTurn.prototype.startTurn = function() {
  this.currentTurn = PLAYERS[this.index];
  if (LOG_TURNS) {
    console.log(this.currentTurn, "starts turn");
  }

  // at the start of a turn player must roll before trading or ending turn.
  $("button.trade").attr("disabled", true);

  $("button.roll").show();
  $("button.roll").attr("disabled", false);
  $("button.endturn").hide()
}

StateTurn.prototype.endTurn = function() {
  this.index++;

  // reset turn when reaching the end.
  if (this.index >= PLAYERS.length) {
    this.index = 0;
  }

  if (LOG_TURNS) {
    console.log(this.currentTurn, "ends turn");
  }
}