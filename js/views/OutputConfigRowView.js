(function() {

    var outputConfigRowView = Beerery.ConfigViewBase.extend({
        template: _.template($('#output-config-tile-template').html()),

        formViewWithModel: function(model) {
            return new Beerery.OutputConfigFormView({
                model: model
            });
        }
    });

    Beerery.OutputConfigRowView = outputConfigRowView;

})();