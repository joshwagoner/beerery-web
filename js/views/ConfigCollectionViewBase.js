(function() {

    var configCollectionViewBase = Backbone.View.extend({
        viewWithModel: function(model) {
            return {};
        },

        initialize: function() {
            var self = this;
            this.configViews = [];

            this.collection.each(function(configModel) {
                var view = self.viewWithModel(configModel);
                self.configViews.push(view);
            });

            this.collection.on("add", _.bind(this.addView, this));
            this.collection.on("remove", _.bind(this.removeView, this));
        },

        addView: function(configModel) {
            var view = this.viewWithModel(configModel);

            this.configViews.push(view);
            this.$el.append(view.render().el);
        },

        removeView: function(configModel) {
            var view = _.find(this.configViews, function(v){
                return v.model == configModel;
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

    Beerery.ConfigCollectionViewBase = configCollectionViewBase;

})();