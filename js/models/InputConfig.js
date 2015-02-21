(function() {

    var inputConfig = Backbone.Model.extend({
        // ex: {"type":"DS18B20","active":true,"address":"28-000004f65c4d","name":"MLT"}
        defaults: {
            name: "",
            type: "",
            active: false,
        },
        urlRoot: Beerery.config.rootUrl + 'config/inputs/'
    });

    var inputConfigCollection = Backbone.Collection.extend({
        model: inputConfig,
        url: Beerery.config.rootUrl + 'config/inputs'
    });

    Beerery.InputConfig = inputConfig;
    Beerery.InputConfigCollection = inputConfigCollection;

})();