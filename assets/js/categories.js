var Categories = {

	/**
	 * CiiMS data from localStorage
	 */
	ciims : {},

	/**
	 * The current page
	 */
	page : 1,

	/**
	 * Search query, if any
	 */
	query : null,

	/**
	 * Categories that we have currently loaded
	 * Ajax response should store their information here to prevent having to fire off an Ajax
	 * Request to display the data
	 */
	categories : [],

	/**
	 * Search timeout
	 */
	searchTimeout : null,

	registerCategories : function() {
		this.ciims = CiiMSDashboard.getAuthData();

		// Load the initial categories list
		this.list(false, this.query, this.page);

		// Bind the search form functionality
		this.bindSearch();

		// Binds the creation form functionality
		this.bindCreate();

		$("#NewCategoryButton").click(function() {
			$("#create_form").show();
			$("#edit_form").hide();
			$(".paginated_results ul li").removeClass("active");
		});
	},

	// Create stuff
	bindCreate : function() {

		var self = this;
		$("#CategoryCreate_Submit").click(function() {
			return $("#category-form").submit();
		});
 
		$("#category-form").submit(function(e) {
			var data = {};
			$("#category-form :input").not("#CategoryCreate_Submit").each(function() {
				var el = this,
					name = $(this).attr("id").replace("Categories_", ""),
					val = $(this).val();
				data[name] = val;
			});

			$.ajax({
				url: window.location.origin + '/api/category',
				type: 'POST',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				data: data,
				beforeSend: function() {
					$("#category-form :input").removeClass("error");
					$("#category-form").find(".alert").remove();
					CiiMSDashboard.ajaxBeforeSend();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");


					$.each(json.response, function(k, v) { 
						$("#Categories_" + k).addClass("error");
						alert.append($("<p>").text(v));
					});

					$("#category-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {
					// Clear the field
					$("#category-form :input").not("#CategoryCreate_Submit").val('');
					$("#Categories_parent_id").val(1);
					self.renderLi(data.response, $(".paginated_results ul"), true);

					self.ajaxSuccess(data.success);
				},
				completed: CiiMSDashboard.ajaxCompleted()
			});

			return false;
		});
	},

	/**
	 * Ajax success callback
	 */
	ajaxSuccess: function(message) {

		var self = this,
			alert = $("<section>").addClass("settings_container alert-show"),
			fieldset = $("<fieldset>"),
			divOverflow = $("<div>"),
			div = $("<div>").addClass("alert alert-success").css("width", "auto").css("margin-bottom", "0px").text(message);

		$(divOverflow).append($(div));
		$(fieldset).append($(divOverflow));
		$(alert).append($(fieldset));

		if (message != null)
		{
			$("main .paginated_results").after(alert);

			// Automatically hide the alert after 5s
			setTimeout(function() {
				$(".alert-show").remove();
			}, 5000);
		}

		// Bind behaviors
		self.clickBehavior();
		self.nanoscroller();
	},

	/**
	 * Renders an LI element
	 * @param object data
	 * @param DOM ul
	 * @param boolean prepend
	 */
	renderLi: function(data, ul, prepend) {
		var self = this;
		self.categories[data.id] = data;

		if (prepend == undefined)
			prepend = false;

		var li = $("<li>").attr('category_id', data.id),
			info = $("<div>");

		// Build the info object
		$(info).addClass("user-info");
		$(info).append($("<h6>").text(data.name));
		$(info).append($("<span>").text(data.parent.name)).attr('title', data.parent.name);

		$(li).append($(info));
		
		// Append it to the list
		if (prepend)
			$(ul).prepend($(li));
		else
			$(ul).append($(li));

	},

	/**
	 * Binds search functionality to the list view
	 */
	bindSearch : function() {
		// When the search field changes
		var self = this;
		$("#search").keyup(function() {
			// Set a timeout to perform the search
			clearTimeout(self.searchTimeout);
			self.searchTimeout = setTimeout(function() {
				self.query = $("#search").val();
				self.list(true, self.query, 1);
			}, 500);
		});
	},
	
	/**
	 * Populates the category-form with the data provided from Categories.categories[]
	 * @param object data
	 */
	populate : function(data) {
		$.each(data, function(k, v) {
			$("#m-category-form :input#Categories_"+k).val(v);
		});
		$("#edit_form").show();
	},

	/**
	 * Rebinds the click behavior to the appropriate elements
	 */
	clickBehavior : function() {
		var self = this;
		$(".paginated_results ul li").unbind("click");
		$(".paginated_results ul li").click(function() {

			// Remove the active class from the other attributes
			$(".paginated_results ul li").removeClass("active");

			$("#create_form").hide();

			self.populate(Categories.categories[$(this).attr('category_id')]);

			$(this).addClass("active");

			self.deleteBehavior();
			self.updateBehavior();
		});
	},

	deleteBehavior: function() {
		var self = this;
		$("#CategoryDelete_Submit").click(function(e) {
			e.preventDefault();
			$.ajax({
				url: window.location.origin + '/api/category/' + $("#m-category-form #Categories_id").val(),
				type: 'DELETE',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				beforeSend: function() {
					CiiMSDashboard.ajaxBeforeSend();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");

					$("#category-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {
					self.ajaxSuccess(data.success);

					var id = $("#m-category-form #Categories_id").val();
					self.categories.remove(id);

					$(".paginated_results ul li[category_id=" + id + "]").remove();

					// Reutilize the click to transition the view
					$("#NewCategoryButton").click();
				},
				completed: CiiMSDashboard.ajaxCompleted()
			});

			return false;
		});
	},

	/**
	 * Updates a category
	 */
	updateBehavior: function() {
		var self = this;
		$("#CategoryUpdate_Submit").click(function() {
			return $("#m-category-form").submit();
		});
 
		$("#m-category-form").submit(function(e) {
			var data = {};
			$("#m-category-form :input").not("#CategoryUpdate_Submit").each(function() {
				var el = this,
					name = $(this).attr("id").replace("Categories_", ""),
					val = $(this).val();
				data[name] = val;
			});

			$.ajax({
				url: window.location.origin + '/api/category/' + $("#m-category-form #Categories_id").val(),
				type: 'POST',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				data: data,
				beforeSend: function() {
					$("#m-category-form :input").removeClass("error");
					$("#m-category-form").find(".alert").remove();
					CiiMSDashboard.ajaxBeforeSend();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");


					$.each(json.response, function(k, v) { 
						$("#Categories_" + k).addClass("error");
						alert.append($("<p>").text(v));
					});

					$("#category-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {

					//self.renderLi(data.response, $(".paginated_results ul"), true);

					self.ajaxSuccess(data.success);

					// Update the information we have on record
					self.categories[data.response.id] = data.response;

					// Reutilize the click to transition the view
					$("#NewCategoryButton").click();
				},
				completed: CiiMSDashboard.ajaxCompleted()
			});

			return false;
		});
	},

	/**
	 * Performs an AJAX GET query to load the available categories
	 * @param boolean clear
	 * @param string query
	 * @param int page
	 */
	list : function(clear, query, page) {
		var self = this;
		$.ajax({
			url: window.location.origin + '/api/category/index?page=' + page + (query == null ? '' : '&Categories[name]='+query),
			type: 'GET',
			headers: {
				'X-Auth-Email': self.ciims.email,
				'X-Auth-Token': self.ciims.token
			},
			beforeSend: function() {
				// Clear the results on before send, if requested
				if (clear)
					$(".paginated_results ul").empty();

				self.page = page;

				CiiMSDashboard.ajaxBeforeSend();
			},
			error: function(data) {
				var json = $.parseJSON(data.responseText);

				// unbind the scrolling event to prevent unecessary requests to the API
				if (json.status == 404)
					$(".paginated_results .nano .nano-content").unbind("scroll");
			},
			success: function(data, textStatus, jqXHR) {
				var ul = $(".paginated_results ul");
				$(data.response).each(function() {
					self.renderLi(this, ul);
				});

				self.ajaxSuccess(null);
			},
			completed: CiiMSDashboard.ajaxCompleted()
		});
	},

	/**
	 * Triggers the nanoscroller
	 * @return nanoScroller
	 */
	nanoscroller : function() {
		// Froce nanoscroller to rebuild itself
		var self = this;
		
		$(".paginated_results .nano").nanoScroller({ destroy: true });
		$(".paginated_results .nano").nanoScroller({ iOSNativeScrolling: true }); 

		// Rebind the scrollend behavior
		$(".paginated_results .nano .nano-content").unbind("scroll");
		$(".paginated_results .nano .nano-content").bind("scroll", function(e) {
			if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight - 1)
		    	self.list(false, self.query, ++self.page);
		});
	},
};