(function() {

    var outputStateView = Backbone.View.extend({
        template: _.template($('#output-state-template').html()),
        attributes: {
            class: "tile"
        },

        initialize: function() {
            this.model.on('change', this.render, this);
        },

        render: function() {
            var data = this.model.toJSON();

            if (!this.model.valid()) {
                this.$el.addClass("invalid");
            }

            // add a few things
            data.input_value_formatted = data.input_value ? data.input_value.toFixed(2) : NaN;

            this.$el.html(this.template({
                data: data
            }));

            return this;
        }
    });

    Beerery.OutputStateView = outputStateView;

})();