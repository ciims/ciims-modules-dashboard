var Analytics = {

	/**
	 * CiiMS's data information
	 * @var array ciims
	 */
	ciims : {},

	/**
	 * The change timeout
	 * @var timeout changeTimeout
	 */
	changeTimeout : null,

	/**
	 * Init bootstrap method
	 */
	init : function() {

		this.ciims = CiiMSDashboard.getAuthData();

		this.nanoscroller();

		this.centerAlignImages();

		this.providerClickBehavior();

		this.changeBehavior();
	},

	/**
	 * Provider click behavior
	 */
	providerClickBehavior: function() {
		var self = this;

		$(".provider").click(function(e) {
			e.preventDefault();
			$(".provider").removeClass("active");
			$(this).addClass("active");

			var name = $(this).attr("data-attr-name");
			$(".options-panel").hide();
			$(".options-panel."+name).show();

			self.nanoscroller();
		})
	},

	/**
	 * Tricky Js to actually center align images
	 */
	centerAlignImages: function() {
		setTimeout(function() {
			$(".providers img").each(function() {
				var height = $(this).height(),
					top = (50 - ( height / 2 ));
			    $(this).css("padding-top", top);
			});
		}, 500);
	},

	/**
	 * Ajax success callback
	 */
	ajaxSuccess: function(message) {
		var self = this;
		self.nanoscroller();
	},

	/**
	 * Handles triggering the ajax change request.
	 */
	changeBehavior : function() {
		var self = this;
		$("input").change(function() {
			clearTimeout(self.changeTimeout);
			self.changeTimeout = setTimeout(function() {
				self.submitAjaxChangeRequest();
			}, 250);			
		});

		$("input").keyup(function() {
			clearTimeout(self.changeTimeout);
			self.changeTimeout = setTimeout(function() {
				self.submitAjaxChangeRequest();
			}, 250);			
		});
	},

	/**
	 * Submits an ajax change request
	 */
	submitAjaxChangeRequest : function() {

		var self = this,
			data = $("form").serialize();

		$.ajax({
			url: window.location.origin + '/api/setting/analytics',
			type: 'POST',
			headers: {
				'X-Auth-Email': self.ciims.email,
				'X-Auth-Token': self.ciims.token
			},
			data: data,
			beforeSend: function() {
				CiiMSDashboard.ajaxBeforeSend();
			},
			success: function(data, textStatus, jqXHR) {
				self.ajaxSuccess(data.success);
			},
			completed: CiiMSDashboard.ajaxCompleted()
		});
	},

	/**
	 * Triggers the nanoscroller
	 * @return nanoScroller
	 */
	nanoscroller : function() {
		return $(".nano").nanoScroller({ iOSNativeScrolling: true }); 
	},
};