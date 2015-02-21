(function() {

    var outputConfigCollectionView = Backbone.View.extend({
        initialize: function() {
            var self = this;
            this._configViews = [];

            this.collection.each(function(outputConfig) {
                self._configViews.push(new Beerery.OutputConfigRowView({
                    model: outputConfig
                }));
            });
        },

        render: function() {
            var self = this;

            $(this.el).empty();

            _(this._configViews).each(function(cv) {
                $(self.el).append(cv.render().el);
            });
        }
    });

    Beerery.OutputConfigCollectionView = outputConfigCollectionView;

})();