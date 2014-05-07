var Users = {

	ciims : {},

	page : 1,

	registerUsers : function() {
		this.ciims = $.parseJSON(localStorage.getItem('ciims'));

		this.list();
		this.bindSearch();
	},

	bindSearch : function() {

	},

	/**
	 * Rebinds the click behavior to the appropriate elements
	 */
	clickBehavior : function() {
		// Unbind the existing click behaviors
		$(".paginated_results ul li").unbind("click");

		// Rebind it
		$(".paginated_results ul li").click(function() {
			// Remove the active state from all elements
			$(".paginated_results ul li").removeClass("active");

			$(this).addClass("active");
		});
	},

	/**
	 * Performs an AJAX GET query to load the available users
	 */
	list : function(clear, query, page) {

		if (query == undefined)
			query = "";

		if (page == undefined)
			page = 1;

		if (clear == undefined)
			clear = false;

		var self = this;
		$.ajax({
			url: window.location.origin + '/api/user?page=' + page,
			type: 'GET',
			headers: {
				'X-Auth-Email': self.ciims.email,
				'X-Auth-Token': self.ciims.token
			},
			beforeSend: function() {
				// Clear the results on before send, if requested
				if (clear)
					$(".paginated_results ul").empty()
			},
			success: function(data, textStatus, jqXHR) {
				this.page++;
				var ul = $(".paginated_results ul");
				$(data.response).each(function() {
					var li = $("<li>"),
						info = $("<div>");

					// Build the info object
					$(info).addClass("user-info");
					$(info).append($("<h6>").text(this.name));
					$(info).append($("<span>").text(this.email));
					$(info).append($("<span>").text(this.displayName));

					// Build the list element
					$(li).addClass(this.role.name);
					$(li).append($("<img>").addClass("user-image").attr("src", "https://www.gravatar.com/avatar/" + md5(this.email) + "?s=40"));
					$(li).append($(info));
					
					// Append it to the list
					$(ul).append($(li));
				});

				Users.clickBehavior();
				self.nanoscroller();
			}
		});
	},

	/**
	 * Triggers the nanoscroller
	 * @return nanoScroller
	 */
	nanoscroller : function() {
		$(".nano").nanoScroller({ destroy: true });
		return $(".nano").nanoScroller({ iOSNativeScrolling: true }); 
	},
};