var Content = {

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
	 * Filters that should be applied
	 */
	filter : null,

	/**
	 * Order that results should be displayed in
	 */
	order : null,

	/**
	 * Content that we have currently loaded
	 * Ajax response should store their information here to prevent having to fire off an Ajax
	 * Request to display the data
	 */
	content : [],
	contentCopy: [],

	/**
	 * Search timeout
	 */
	searchTimeout : null,

	init : function() {
		this.ciims = CiiMSDashboard.getAuthData();

		// Load the initial content list
		this.list(false, this.query, this.page);

		// Bind the search form functionality
		this.bindSearch();
		this.bindFilter();
		this.bindSorting();
	},

	/**
	 * Ajax Before send parent
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
		}, 1000);
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
	 * Render wrapper
	 * @param array data
	 */
	render : function(data) {
		var self = this;

		var ul = $(".paginated_results ul");
		$(data).each(function() {
			self.renderLi(this, ul);
			$(".timeago").timeago();
			// Render the comment counts
			Comments.commentCount()

			// Wait until the data has finished loading before calling completed
			self.ajaxCompleted();
		});
	},

	/**
	 * Renders an LI element
	 * @param object data
	 * @param DOM ul
	 * @param boolean prepend
	 */
	renderLi: function(data, ul, prepend) {
		var self = this;
		self.content[data.id] = data;

		if (prepend == undefined)
			prepend = false;

		var li = $("<li>").attr('content_id', data.id),
			info = $("<div>"),
			side = $("<div>").addClass("icons");

		// Build the info object
		$(info).addClass("user-info");
		$(info).append($("<h6>").text(data.title));
		var name = data.author.firstName + " " + data.author.lastName;
		$(info).append($("<span>").text(name)).attr('title', name);

		if (data.status == 0)
		{
			$(li).addClass("draft");
			var text = $(".draft-text").text();
			$(info).append($("<span>").addClass("draft").text(text).attr('title', text));
		}
		else if (data.status == 1)
		{
			var currentUnixTime = Math.round(new Date().getTime() / 1000);
			if (currentUnixTime < data.published)
			{
				$(li).addClass("scheduled");
				var dateTime = new Date( (data.published * 1000) ),
					dateTime = dateTime.format('F d, Y @ H:i'),
					text = $(".scheduled-text").text().replace('{{date}}', dateTime);

				$(info).append($("<span>").addClass("scheduled").text(text).attr('title', text));
			}
			else
			{
				// Date time
				var dateTime = new Date( (data.created * 1000) ),
					titleTime = dateTime.format('F d, Y @ H:i'),
					dateTime = dateTime.format('c');

				$(info).append($("<span>").addClass("timeago").attr('datetime', dateTime).attr('title', titleTime));

				// Comment Icons
				$(side).append($("<span>").addClass("comment-container comment-count").attr('data-attr-slug', "/"+data.slug).attr('data-attr-id', data.id));
				$(side).append($("<span>").addClass("likes-container").append(data.like_count));
			}
		}

		$(li).append($(info)).append($(side));
		
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
	 * Populates the content-form with the data provided from content.content[]
	 * @param object data
	 */
	populate : function(data) {

		var self = this;
		self.ajaxBeforeSend();

		var header = $("<header>"),
			title = $("<h1>"),
			status = $("<span>").addClass("label"),
			icons = $("<div>"),
			nano = $("<div>").addClass("nano"),
			nanocontent = $("<div>").addClass("nano-content");

		// Header content
		$(title).text(data.title);

		// Set the status
		if (data.status == 0)
			$(status).text($(".draft-text-li").text().singularize());
		else
		{
			var currentUnixTime = Math.round(new Date().getTime() / 1000);
			if (currentUnixTime < data.published)
				$(status).text($(".scheduled-text-li").text());
			else
				$(status).text($(".published-text-li").text());
		}

		// Create the default icon set
		$(icons).append($(status));
		$(icons).append($("<a>").append($("<span>").addClass("fa fa-eye")).attr("href", data.slug));
		if (data.status != 0)
			$(icons).append($("<a>").append($("<span>").addClass("fa fa-comments")).attr("id", "comment_action").attr("href", "#comments"));
		$(icons).append($("<a>").append($("<span>").addClass("fa fa-edit")).attr("href", $("#endpoint").attr("data-attr-endpoint")+"/dashboard/content/save/"+data.id));
		$(icons).append($("<a>").append($("<span>").addClass("fa fa-trash-o")));

		// Build the header
		$(header).append($(title)).append($(icons));

		// Build the main content
		$(nanocontent).append($("<div>").addClass("main-preview").html(self.marked(data.content)));
		$(nano).append($(nanocontent));

		// Add the content to the primary container and finish
		$("#content_container").empty().append($(header)).append($(nano));

		$("#content_container .nano").nanoScroller({ destroy: true });
		$("#content_container .nano").nanoScroller({ iOSNativeScrolling: true }); 

		$("#comment_container #comment div#comment").empty();
		$("#comment_container header").remove();
		$("#comment_container").prepend($(header).clone());

		$("#comment_container").hide();
		$("#content_container").show();

		// Only load comments if they aren't drafts
		if (data.status != 0)
			self.bindCommentClick(data);

		self.ajaxCompleted();
	},

	/**
	 * Toggle behavior for comment button
	 * @return void
	 */
	bindCommentClick : function(data) {
		$("a#comment_action").attr("data-attr-id", data.id);
		Comments.init(data.id, data.title, data.slug);
		Comments.isLoaded = false;

		$("a#comment_action").unbind('click')

		// If the comments aren't loaded by the click action, load them
		$("a#comment_action").click(function() {
			var isLoaded = Comments.isLoaded;
			if (!isLoaded)
			{
				Comments.reload($("a#comment_action").attr("data-attr-id"));
				Comments.isLoaded = true;
				setTimeout(function() {
					$("#comment_container .nano").nanoScroller({ destroy: true });
					$("#comment_container .nano").nanoScroller({ iOSNativeScrolling: true }); 
				}, 1000);
			}

			$("#comment_container").toggle();
			$("#content_container").toggle();
		});
	},

	/**
	 * Renders Markdownified content
	 * @param string data
	 * @return string
	 */
	marked : function(data) {
		marked.setOptions({
		    gfm: true,
		    highlight: function (lang, code) {
		        return hljs.highlightAuto(lang, code).value;
		    },
		    tables: true,
		    breaks: true,
		    pedantic: false,
		    sanitize: false,
		    smartLists: true,
		    smartypants: true,
		    langPrefix: "lang-"
		});

		return marked(data);
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

			self.populate(self.content[$(this).attr('content_id')]);

			$(this).addClass("active");

			self.deleteBehavior();
		});
	},

	deleteBehavior: function() {
		var self = this;
		$("#ContentDelete_Submit").click(function(e) {
			e.preventDefault();
			$.ajax({
				url: window.location.origin + '/api/content/' + $("#m-content-form #content_id").val(),
				type: 'DELETE',
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				beforeSend: function() {
					self.ajaxBeforeSend();
				},
				error: function(data) {
					var json = $.parseJSON(data.responseText),
						message = json.message,
						alert = $("<div>").addClass("alert alert-error");

					$("#content-form").prepend($(alert));
				},
				success: function(data, textStatus, jqXHR) {
					self.ajaxSuccess(data.success);

					var id = $("#m-content-form #content_id").val();
					self.content.remove(id);

					$(".paginated_results ul li[content_id=" + id + "]").remove();

					// Reutilize the click to transition the view
					$("#NewContentButton").click();
				},
				completed: self.ajaxCompleted()
			});

			return false;
		});
	},

	/**
	 * Binds the filter behavior to the page
	 */
	bindFilter : function() {
		var self = this;

		$(".filter-container ul.filter li").click(function() {
			if ($(this).hasClass("active"))
			{
				$(this).removeClass("active");
				self.filter = null;
				self.list(true, self.query, 1);
			}
			else
			{
				$(".filter-container ul.filter li").removeClass("active");
				$(this).addClass("active");
				self.filter = $(this).attr('data-attr-param');
				self.list(true, self.query, 1);
			}
		});
	},

	/**
	 * Binds the sorting behavior to the page
	 */
	bindSorting : function() {
		var self = this;

		$(".order-container ul.order li").click(function() {

			var name = $(this).attr('name');

			// Create a deep copy of the content array
			if (self.contentCopy == null)
				self.contentCopy = self.content.reverse();

			// Retrieve the order
			var order = $(this).hasClass('asc') ? 'asc' : ($(this).hasClass('dsc') ? 'dsc' : false);

			$(".order-container ul.order li").removeClass("active").removeClass("asc").removeClass("dsc");
			$(this).addClass("active");

			if (order == false)
			{
				// Transition from an undefined state to an ASC sort by this attribute
				$(this).addClass("asc").removeClass("dsc");
				self.content = self.sortByKey(self.content, name, 1);
			}
			else if (order == 'asc')
			{
				$(this).removeClass("asc").addClass("dsc");
				self.content = self.sortByKey(self.content, name, -1);
			}
			else if (order == 'dsc')
			{
				$(this).removeClass("dsc").removeClass("asc").removeClass("active");

				// Clear the content out
				self.content = [];

				// And remove the leading key that is used for identification so it can be redisplayed without issue
				$.each(self.contentCopy, function(k, v) {
					if (v != undefined)
						self.content.push(v);
				});
			}

			// Clear the displayed results
			self.ajaxBeforeSend();
			$(".paginated_results ul").empty();

			var copy = self.content;
			self.content = [];

			self.render(copy);

			self.ajaxSuccess(null);
		});
	},

	/**
	 * Sorts the content array by a given key
	 * http://stackoverflow.com/a/8175221
	 * @param array array
	 * @param string key
	 * @return array
	 */
	sortByKey : function(array, key, order) {
		var copy = [];

		$.each(array, function(k, v) {
			if (v != undefined)
				copy.push(v);
		});

	    return copy.sort(function(a, b) {
	        var x = a[key]; var y = b[key];
	        return ((x < y) ? (order * -1) : ((x > y) ? order : 0));
	    });
	},

	/**
	 * Performs an AJAX GET query to load the available content
	 * @param boolean clear
	 * @param string query
	 * @param int page
	 */
	list : function(clear, query, page) {
		var self = this;
		// Null the copy
		self.contentCopy = null;

		$.ajax({
			url: window.location.origin + '/api/content/index?page=' + page + 
				(self.query == null ? '' : '&Content[content]='+self.query) + 
				(self.filter == null ? '' : '&' + self.filter),
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

				self.ajaxBeforeSend();
			},
			error: function(data) {
				var json = $.parseJSON(data.responseText);

				// unbind the scrolling event to prevent unecessary requests to the API
				if (json.status == 404)
					$(".paginated_results .nano .nano-content").unbind("scroll");
			},
			success: function(data, textStatus, jqXHR) {
				self.render(data.response);
				self.ajaxSuccess(null);
			}
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