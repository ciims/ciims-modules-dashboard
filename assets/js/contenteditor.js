var ContentEditor = {

	ciims : null,

	init : function() {
		this.ciims = CiiMSDashboard.getAuthData();
	},

	marked : function(data) {
		return Content.marked(data);
	}
};