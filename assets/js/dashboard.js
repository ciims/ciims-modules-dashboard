var Dashboard = {

	// The list of cards, populated by DashboardController::actionIndex
	cards: {},

	// The properties for each card, as loaded from the database
	cardData: {},

	/**
	 * Init method
	 */
	init: function() {
		var self = this;

		// Create the global object if it hasn't been created yet
		if (typeof window.cards == "undefined")
			window.cards = {};

		// Iterate through all the cards in the database, and populate them
		$.each(self.cards, function(id, url) {
			$.getJSON(url + "/card.json", function(data) {
				data.basePath = url;
				data.id = id;

				// Set the card properties if they are provided
				if (self.cardData[id] != null)
				{
					$.each(self.cardData[id], function(key, val) {
						data.properties[key].value = val;
					});
				}

				// Add this card to the global cards object container
				window.cards[id] = new Card(data);
				window.cards[id].render();
			});
		});
	},

	/**
	 * Generates a unique ID for each card to use
	 * @return string
	 */
	generateUniqueID: function() {
		return Math.random().toString(36).slice(2);
	}
};