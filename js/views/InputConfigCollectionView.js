(function() {

    var inputConfigCollectionView = Backbone.View.extend({
        initialize: function() {
            var self = this;
            this.configViews = [];

            this.collection.each(function(inputConfig) {
                self.configViews.push(new Beerery.InputConfigRowView({
                    model: inputConfig
                }));
            });

            this.collection.on("add", _.bind(this.addInputView, this));
            this.collection.on("remove", _.bind(this.removeInputView, this));
        },

        addInputView: function(inputModel) {
            var view = new Beerery.InputConfigRowView({
                model: inputModel
            });

            this.configViews.push(view);
            this.$el.append(view.render().el);
        },

        removeInputView: function(inputModel) {
            var view = _.find(this.configViews, function(v){
                return v.model == inputModel;
            });

            if (view) {
                view.$el.remove();
            }
        },

        render: function() {
            var self = this;

            $(this.el).empty();

            _(this.configViews).each(function(cv) {
                $(self.el).append(cv.render().el);
            });
        }
    });

    Beerery.InputConfigCollectionView = inputConfigCollectionView;

})();