(function() {

    var inputConfig = Backbone.Model.extend({
        defaults: {
            testProperty: "testing"
        },
        urlRoot: Beerery.config.rootUrl + 'config/inputs'
    });

    var inputConfigCollection = Backbone.Collection.extend({
        model: inputConfig,
        url: Beerery.config.rootUrl + 'config/inputs'
    });

    Beerery.InputConfig = inputConfig;
    Beerery.InputConfigCollection = inputConfigCollection;

})();