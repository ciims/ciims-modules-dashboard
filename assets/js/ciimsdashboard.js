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

		// If the authdata is still an empty object, we need to perform re-authentication 
		if (this.authData == null)
		{
			var next = window.location.pathname.substring('/dashboard'),
				base = window.location.pathname.substring(0, window.location.pathname.indexOf('dashboard')),
				origin = window.location.origin;

			window.location = origin+base+'logout?next='+next;
		}

		return this.authData;
	},

	/**
	 * Sets the authdata
	 */
	setAuthData : function() {
		this.authData = $.parseJSON(localStorage.getItem('ciims'));
	}
};