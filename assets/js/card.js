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
		name: null,
		version: null,
		footerText: "",
		properties: {},
		size: null,
		availableTileSizes: [ "square" ],
		css: null,
		js: null,
		html: null,
	};
	
	/**
	 * Resizes a card, based upon it's available options
	 */
	Card.prototype.resize = function() {

		// Retrieve information about the current tileset
		var self = this,
		    el = "#"+this.id,
			numberOfTiles = this.options.availableTileSizes.length,
			currentTileName = this.options.size,
			currentTileIndex = this.options.availableTileSizes.indexOf(currentTileName),
			properties = {};

		// Something went wrong - abort
		if (currentTileIndex == -1)
			return;

		// If the next tile doesn't exit, wrap around to the first tile
		if (currentTileIndex+1 >= numberOfTiles)
			currentTileIndex = -1;

		var nextTileName = self.options.availableTileSizes[(currentTileIndex+1)];

		// Add the colspan
		$(el).removeClass(currentTileName).addClass(nextTileName);
		if (nextTileName == "square" || nextTileName == "rectangleTall")
			$(el).attr("data-ss-colspan", "1");
		else
			$(el).attr("data-ss-colspan", "2");

		// Set the next tile name then trigger a rebuild so the card's resize can take place
		self.options.size = nextTileName;

		if (!$.isEmptyObject(self.options.properties))
		{
			$.each(self.options.properties, function(key, obj) {
				properties[key] = obj.value;
			});
		}

		// Save the resize data
		$.ajax({
			url: window.location.origin + '/api/card/details/id/'+self.id,
			type: 'POST',
			headers: CiiMSDashboard.getRequestHeaders(),
			beforeSend: CiiMSDashboard.ajaxBeforeSend(),
			data: {
				"size": self.options.size,
				"properties": properties
			},
			completed: CiiMSDashboard.ajaxCompleted()
		});

		self.rebuild();
	}

	/**
	 * Rebuilds the dashboard after a new card has been added or deleted
	 */
	Card.prototype.rebuild = function() {
		$(".dashboard-cards").trigger("ss-destroy").trigger("ss-rearrange").shapeshift({
			align: "left",
	        minColumns: 1,
	        maxColumns: 2,
	        gutterX: 20,
	        gutterY: 20,
	        paddingX: 0,
	        paddingY: 0,
	        enableResize: true,
	        enableDrag : true,
	        animated: true,
		    animationSpeed: 225,
		    animationThreshold: 100,
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
				$(".shader").addClass("visible");
				self.settings();
			});
		}

		// Hide the shader and dismiss the sidebar
		$(".shader").click(function() {
			$(this).removeClass("visible");
			$(".settings-sidebar").removeClass("visible");
		});
	}

	/**
	 * Populates the settings container with the appropriate details
	 */
	Card.prototype.settings = function() {
		var self = this,
			element = $(".settings-sidebar"),
			cCardID = $(element).attr("card-id"),
			properties = {};

		// If the sidebar is bound to the current card ID, then just toggle the visible class on and off for the sliding animation.
		if (cCardID == self.options.id)
		{
			$(element).toggleClass("visible");
			if ($(element).hasClass("visible"))
				$(".shader").addClass("visible");
			else
				$(".shader").removeClass("visible");

			return;
		}

		// Hide the sidebar, empty it, and remove the card-id
		$(element).removeClass("visible").empty().attr("card-id", self.options.id);

		// Create some other variables
		var settingsText = $("#settings-text").text()
			h2 = $("<h2>").text(settingsText.replace("{cardname}", self.options.name)),
			form = $("<form>").addClass("pure-form pure-form-stacked"),
			submit = $("#submit-card-button").clone().show(),
			remove = $("#card-uninstall-button").clone().show();

		// Append the form
		$.each(self.options.properties, function(name, opts) {
			var label = $("<label>").attr("for", name).addClass("input-group").text(opts.name),
				input = $("<input>").attr("type", opts.type).attr("value", opts.value).attr("name", name);
				group = $("<div>").addClass("pure-control-group").append($(label)).append($(input));

			$(form).append($(group));
		});

		// Append the elements to the sidebar, then display it.
		$(element).append($(h2)).append($(form)).append($(submit)).append($(remove)).addClass("visible");

		$(".settings-sidebar #card-uninstall-button").click(function(e) {
			e.preventDefault();

			// Delete the card
			$.ajax({
				url: window.location.origin + '/api/card/index/id/'+self.id,
				type: 'DELETE',
				headers: CiiMSDashboard.getRequestHeaders(),
				beforeSend: CiiMSDashboard.ajaxBeforeSend(),
				success: function() {
					$(".shader").removeClass("visible");
					$(".settings-sidebar").removeClass("visible");
					$(".dashboard-cards div#"+self.id).remove();
					self.rebuild();
				},
				completed: CiiMSDashboard.ajaxCompleted()
			});
		});

		// Bind the click behavior to the button
		$(".settings-sidebar #submit-card-button").click(function(e) {
			e.preventDefault();
			var formData = {},
				hasErrors = false,
				newProperties = self.options.properties;

			$(".settings-sidebar form input").each(function() {
				newProperties[$(this).attr("name")].value = $(this).val();
				$(this).removeClass("error");
				if (!$(this).context.validity.valid)
				{
					$(this).addClass("error");
					hasErrors = true;
				}
			});

			// Abort the submission if there are errors with this post
			if (hasErrors)
				return;

			// Apply the changes locally
			self.options.properties = newProperties;

			$.each(newProperties, function(key, obj) {
				properties[key] = obj.value;
			});

			// Save the resize data
			$.ajax({
				url: window.location.origin + '/api/card/details/id/'+self.id,
				type: 'POST',
				headers: CiiMSDashboard.getRequestHeaders(),
				beforeSend: CiiMSDashboard.ajaxBeforeSend(),
				data: {
					"size": self.options.size,
					"properties": properties
				},
				success: function() {
					$(".shader").removeClass("visible");
					$(".settings-sidebar").removeClass("visible");
					self.registerScript('js', 'reload');
				},
				error: function() {
					// either the Ajax failed, or something broke in the script.
					$(".settings-sidebar form input").each(function() {
						$(this).addClass("error");
					});

					// Rebuild the dashboard
					self.rebuild();
				},
				completed: CiiMSDashboard.ajaxCompleted()
			});

		});
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

		// Register the CSS to be applied to the card
		this.registerScript('css');

		// Generate the markup
		var markup = $(defaultCardMarkup[this.options.size]).clone(),
			body = $("<div>").addClass("body"),
			footer = $("<div>").addClass("footer"),
			footerText = $("<span>").addClass("footer-text").text(this.options.footerText),
			bindResize = false,
			bindSettings = false,
			cardClass = this.options.name.toLowerCase()+"-"+this.options.version.replace(/\./g, "-"),
			self = this;

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
		$(markup).addClass(cardClass);

		// Load the card markup and apply it to the body
		$.get(this.options.basePath+"/card.html", function(data) {
			$(body).html(data);
			
			$(markup).append($(body)).append($(footer));

			// Apply it to the dashboard, then trigger a dashboard rebuild
			$(".dashboard-cards").append($(markup));
			self.rebuild();
			self.bindEventListeners(self.id, { "resize": bindResize, "settings": bindSettings });
			// Bind the JS
			self.registerScript('js', 'render');
		}).fail(function() {
			// Wipe this object
			window.cards[self.options.id] = null;
			console.log("Card markup failed to load, aborting rendering");
			return;
		});
	};

	/**
	 * Registers the cSS or JS file to the DOM
	 * @param  string 	type 	the type of script to bind to the DOM
	 */
	Card.prototype.registerScript = function(type, e)
	{
		var self = this,
			e = (typeof e == "undefined") ? null : e,
			jsCardClass = self.options.name;

		if (type == "js")
		{
			$.ajaxSetup({ cache: true });
			$.getScript(this.options.basePath+"/card.js", function() {
				$.ajaxSetup({ cache: false });

				if (e == null)
					return;

				if (typeof window.cardObjects == "undefined")
					window.cardObjects = {};

				if (typeof window.cardObjects[self.id] == "undefined")
				{
					var element = window[jsCardClass];
					window.cardObjects[self.id] = element;
				}

				if (e == "init")
				{
					event2 = "preload";
					window.cardObjects[self.id][event2](self.id);
				}
				
				window.cardObjects[self.id][e]();
				
			});
		}
		else if (type == "css")
			$.getCSS(this.options.basePath+"/card.css");
	}

	/**
	 * Constructor
	 */
	function Card(opts) {
		// Populate the options for the card object
		this.options = $.extend({}, this.defaultOptions, opts);
		this.id = this.options.id;

		if (this.options.name == null)
		{
			console.log("Card instantiated without name! Card will not be rendered");
			return;
		}

		if (this.options.version == null)
		{
			console.log("Card instantiated without version number! Card will not be rendered");
			return;
		}

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

		this.registerScript('js', 'init');
	};

	// Export the object to the global namespace
	if (typeof module !== "undefined" && module !== null)
    	module.exports = Card;
  	else
    	window.Card = Card;

}(this));