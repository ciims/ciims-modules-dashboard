App.Content = DS.Model.extend({
	author_id: DS.attr(),
	category_id: DS.attr(),
	commentable: DS.attr(),
	content: DS.attr(),
	created: DS.attr(),
	extract: DS.attr(),
	parent_id: DS.attr(),
	published: DS.attr(),
	slug: DS.attr(),
	status: DS.attr(),
	title: DS.attr(),
	type_id: DS.attr(),
	updated: DS.attr(),
	vid: DS.attr()
});

App.IndexRoute = Ember.Route.extend({
	model : function(params) {
		return this.store.find('content', 1);
	}
});

App.AboutRoute = Ember.Route.extend({
	model : function(params) {
		return this.store.find('content');
	},
	beforeModel: function() {
		var self = this;
	    setTimeout(function() { self.transitionTo('index'); }, 2000);
	  }
});
