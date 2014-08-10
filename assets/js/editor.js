var ContentEditor = {

	ciims : null,

	init : function() {
		this.ciims = CiiMSDashboard.getAuthData();

		// Render the editor
		var editor = new Editor({
			element: document.querySelector('#Content_content'),
			toolbar: [
			  {name: 'bold', action: Editor.toggleBold},
			  {name: 'italic', action: Editor.toggleItalic},
			  '|',

			  {name: 'quote', action: Editor.toggleBlockquote},
			  {name: 'unordered-list', action: Editor.toggleUnOrderedList},
			  {name: 'ordered-list', action: Editor.toggleOrderedList},
			  
			]
		});
	},

	marked : function(data) {
		return Content.marked(data);
	}
};