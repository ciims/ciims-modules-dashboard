var ContentEditor = {

	ciims : null,

	editor : null,

	init : function() {
		this.ciims = CiiMSDashboard.getAuthData();

		// Render the editor
		this.editor = new Editor({
			element: document.querySelector('#Content_content'),
			toolbar: [
			  {name: 'bold', action: Editor.toggleBold},
			  {name: 'italic', action: Editor.toggleItalic},
			  '|',
			  {name: 'quote', action: Editor.toggleBlockquote},
			  {name: 'unordered-list', action: Editor.toggleUnOrderedList},
			  {name: 'ordered-list', action: Editor.toggleOrderedList},
			  '|',
			  {name: 'photo', className: 'fa fa-photo', action: ContentEditor.Editor.insertPhotoTag},
			  {name: 'video', className: 'fa fa-video-camera', action: ContentEditor.Editor.insertVideoTag}
			]
		});

		this.onChangeEvent();
	},


	onChangeEvent : function() {
		var self = this;
		$(".CodeMirror.cm-s-paper").on('focus, keyup paste copy input', function() { 
			var text = self.editor.codemirror.getValue(),
				markdown = self.marked(text);

			$("section.content_inner_container .preview").html(markdown);
		});
	},

	/**
	 * Generates markdown generated content
	 * @param  string data 	The input string
	 * @return string 		Markdown data
	 */
	marked : function(data) {
		return Content.marked(data);
	},

	/**
	 * Overrides for lepture/editor to inject our own custom elements
	 */
	Editor : {

		/**
		 * Inserts a CiiMS photo tag {image}
		 * @param el editor
		 */
		insertPhotoTag : function(editor) {
			var cm = editor.codemirror;
    		var stat = ContentEditor.Editor.getState(cm);
            ContentEditor.Editor._replaceSelection(cm, false, '{', 'image}');
		},

		/**
		 * Inserts a CiiMS video tag {video}
		 * @param el editor
		 */
		insertVideoTag : function(editor) {
			var cm = editor.codemirror;
    		var stat = ContentEditor.Editor.getState(cm);
            ContentEditor.Editor._replaceSelection(cm, false, '{', 'video}');
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