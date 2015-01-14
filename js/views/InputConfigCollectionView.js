(function() {

  var inputConfigCollectionView = Backbone.View.extend({
    initialize : function() {
      var self = this;
      this._configViews = [];
   
      this.collection.each(function(inputConfig) {
        self._configViews.push(new Beerery.InputConfigRowView({
          model : inputConfig
        }));
      });
    },
   
    render : function() {
      var self = this;
      
      $(this.el).empty();
   
      _(this._configViews).each(function(cv) {
        $(self.el).append(cv.render().el);
      });
    }
  });

  Beerery.InputConfigCollectionView = inputConfigCollectionView;

})();