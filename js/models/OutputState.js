(function() {

	var outputState = Backbone.Model.extend({
		// ex: {"type":"DS18B20","active":true,"address":"28-000004f65c4d","name":"MLT"}
		defaults: {
			name: "",
			type: "",
			active: false,
			valid: true,
			value: 0.0
		},
		idAttribute: "name",
		urlRoot: Beerery.config.rootUrl + 'outputs/',

		constructor: function() {
			this.interval = null;

			Backbone.Model.apply(this, arguments);
		},

		initialize: function() {
			var self = this;
			this.interval = setInterval(function() {
				if (self.valid()) {
					self.fetch();
				}
			}, 1000);
		},

		valid: function() {
			return this.get("valid");
		}
	});

	var outputStateCollection = Backbone.Collection.extend({
		model: outputState
	});

	Beerery.OutputState = outputState;
	Beerery.OutputStateCollection = outputStateCollection;

})();