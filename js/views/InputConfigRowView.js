(function() {

  var inputConfigRowView = Backbone.View.extend({
    template: _.template($('#input-config-row-template').html()),

    initialize : function() {
      
    },
   
    render : function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  Beerery.InputConfigRowView = inputConfigRowView;

})();