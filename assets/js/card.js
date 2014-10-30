;(function() {
	var Card;

	// The default options of the card
	Card.prototype.defaultOptions = {
		headerText: "",
		properties: {},
		defaultTileSize: 1,
		availableTileSizes: [ 1 ],
		onInstall: function(options, callback) {},
		onUninstall: function(options, callback) {},
		init: function(options, properties, callback) {},
	};

	// Constructor
	function Card(options) {
		console.log(options);
	};

	// Export the object to the global namespace
	if (typeof module !== "undefined" && module !== null) {
    	module.exports = Card;
  	} else {
    	window.Card = Card;
  	}

}(this));