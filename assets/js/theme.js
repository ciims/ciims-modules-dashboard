var Theme = {
	
	/**
	 * CiiMS's data information
	 * @var array ciims
	 */
	ciims : {},

	init : function() {
		Settings.nanoscroller();

		this.ciims = $.parseJSON(localStorage.getItem('ciims'));

		$("div.theme-details").readmore({
			maxHeight: 300
		});

		hljs.initHighlightingOnLoad();

		if (this.ciims.hsoted === false)
			this.checkforUpdates();
		this.update();
		this.changeTheme();
		this.addTheme();
	},

	/**
	 * Behavior for adding a new theme
	 */
	addTheme: function() {
		var self = this;
		$("a#installThemeButton").click(function() {
			$(".theme-list section.theme-details").empty();
			$(".paginated_results ul li").unbind("click");

			$.ajax({
				url: window.location.origin + '/api/theme/list',
				type: 'GET',
				dataType: 'json',
				headers: CiiMSDashboard.getRequestHeaders(),
				success : function(data) {
					$(".paginated_results.contained ul").empty();
					// Append the name to the list
					$.each(data.response, function(name, obj) {
						var li = $("<li>"),
							info = $("<div>");

						$(info).addClass("user-info");
						$(info).append($("<h6>").text(name));
						$(li).append($(info));
						$(li).attr("name", name).attr("version", obj["version"]);
						$(".paginated_results.contained ul").append($(li));
					});

					self.bindLiClickBehavior();

					// Show the container
					$(".theme-list").toggleClass("visible");
					$(".shader").toggleClass("visible");
					self.nanoscroller();

				}
			});
		});

		$(".shader").click(function() {
			$(this).removeClass("visible");
			$(".theme-list").removeClass("visible");
		})
	},

	/**
	 * Specialized click behavior for the paginated_results list item
	 */
	bindLiClickBehavior: function() {
		var self = this,
			container = $(".theme-list section.theme-details");

		$(".paginated_results ul li").click(function() {
			var name = $(this).text().replace('ciims-themes/', '').toLowerCase();
			// Remove the active class from the other attributes
			$(".paginated_results ul li").removeClass("active");
			$(this).addClass("active");
			$(container).empty();
			console.log(name);

			var url = self.endpoint + "/" + $(this).attr("name") + "/" + $(this).attr("version");

			// Load the card.json data and render the details pane
			$.ajax({
				url: window.location.origin + '/api/theme/details/name/' +  name,
				type: 'GET',
				dataType: 'json',
				headers: CiiMSDashboard.getRequestHeaders(),
				success: function(data) {
					data = data.response;
					// Get the README file from Github
					$.get('https://cdn.rawgit.com'+data["repository"].replace('https://github.com', '') + "/" + data["latest-version"] + '/README.md', function(res) {
						var nano = $("<div>").addClass("nano"),
							nanoContent = $("<div>").addClass("nano-content"),
							header = $("<header>"),
							inner = $("<div>"),
							img = $("<img>"),
							title = $("<span>").text(data.name),
							btn = $("#theme-install-button").clone().show(),
							divider = $("<div>").addClass("divider"),
							p = $("<p>").html(marked(res));

						$(header).append($(title)).append($(btn));
						$(img).attr("src", 'https://cdn.rawgit.com'+data["repository"].replace('https://github.com', '') + "/" + data["latest-version"] + '/default.png');
						$(inner).append($(img)).append($(divider));

						$(inner).append($(p));

						$(nanoContent).append($(inner));
						$(nano).append($(nanoContent));
						$(container).append($(header)).append($(nano));
						self.nanoscroller();

					});

					/*
					// Bind the click behavior to install the card
				$("#card-install-button").click(function(e) {
					e.preventDefault();
					var url = $(this).attr("url");
					self.installCard(url);
				})
*/
				}
			});
		});
	},

	/**
	 * Checks if an update is available for a theme and provides actionalable feedback to the end user
	 */
	checkforUpdates : function() {
		var self = this;
		$(".updater").each(function() {
			var name = $(this).attr('data-attr-name');
			var btn = this;

			$.ajax({
				url: window.location.origin + '/api/theme/updateCheck/name/'+name,
				type: 'GET',
				headers: CiiMSDashboard.getRequestHeaders(),
				success : function(data) {
					if (data.response)
					{
						$(btn).hide();
						$(btn).parent().find('.update-available').show();
					}
					else
					{
						$(btn).hide();
						$(btn).parent().find('.uptodate').show();
					}

				}
			});
		});
	},

	/**
	 * Attempts to apply an update to the theme
	 */
	update : function() {
		var self = this;
		$(".update-available").click(function() {
			var name = $(this).attr('data-attr-name');
			var btn = this;

			$.ajax({
				url: window.location.origin + '/api/theme/update/name/'+name,
				type: 'GET',
				headers: CiiMSDashboard.getRequestHeaders(),
				beforeSend : function() {
					$(btn).hide();
					$(btn).parent().find('.updating').show();
				},
				success : function(data) {
					$(btn).parent().find('.updating').hide();
					$(btn).parent().find('.uptodate').show();
					$(btn).parent().parent().find('.version').text(data.response['latest-version']);
				},
				error : function() {
					$(btn).parent().find('.updating').hide();
					$(btn).parent().find('.updatefailed').show();
				}
			});
		});
	},

	changeTheme : function() {
		var self = this;
		$(".usetheme").click(function() {
			var name = $(this).attr('data-attr-name');
			var btn = this;

			$.ajax({
				url: window.location.origin + '/api/theme/changetheme/name/'+name,
				type: 'GET',
				headers: CiiMSDashboard.getRequestHeaders(),
				success : function(data) {
					var activeTheme = $(".activetheme").clone(),
						present = $(btn).clone();

					$(".activetheme").after($(present));
					$(".activetheme").remove();

					$(btn).hide();
					$(btn).after($(activeTheme));

					self.changeTheme();
				}
			});
		});
	},

	/**
	 * Nanoscrollers function
	 */
	nanoscroller : function() {
		return $(".theme-list .nano").nanoScroller({ iOSNativeScrolling: true }); 
	}
};