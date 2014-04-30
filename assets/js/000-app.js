// Load the CiiMS JSON
ciims = $.parseJSON(localStorage.getItem('ciims'));

// Register the Ember.js application
window.App = Ember.Application.create({
    LOG_TRANSITIONS: ciims.debug,
    LOG_TRANSITIONS_INTERNAL: ciims.debug,
	LOG_VIEW_LOOKUPS: ciims.debug,
	LOG_ACTIVE_GENERATION: ciims.debug,
	LOG_BINDING: ciims.debug
});

// Specify how we want to handle routes
App.Router.reopen({
    rootURL: '/dashboard/',
    location: 'history'
}).map(function() {
    this.route("about", { path: "default/about" });
});

// Specify how we want to handle routes
App.ApplicationAdapter = DS.RESTAdapter.extend({
  pathForType: function(type) {
    return type;
  },
  ajax: function(url, type, hash) {
    var adapter = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      hash = adapter.ajaxOptions(url, type, hash);

      hash.success = function(json) {
        Ember.run(null, resolve, json.response);
      };

      hash.error = function(jqXHR, textStatus, errorThrown) {
        Ember.run(null, reject, adapter.ajaxError(jqXHR));
      };

      Ember.$.ajax(hash);
    }, "DS: RestAdapter#ajax " + type + " to " + url);
  },
  host: window.location.origin,
  namespace: "api",
  headers: {
    "X-Auth-Token": ciims.token,
    "X-Auth-Email": ciims.email
  }
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(type, payload) {
    var typeKey = type.typeKey,
        response = {};
    response[typeKey] = payload;
    return response;
  }
});

// Specify pace.js options
paceOptions = {
  ajax: true,
  document: true,
  eventLag: false
};
