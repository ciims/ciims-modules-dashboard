var ContentEditor = {

	ciims : null,

	editor : null,

	excerptEditor : null,

	reloadTimeout : null,

	init : function() {
		var self = this;
		
		self.ciims = CiiMSDashboard.getAuthData();

		self.editor = new Editor({
			element: document.querySelector('#Content_content'),
			toolbar: [
			  { name: 'bold',      className: 'fa fa-bold',      action: ContentEditor.Editor.toggleBold },
			  { name: 'italic',    className: 'fa fa-italic',    action: ContentEditor.Editor.toggleItalic },
			  { name: 'underline', className: 'fa fa-underline', action: ContentEditor.Editor.insertUnderlineTag },
			  '|',
			  { name: 'quote',          className: 'fa fa-quote-left', action: ContentEditor.Editor.toggleBlockquote },
			  { name: 'unordered-list', className: 'fa fa-list',       action: ContentEditor.Editor.toggleUnOrderedList },
			  { name: 'ordered-list',   className: 'fa fa-list-ol',    action: ContentEditor.Editor.toggleOrderedList },
			  '|',
			  { name: 'photo', className: 'fa fa-photo',        action: ContentEditor.Editor.insertPhotoTag },
			  //{ name: 'video', className: 'fa fa-video-camera', action: ContentEditor.Editor.insertVideoTag },
			  { name: 'code',  className: 'fa fa-code',         action: ContentEditor.Editor.insertCodeTag },
			  '|',
			  { name: 'excerpt', className: 'fa fa-caret-square-o-down', action: ContentEditor.Editor.excerpt },
			  '|',
			  { name: 'marked', className: 'markdown-mark', 		action: ContentEditor.Editor.explainMarked }
			]
		});

		// Bind the change
		self.onChangeEvent();

		// Refresh the instance so we can see the counts in the bottom
		self.editor.codemirror.refresh()

		// Nanoscrollerize the preview window
		self.nanoscroller(".preview.nano", false);

		// lepture/editor doesn't support onLoad callback
		setTimeout(function() {
			// Nanoscrollerize the editor window
			$(".CodeMirror.cm-s-paper").addClass("nano");
			$(".CodeMirror.cm-s-paper .CodeMirror-scroll").addClass("nano-content");
			// Trigger the load immediately
			self.triggerChange();
		}, 250);

		$("#tags").tagsInput({
			onRemoveTag: function(e) {
				var tag = e.replace('/', '');
				$.ajax({
					url: window.location.origin + '/api/content/tag/id/' + $("#Content_id").val() + "/tag/" + tag,
					type: 'DELETE',
					headers: {
						'X-Auth-Email': self.ciims.email,
						'X-Auth-Token': self.ciims.token
					},
					beforeSend: CiiMSDashboard.ajaxBeforeSend(),
					completed: CiiMSDashboard.ajaxCompleted()
				});
			},
			onAddTag: function(e) {
				var tag = e.replace('/', '');
				$.ajax({
					url: window.location.origin + '/api/content/tag/id/' + $("#Content_id").val(),
					type: 'POST',
					headers: {
						'X-Auth-Email': self.ciims.email,
						'X-Auth-Token': self.ciims.token
					},
					data:  { 
						"tag" : e
					},
					beforeSend: CiiMSDashboard.ajaxBeforeSend(),
					completed: CiiMSDashboard.ajaxCompleted()
				});
			}
		});

		$("#Content_title").keyup(function(e) {
			var slug = $("#Content_slug").val();
			var customTitle = $("#Content_title").val().replace(/\W/g, "-").toLowerCase().replace("--", "-");
			$("#Content_slug").val(customTitle);
		});

		$('#Content_published').datetimepicker({
			format: 'unixtime',
		  	inline: true,
		  	language: CiiMSDashboard.getLanguage()
		});

		$("a#schedule").click(function(e) {
			if ($(".content-calendar").is(":visible"))
				$(".content-calendar").slideUp();
			else
				$(".content-calendar").slideDown();
		});
	},

	/**
	 * Change event for converting the editor body to a preview
	 */
	onChangeEvent : function() {
		var self = this;
		$(".CodeMirror.cm-s-paper").on('focus blur keyup paste copy cut input', function() { 
			self.triggerChange();
		});
	},

	/**
	 * Event for manually triggering a change in the editor
	 */
	triggerChange : function() {
		var self = this,
			text = self.editor.codemirror.getValue(),
			markdown = self.marked(text);

		clearTimeout(self.reloadTimeout);
		self.reloadTimeout = setTimeout(function() {
			$("section.content_inner_container .preview #content_preview").html(markdown);
			self.bindDropzoneElements();
			self.nanoscroller(".preview.nano", false);
			self.nanoscroller(".CodeMirror.cm-s-paper.nano", false);
		}, 100);
	},

	/**
	 * Nanoscroller bind event
	 * @param  jQuery  element   The jQuery Element
	 * @param  boolean force     Force the rebinding of the scrollend behavior
	 */
	nanoscroller : function(element, force) {
		var self = this;
		
		$(element).nanoScroller({ destroy: true });
		$(element).nanoScroller(); 

		// Rebind the scrollend behavior
		if (force)
		{
			$(element + " .nano-content").unbind("scroll");
			$(element + " .nano-content").bind("scroll", function(e) {
				if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight - 1)
			    	self.list(false, self.query, ++self.page);
			});
		}

		setTimeout(function() {
			$(element).nanoScroller(); 
		}, 150)
	},

	bindDropzoneElements : function() {
		var self = this;

		$("#content_preview div.dropzone").each(function() {

			// If the dropzone element is already bound, ignore it
			if ($(this).hasClass("dz-clickable"))
		 		return;

		 	// Generate a unique ID hash for each element
		 	var hash = Math.random().toString(36).substring(7);

		 	// Make sure there are no duplicates
			while ($("#content_preview div.dropzone-"+ hash).length > 0)
				hash = Math.random().toString(36).substring(15);

			// Then bind it to this element
			$(this).addClass("dropzone-" + hash);

			// Then bind the dropzone element
			var dz = new Dropzone("#content_preview div.dropzone-" + hash, {
				url : CiiMSDashboard.getEndpoint() + "/api/content/uploadImage/id/" + $("#Content_id").val(),
				headers: {
					'X-Auth-Email': self.ciims.email,
					'X-Auth-Token': self.ciims.token
				},
				dictDefaultMessage : "Drop files here to upload - or click",
				success : function(data) {
					// Get the response data
					var json     = $.parseJSON(data.xhr.response),
						response = $.parseJSON(json.response),
						markdown = self.editor.codemirror.getValue(),
						i        = 0,
						index    = null;

					// Iterate through all the dropzone elements until we find the one with this hash
					$("#content_preview div.dropzone").each(function() {
						if ($(this).hasClass("dropzone-" + hash))
							return false;
						i++;
					});

					// Now figure out what item in the editor we should replace
					index = self.getSubstringIndex(markdown, "{image}", i + 1);
					if (index == '-1')
						index = 0;

					// Remove the uploader
					$("#content_preview div.dropzone-" + hash).remove();

					markdown = self.splice(markdown, index, 7, "\n![" + response.filename + "](" + response.filepath +")");
					self.editor.codemirror.setValue(markdown);

					self.triggerChange();
				}
			});
		});
	},

	// Utility method for getting a substring index. This finds the unique instance of {image}
	getSubstringIndex : function(str, substring, n) {
	    var times = 0, index = null;

	    while (times < n && index !== -1) {
	        index = str.indexOf(substring, index+1);
	        times++;
	    }

	    return index;
	},

	splice : function(str, idx, rem, s) {
	    return (str.slice(0,idx) + s + str.slice(idx + Math.abs(rem)));
	},


	/**
	 * Generates markdown generated content
	 * @param  string data 	The input string
	 * @return string 		Markdown data
	 */
	marked : function(data) {
		return Content.marked(data).replace(/{image}/g, "<div class=\"dropzone\"></div>");
	},

	/**
	 * Excerpt related functionality
	 */
	Excerpt : {

		/**
		 * Binds the image upload and video upload behaviors to the DOM
		 */
		bindBehaviors: function() {
			var self = this;
			self.bindImageUploadBehavior();
		},

		bindImageUploadBehavior : function() {

		},

		/**
		 * Displays the element for uploading excerpt images
		 * @param el editor
		 */
		insertPhoto : function(editor) {
			$(".image-upload").show();
		},

		/**
		 * Hides the excerpt editor and shows the preview editor
		 * @param el editor
		 */
		excerpt : function(editor) {
			$(".excerpt").hide();
			$(".video-upload").hide();
			$(".image-upload").hide();
			$(".editor").show();
		},
	},

	/**
	 * Overrides for lepture/editor to inject our own custom elements
	 */
	Editor : {

		/**
		 * Hides the editor and shows the excerpt editor
		 * @param el editor
		 */
		excerpt : function(editor) {
			// Instantiate the excerpt editor if it hasn't bee done yet
			if (ContentEditor.excerptEditor == null)
			{
				ContentEditor.excerptEditor = new Editor({
					element: document.querySelector('#Content_excerpt'),
					toolbar: [
					  { name: 'photo', className: 'fa fa-photo',        action: ContentEditor.Excerpt.insertPhoto },
			  		  //{ name: 'video', className: 'fa fa-video-camera', action: ContentEditor.Excerpt.insertVideo },
			  		  '|',
					  { name: 'excerpt', className: 'fa fa-caret-square-o-up', action: ContentEditor.Excerpt.excerpt },
					  '|',
					  { name: 'marked', className: 'markdown-mark', 		action: ContentEditor.Editor.explainMarked }
					]
				});

				// Bind the necessary behaviors to the DOM now
				ContentEditor.Excerpt.bindBehaviors();
			}

			$(".editor").hide();
			$(".excerpt").show();
		},

		explainMarked : function(editor) {
			console.log("Explain marked");
		},

		/**
		 * Override event for lepture/editor toggleBold Event
		 * @param el editor
		 */
		toggleBold : function(editor) {
			Editor.toggleBold(editor);
			ContentEditor.triggerChange();
		},

		/**
		 * Override event for lepture/editor toggleItalic Event
		 * @param el editor
		 */
		toggleItalic : function(editor) {
			Editor.toggleItalic(editor);
			ContentEditor.triggerChange();
		},

		/**
		 * Override event for lepture/editor toggleUnorderedList Event
		 * @param el editor
		 */
		toggleUnOrderedList : function(editor) {
			Editor.toggleUnOrderedList(editor);
			ContentEditor.triggerChange();
		},

		/**
		 * Override event for lepture/editor toggleOrderedList Event
		 * @param el editor
		 */
		toggleOrderedList : function(editor) {
			Editor.toggleOrderedList(editor);
			ContentEditor.triggerChange();
		},

		/**
		 * Override event for lepture/editor toggleBlockquote Event
		 * @param el editor
		 */
		toggleBlockquote: function(editor) {
			Editor.toggleBlockquote(editor);
			ContentEditor.triggerChange();
		},

		/**
		 * Inserts a CiiMS photo tag {image}
		 * @param el editor
		 */
		insertPhotoTag : function(editor) {
			var cm = editor.codemirror;
    		var stat = ContentEditor.Editor.getState(cm);
            ContentEditor.Editor._replaceSelection(cm, false, '{image}\n', '');
            ContentEditor.triggerChange();
		},

		/**
		 * Inserts a CiiMS video tag {video}
		 * @param el editor
		 */
		insertVideoTag : function(editor) {
			var cm = editor.codemirror;
    		var stat = ContentEditor.Editor.getState(cm);
            ContentEditor.Editor._replaceSelection(cm, false, '{video}\n', '');
            ContentEditor.triggerChange();
		},

		/**
		 * Inserts a CiiMS code block
		 * @param el editor
		 */
		insertCodeTag : function(editor) {
			var cm = editor.codemirror;
    		var stat = ContentEditor.Editor.getState(cm);
            ContentEditor.Editor._replaceSelection(cm, false, '```\n', '\n```');
            ContentEditor.triggerChange();
		},

		/**
		 * Inserts a CiiMS underline block
		 * @param el editor
		 */
		insertUnderlineTag : function(editor) {
			var cm = editor.codemirror;
    		var stat = ContentEditor.Editor.getState(cm);
            var text;
		    var start = '<u>';
		    var end = '</u>';

		    var startPoint = cm.getCursor('start');
		    var endPoint = cm.getCursor('end');
		    if (stat.italic) {
		      text = cm.getLine(startPoint.line);
		      start = text.slice(0, startPoint.ch);
		      end = text.slice(startPoint.ch);

		      start = start.replace(/^(.*)?(\*|\_)(\S+.*)?$/, '$1$3');
		      end = end.replace(/^(.*\S+)?(\*|\_)(\s+.*)?$/, '$1$3');
		      startPoint.ch -= 1;
		      endPoint.ch -= 1;
		      cm.setLine(startPoint.line, start + end);
		    } else {
		      text = cm.getSelection();
 			  cm.replaceSelection(start + text + end);

		      startPoint.ch += 1;
		      endPoint.ch += 1;
		    }

		    cm.setSelection(startPoint, endPoint);
		    cm.focus();
		    ContentEditor.triggerChange();
		},

		//https://github.com/lepture/editor/blob/master/src/intro.js#L291
		_replaceSelection : function(cm, active, start, end) {
			var text;
			var startPoint = cm.getCursor('start');
			var endPoint = cm.getCursor('end');
			if (active)
			{
				text = cm.getLine(startPoint.line);
				start = text.slice(0, startPoint.ch);
				end = text.slice(startPoint.ch);
				cm.setLine(startPoint.line, start + end);
			}
			else
			{
				text = cm.getSelection();
				cm.replaceSelection(start + text + end);

				startPoint.ch += start.length;
				endPoint.ch += start.length;
			}

			cm.setSelection(startPoint, endPoint);
			cm.focus();
		},

		// https://github.com/lepture/editor/blob/master/src/intro.js#L60
		getState : function(cm, pos) {
			pos = pos || cm.getCursor('start');
			var stat = cm.getTokenAt(pos);
			if (!stat.type) return {};

			var types = stat.type.split(' ');

			var ret = {}, data, text;
			for (var i = 0; i < types.length; i++)
			{
				data = types[i];
				if (data === 'strong')
				  ret.bold = true;
				else if (data === 'variable-2')
				{
				  text = cm.getLine(pos.line);
				  if (/^\s*\d+\.\s/.test(text))
				    ret['ordered-list'] = true;
				  else 
				    ret['unordered-list'] = true;
				} 
				else if (data === 'atom')
				  ret.quote = true;
				else if (data === 'em')
				  ret.italic = true;
				
			}
			return ret;
		}
	}
};