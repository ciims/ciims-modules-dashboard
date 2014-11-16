var CiiMSDashboard = {
	
	/**
	 * Authentication data for the API
	 * @var authData
	 */
	authData : false,

	/**
	 * Rerieves the authdata
	 * @return object
	 */
	getAuthData : function() {
		if (this.authData == false)
			this.setAuthData();

		return this.authData;
	},

	/**
	 * Wrapper to retrieve the request headers
	 */
	getRequestHeaders: function() {
		authData = this.getAuthData();

		return {
			'X-Auth-Email': authData.email,
			'X-Auth-Token': authData.token
		};
	},

	/**
	 * Returns the ISO2 language code
	 */
	getLanguage: function() {
		var authData = this.getAuthData();
		var language = authData.language;
		var iso2 = language.split("_");

		return iso2[0]; 
	},

	/**
	 * Retrieves the base endpoint
	 */
	getEndpoint : function() {
		return $("#endpoint").attr('data-attr-endpoint');
	},


	/**
	 * Sets the authdata
	 */
	setAuthData : function() {
		this.authData = $.parseJSON(localStorage.getItem('ciims'));
	},

	ajaxSuccess: function() {

	},
	
	/**
	 * Before send Ajax behavior
	 */
	ajaxBeforeSend: function() {
		$("#nav-icon").removeClass("fa-ellipsis-v");

		if ($("#nav-icon").find("span").length == 0)
		{
			var element = $("<span>").addClass("fa fa-spinner fa-spin active");
			$("#nav-icon").append($(element));
		}

		// Remove all the previous success messages
		$(".alert-show").remove();
	},

	/**
	 * Ajax completed callback
	 */
	ajaxCompleted: function() {
		setTimeout(function() {
			$("#nav-icon").addClass("fa-ellipsis-v");
			$("#nav-icon").find("span").remove(); 
		}, 500);
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
	}
};