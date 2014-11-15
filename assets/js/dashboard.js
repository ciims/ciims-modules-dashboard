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
			self.renderCard(id, url);
		});
	},

	/**
	 * Renders a single instance of a card
	 * @param  string   id  The card ID
	 * @param  string   url The URL of the card
	 */
	renderCard: function(id, url) {
		var self = this;
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
	},

	/**
	 * Installs a new card
	 * @param  {[type]} url [description]
	 * @return {[type]}     [description]
	 */
	installCard: function(url) {
		var self = this,
			id = self.generateUniqueID();

		$.ajaxSetup({ cache: true });
		$.getJSON(url + "/card.json", function(data) {
			$.ajaxSetup({ cache: false });
			var properties = {};

			$.each(data.properties, function(key, obj) {
				properties[key] = obj["value"];
			});

			var details = {
				"size": data.availableTileSizes[0],
				"properties": properties
			}

			$.ajax({
				url: window.location.origin + '/api/card/index',
				type: 'POST',
				data: {
					"id": id,
					"url": url,
					"details": details
				},
				headers: CiiMSDashboard.getRequestHeaders(),
				beforeSend: CiiMSDashboard.ajaxBeforeSend(),
				success: function(data, textStatus, jqXHR) {
					self.cards[id] = url;
					self.cardData[id] = details;
					self.renderCard(id, url);
				},
				completed: CiiMSDashboard.ajaxCompleted()
			});
		}).fail(function() {
			console.log("card installation failed");
		})
	},

	/**
	 * Generates a unique ID for each card to use
	 * @return string
	 */
	generateUniqueID: function() {
		return Math.random().toString(36).slice(2);
	}
};