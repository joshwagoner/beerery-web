(function() {

    var outputConfig = Backbone.Model.extend({
        defaults: {
        },
        urlRoot: Beerery.config.rootUrl + 'config/outputs'
    });

    var outputConfigCollection = Backbone.Collection.extend({
        model: outputConfig,
        url: Beerery.config.rootUrl + 'config/outputs'
    });

    Beerery.OutputConfig = outputConfig;
    Beerery.OutputConfigCollection = outputConfigCollection;

})();