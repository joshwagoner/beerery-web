(function() {

    var inputStateView = Backbone.View.extend({
        template: _.template($('#input-state-template').html()),
        attributes: {
            class: "tile"
        },

        initialize: function() {
            this.model.on('change', this.render, this);
        },

        render: function() {
            var data = this.model.toJSON();

            data.value_formatted = data.value ? data.value.toFixed(2) : NaN;

            if (!this.model.valid()) {
                this.$el.addClass("invalid");
            }

            this.$el.html(this.template({
                data: data
            }));

            return this;
        }
    });

    Beerery.InputStateView = inputStateView;

})();