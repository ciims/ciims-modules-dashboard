;(function() {
	var Card,
		defaultCardMarkup = {
			square: $("<div>").addClass("square"),
			rectangle: $("<div>").addClass("rectangle").attr("data-ss-colspan", "2"),
			rectangleTall: $("<div>").addClass("rectangleTall"),
			squareBig: $("<div>").addClass("squareBig").attr("data-ss-colspan", "2")
		}

	/**
	 * The default options available for all cards
	 */
	Card.prototype.defaultOptions = {
		id: null,
		footerText: "",
		properties: {},
		size: null,
		availableTileSizes: [ "square" ],
		css: null,
		js: null,
		html: null,
		init: function(options, callback) { return; }
	};

	/**
	 * Initializes a card
	 */
	Card.prototype.init = function(options, callback) {
		if (typeof options == "undefined")
			options = {};

		if (typeof callback == "undefined")
			callback = function() { return; }

		this.options.init(options, callback);
	}
	
	/**
	 * Resizes a card, based upon it's available options
	 */
	Card.prototype.resize = function() {

		// Retrieve information about the current tileset
		var  el = "#"+this.id,
			numberOfTiles = this.options.availableTileSizes.length,
			currentTileName = this.options.size,
			currentTileIndex = this.options.availableTileSizes.indexOf(currentTileName);

		// Something went wrong - abort
		if (currentTileIndex == -1)
			return;

		// If the next tile doesn't exit, wrap around to the first tile
		if (currentTileIndex+1 >= numberOfTiles)
			currentTileIndex = -1;

		var nextTileName = this.options.availableTileSizes[(currentTileIndex+1)];

		// Add the colspan
		if ($(el).hasClass("square") || $(el).hasClass("rectangle-tall"))
			$(el).removeAttr("data-ss-colspan");
		else
			$(el).attr("data-ss-colspan", "2");

		$(el).removeClass(currentTileName).addClass(nextTileName);

		// Set the next tile name then trigger a rebuild so the card's resize can take place
		this.options.size = nextTileName;
		this.rebuild();
	}

	/**
	 * Rebuilds the dashboard after a new card has been added or deleted
	 */
	Card.prototype.rebuild = function() {
		$(".dashboard-cards").trigger("ss-destroy").trigger("ss-rearrange").shapeshift({
	        minColumns: 3,
	        gutterX: 20,
	        gutterY: 20,
	        paddingX: 0,
	        paddingY: 0,
	        enableDrag : true
        });
	}

	/**
	 * Binds the jQuery event listeners to the Card
	 * @param  string   id    The unique card ID
	 * @param  object   bind  The bindings to attach
	 */
	Card.prototype.bindEventListeners = function(id, bind) {
		var self = this;

		// Only bind the event listener if the object has it
		if (bind.resize)
		{
			$("#" + id + " #card-resize-button").click(function() {
				self.resize();
			});
		}

		if (bind.settings)
		{
			$("#" + id + " #card-settings-button").click(function() {
				console.log("settings");
			});
		}
	}

	/**
	 * Renders a new card instance
	 */
	Card.prototype.render = function() {
		// Prevent the same card from being rendered more than once
		if ($(".dashboard-cards #"+ this.id).length == 1)
		{
			console.log("Card instance already in DOM! Card will not be rendered");
			return;
		}

		// Initialize the card
		this.init();

		// Generate the markup
		var markup = $(defaultCardMarkup[this.options.size]).clone(),
			body = $("<div>").addClass("body"),
			footer = $("<div>").addClass("footer"),
			footerText = $("<span>").addClass("footer-text").text(this.options.footerText),
			bindResize = false,
			bindSettings = false;

		$(footer).append($(footerText));

		// If this card has properties, add a settings button
		if (!$.isEmptyObject(this.options.properties))
		{
			var settingsIcon = $("<span>").addClass("fa fa-gear").attr("id", "card-settings-button");
			$(footer).append($(settingsIcon));
			bindSettings = true;
		}

		// If this card has multiple sizes, show a resize button
		if (this.options.availableTileSizes.length > 1)
		{
			var resizeIcon = $("<span>").addClass("fa fa-expand").attr("id", "card-resize-button");
			$(footer).append($(resizeIcon));
			bindResize = true;
		}

		$(markup).attr("id", this.id);
		$(markup).append($(body)).append($(footer));

		// Apply it to the dashboard, then trigger a dashboard rebuild
		$(".dashboard-cards").append($(markup));
		this.rebuild();
		this.bindEventListeners(this.id, { "resize": bindResize, "settings": bindSettings });
	};


	/**
	 * Constructor
	 */
	function Card(opts) {
		// Populate the options for the card object
		this.options = $.extend({}, this.defaultOptions, opts);
		this.id = this.options.id;

		if (this.id == null)
		{
			console.log("Card initialized without ID! Card will not be rendered.");
			return;
		}

		// Prevent the same card from being rendered more than once
		if ($(".dashboard-cards #"+ this.id).length == 1)
		{
			console.log("Card instance already in DOM! Card will not be rendered");
			return;
		}

		// Set the default tile size if one was not provided
		if (this.options.size == null)
			this.options.size = this.options.availableTileSizes[0];
	};

	// Export the object to the global namespace
	if (typeof module !== "undefined" && module !== null) {
    	module.exports = Card;
  	} else {
    	window.Card = Card;
  	}

}(this));