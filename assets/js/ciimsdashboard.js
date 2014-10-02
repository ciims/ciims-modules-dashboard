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

	getEndpoint : function() {
		return $("#endpoint").attr('data-attr-endpoint');
	},


	/**
	 * Sets the authdata
	 */
	setAuthData : function() {
		this.authData = $.parseJSON(localStorage.getItem('ciims'));
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
};