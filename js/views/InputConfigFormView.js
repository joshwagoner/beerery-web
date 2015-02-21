(function() {

    var inputConfigFormView = Backbone.View.extend({
        template: _.template($('#input-edit-template').html()),

        initialize: function() {

        },

        render: function() {
            var data = this.model.toJSON();
            data[this.model.get("type")] = true;

            this.$el.html(this.template({
                data: data
            }));

            if (this.model.get("type") == "DS18B20") {
                this.$(".input-config-edit").addClass("onewire");
            }

            return this;
        },

        update: function() {
            this.model.set("name", this.$("input[name=name]").val());
            this.model.set("active", this.$("input[name=active]").is(':checked'));

            var type = this.$("input[name=type]:checked").val();

            // set type specific properties
            if (type === "DS18B20") {
                this.model.set("address", this.$("input[name=address]").val());
            }

            this.model.set("type", type);

            return true;
        },
    });

    Beerery.InputConfigFormView = inputConfigFormView;

})();