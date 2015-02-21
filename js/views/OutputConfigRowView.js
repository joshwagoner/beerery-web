(function() {

  var outputConfigRowView = Backbone.View.extend({
    template: _.template($('#output-config-tile-template').html()),

    initialize : function() {
      
    },
   
    render : function() {
      this.$el.html(this.template({data: this.model.toJSON()}));
      return this;
    }
  });

  Beerery.OutputConfigRowView = outputConfigRowView;

})();