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
	 * Sets the authdata
	 */
	setAuthData : function() {
		this.authData = $.parseJSON(localStorage.getItem('ciims'));
	}
};