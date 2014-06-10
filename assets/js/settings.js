var Settings = {
	
	timeout: null,

	/**
	 * Loads the settings
	 */
	registerSettings : function() {

		// Nanoscroller
		this.nanoscroller();

		// Tracks input change event
		this.inputChange();
	},

	flushCache : function() {
		$("#flush_cache").click(function(e) {
			e.preventDefault();
			// Self
			var self = this,
				ciims = $.parseJSON(localStorage.getItem('ciims'));

			$.ajax({
				url: Settings.getRoute() + "/flushcache",
				type: 'GET',
				headers: {
					'X-Auth-Email': ciims.email,
					'X-Auth-Token': ciims.token
				},
				beforeSend: function() {
					$("#nav-icon").removeClass("fa-ellipsis-v");

					if ($("#nav-icon").find("span").length == 0)
					{
						var element = $("<span>").addClass("fa fa-spinner fa-spin active");
						$("#nav-icon").append($(element));
					}

					$("legend").parent().find(".alert").remove();
				},
				complete: function() {
					setTimeout(function() {
						$("#nav-icon").addClass("fa-ellipsis-v");
						$("#nav-icon").find("span").remove(); 
					}, 1000);
				}
			});

			return false;
		});
	},

	/**
	 * Tests email connection settings
	 */
	testEmailSettings : function() {
		$("a#testEmailSettings").click(function(e) {
			e.preventDefault();
			// Self
			var self = this,
				ciims = $.parseJSON(localStorage.getItem('ciims'));

			$.ajax({
				url: Settings.getRoute() + "test",
				type: 'GET',
				headers: {
					'X-Auth-Email': ciims.email,
					'X-Auth-Token': ciims.token
				},
				beforeSend: function() {
					$("#nav-icon").removeClass("fa-ellipsis-v");

					if ($("#nav-icon").find("span").length == 0)
					{
						var element = $("<span>").addClass("fa fa-spinner fa-spin active");
						$("#nav-icon").append($(element));
					}

					$("legend").parent().find(".alert").remove();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");

					alert.html(message);
					$("legend").after($(alert));
				},
				success: function(json, textStatus, jqXHR) {
					var message = json.message,
						alert = $("<div>").addClass("alert alert-success");

					alert.html(message);
					$("legend").after($(alert));
				},
				complete: function() {
					setTimeout(function() {
						$("#nav-icon").addClass("fa-ellipsis-v");
						$("#nav-icon").find("span").remove(); 
					}, 1000);
				}
			});

			return false;
		});
	},

	/**
	 * Change event tracking
	 */
	inputChange : function() {
		var self = this;
		$("form :input").change(function() {
			self.changeEvent();
		});

		$("form :input").keyup(function() {
			self.changeEvent();
		});
	},

	changeEvent : function() {

		// Self
		var self = this,
			ciims = $.parseJSON(localStorage.getItem('ciims'));

		// Clears the previously set timeout
		clearTimeout(this.timeout);

		// Sets the timeout
		this.timeout = setTimeout(function() {
			$.ajax({
				url: self.getRoute(),
				data: self.getAttributes(),
				type: 'POST',
				headers: {
					'X-Auth-Email': ciims.email,
					'X-Auth-Token': ciims.token
				},
				beforeSend: function() {
					$("#nav-icon").removeClass("fa-ellipsis-v");

					if ($("#nav-icon").find("span").length == 0)
					{
						var element = $("<span>").addClass("fa fa-spinner fa-spin active");
						$("#nav-icon").append($(element));
					}
				},
				complete: function() {
					setTimeout(function() {
						$("#nav-icon").addClass("fa-ellipsis-v");
						$("#nav-icon").find("span").remove(); 
					}, 1000);
				}
			});
		}, 500);
	},
	
	/**
	 * Retrieves the appropriate route
	 * @return string
	 */
	getRoute : function() {
		var origin 		= window.location.origin,
			uri 		= window.location.pathname,
			path 		= uri.split('/'),
			controller 	= path[2].singularize();

		path[1] = 'api';
		path[2] = controller;

		return path.join("/");
	},

	/**
	 * Triggers the nanoscroller
	 * @return nanoScroller
	 */
	nanoscroller : function() {
		return $(".nano").nanoScroller({ iOSNativeScrolling: true }); 
	},

	/**
	 * Retrieves the settings form attributes
	 * @return Object
	 */
	getAttributes : function() {
		var inputs = $("form :input"),
			values = {};

		$(inputs).each(function() { 
			if ($(this).attr("type") == "checkbox")
				values[this.name] = $(this).prop('checked') == true ? 1 : 0;
			else
				values[this.name] = $(this).val();
		});

		return values;
	}
};