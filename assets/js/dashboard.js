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

		$.ajax({
			url: window.location.origin + '/api/card',
			type: 'GET',
			headers: CiiMSDashboard.getRequestHeaders(),
			beforeSend: CiiMSDashboard.ajaxBeforeSend(),
			success: function(data, textStatus, jqXHR) {
				self.cards = data.response.cards;
				self.cardData = data.response.cardData;
				self.renderCards();
			},
			completed: CiiMSDashboard.ajaxCompleted()
		});

		self.rearrange();
	},

	/**
	 * HAndles the re-arrangement
	 */
	rearrange: function() {
		var self = this;

		$(".dashboard-cards").on("ss-rearranged", function() {
        	var cards = {};
        	$(".dashboard-cards > .ss-active-child").each(function() {
        		var id = $(this).attr("id");
        		cards[id] = self.cards[id];
        	});

        	// Card re-arrangement didn't happen
        	if (JSON.stringify(cards) == JSON.stringify(self.cards))
        		return;

        	$.ajax({
				url: window.location.origin + '/api/card/rearrange',
				type: 'POST',
				data: { "cards": cards },
				headers: CiiMSDashboard.getRequestHeaders(),
				beforeSend: CiiMSDashboard.ajaxBeforeSend(),
				success: function(data, textStatus, jqXHR) {
					self.cards = cards
				},
				completed: CiiMSDashboard.ajaxCompleted()
			});
        })
	},

	/**
	 * Success callback for the card-renderer
	 */
	renderCards: function() {
		var self = this;

		// Iterate through all the cards in the database, and populate them
		$.each(self.cards, function(id, url) {
			$.ajaxSetup({ cache: true });
			$.getJSON(url + "/card.json", function(data) {
				$.ajaxSetup({ cache: false });
				data.basePath = url;
				data.id = id;

				// Set the card properties if they are provided
				if (self.cardData[id] != null)
				{
					data.size = self.cardData[id].size;
					$.each(self.cardData[id].properties, function(key, obj) {
						data.properties[key].value = obj;
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