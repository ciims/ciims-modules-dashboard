var Users = {

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
	 * Users that we have currently loaded
	 * Ajax response should store their information here to prevent having to fire off an Ajax
	 * Request to display the data
	 */
	users : [],

	/**
	 * Search timeout
	 */
	searchTimeout : null,

	/**
	 * Bootstrap endpoint
	 */
	registerUsers : function() {
		// Populate the api credentials
		this.ciims = CiiMSDashboard.getAuthData();

		// Load the initial user list
		this.list(false, this.query, this.page);

		// Bind the search form functionality
		this.bindSearch();

		// Bind the invitation form ajax callbacks
		this.bindInvite();

		// Bind the registration form ajax callbacks
		this.bindRegister();

		$("#NewUserButton").click(function() {
			$("#register_form, #invite_form").show();
			$("#user_edit").hide();
			$(".paginated_results ul li").removeClass("active");
		});
	},

	/**
	 * Bind the registration form
	 */
	bindRegister : function() {
		var self = this;

		$("#RegistrationForm_Submit").click(function() {
			return $("#registration-form").submit();
		});

		$("#registration-form").submit(function(e) {
			$.ajax({
				url: window.location.origin + '/api/user',
				type: 'POST',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				data: {
					'email': $("#RegisterForm_email").val(),
					'password': $("#RegisterForm_password").val(),
					'password_repeat': $("#RegisterForm_password_repeat").val(),
					'username' : $("#RegisterForm_username").val(),
				},
				beforeSend: function() {
					$("#registration-form :input").removeClass("error");
					$("#registration-form").find(".alert").remove();
					CiiMSDashboard.ajaxBeforeSend();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");


					$.each(json.response, function(k, v) { 
						$("#RegisterForm_" + k).addClass("error");
						alert.append($("<p>").text(v));
					});

					$("#registration-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {
					// Clear the field
					$("#registration-form :input").not("#RegistrationForm_Submit").val('');
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
	 * Binds the invitation data to the model
	 */
	bindInvite : function() {
		var self = this;

		$("#InvitationForm_Submit").click(function() {
			return $("#invitation-form").submit();
		});

		$("#invitation-form").submit(function(e) {
			$.ajax({
				url: window.location.origin + '/api/user/invite',
				type: 'POST',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				data: {
					'email': $("#InvitationForm_email").val()
				},
				beforeSend: function() {
					$("#InvitationForm_email").removeClass("error");
					$("#invitation-form").find(".alert").remove();
					CiiMSDashboard.ajaxBeforeSend();
				},
				error: function(data) {
					$("#InvitationForm_email").addClass("error");
					var alert = $("<div>").addClass("alert alert-error").text($.parseJSON(data.responseText).response.email[0]);
					$("#invitation-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {
					// Clear the field
					$("#InvitationForm_email").val('');
					self.renderLi(data.response, $(".paginated_results ul"), true);

					self.ajaxSuccess(data.message);
				},
				completed: CiiMSDashboard.ajaxCompleted()
			});

			return false;
		});
	},

	/**
	 * Renders an LI element
	 * @param object data
	 * @param DOM ul
	 * @param boolean prepend
	 */
	renderLi: function(data, ul, prepend) {
		this.users[data.id] = data;
		if (prepend == undefined)
			prepend = false;

		var li = $("<li>").attr('userId', data.id),
			info = $("<div>");

		// Build the info object
		$(info).addClass("user-info");
		$(info).append($("<h6>").text(data.name));
		$(info).append($("<span>").text(data.email)).attr('title', data.email);
		$(info).append($("<span>").text(data.username));

		// Build the list element
		$(li).addClass(data.role.name);
		$(li).append($("<img>").addClass("user-image").attr("src", "https://www.gravatar.com/avatar/" + md5(data.email) + "?s=40"));
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
	 * Rebinds the click behavior to the appropriate elements
	 */
	clickBehavior : function() {
		var self = this;
		$(".paginated_results ul li").unbind("click");
		$(".paginated_results ul li").click(function() {

			// Remove the active class from the other attributes
			$(".paginated_results ul li").removeClass("active");

			$("#invite_form, #register_form").hide();

			self.populate(Users.users[$(this).attr('userId')]);

			$(this).addClass("active");

			$("#UserForm_Submit").unbind("click");
			$("#UserForm_Submit").click(function(e) {
				e.preventDefault();
				
				var data = {};

				// Select all form elements, except for the button
				$("#user-form :input[type!='button']").each(function() {
					var val = $(this).val(),
						name = $(this).attr('name').replace("Users[", "").replace("]", "");

					data[name] = val;
				});

				$.ajax({
					url: window.location.origin + '/api/user/index/id/' + $("#Users_id").val(),
					type: 'POST',
					headers: {
						'X-Auth-Email': self.ciims.email,
						'X-Auth-Token': self.ciims.token
					},
					data: data,
					beforeSend: function() {
						$("#user-form :input[type!='button']").removeClass("error");
						$("#user-form").find(".alert").remove();
						CiiMSDashboard.ajaxBeforeSend();
					},
					error: function(data) {
						var json = $.parseJSON(data.responseText),
							message = json.message,
							alert = $("<div>").addClass("alert alert-error");

						$.each(json.response, function(k, v) { 
							$("#Users_" + k).addClass("error");
							alert.append($("<p>").text(v));
						});

						$("#user-form").prepend($(alert));
					},
					success: function(data, textStatus, jqXHR) {
						self.ajaxSuccess(data.message);

						// Update the information we have on record
						self.users[data.response.id] = data.response;

						// Reutilize the click to transition the view
						$("#NewUserButton").click();
					},
					completed: CiiMSDashboard.ajaxCompleted()
				});

				return false;
			});
		});
	},

	/**
	 * Populates the user-form with the data provided from Users.users[]
	 * @param object data
	 */
	populate : function(data) {
		$.each(data, function(k, v) {
			$("#user-form :input#Users_"+k).val(v);
		});
		$("#user_edit").show();
	},

	/**
	 * Performs an AJAX GET query to load the available users
	 * @param boolean clear
	 * @param string query
	 * @param int page
	 */
	list : function(clear, query, page) {
		var self = this;
		$.ajax({
			url: window.location.origin + '/api/user?page=' + page + (query == null ? '' : '&Users[username]='+query),
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