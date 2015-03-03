(function() {

	var inputState = Backbone.Model.extend({
		// ex: {"type":"DS18B20","active":true,"address":"28-000004f65c4d","name":"MLT"}
		defaults: {
			name: "",
			type: "",
			active: false,
			valid: true,
			value: 0.0
		},
		idAttribute: "name",
		urlRoot: Beerery.config.rootUrl + 'inputs/',

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

	var inputStateCollection = Backbone.Collection.extend({
		model: inputState
	});

	Beerery.InputState = inputState;
	Beerery.InputStateCollection = inputStateCollection;

})();