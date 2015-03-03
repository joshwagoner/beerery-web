(function() {

  var outputConfigFormView = Backbone.View.extend({
    template: _.template($('#output-edit-template').html()),

    initialize: function() {

    },

    render: function() {
      var data = this.model.toJSON();

      data[this.model.get("type")] = true;
      data.typeJSON = JSON.stringify(data.type, null, 2);

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

      var typeJSON = this.$("textarea#type").val();
      var type = JSON.parse(typeJSON);

      this.model.set("type", type);

      return true;
    },
  });

  Beerery.OutputConfigFormView = outputConfigFormView;

})();