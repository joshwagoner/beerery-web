(function() {

    var outputConfigRowView = Beerery.ConfigViewBase.extend({
        template: _.template($('#output-config-tile-template').html()),
        attributes: {
            class: "tile"
        },

        dataJSON: function() {
            var data = this.model.toJSON();

            data.typeJSON = JSON.stringify(data.type, null, 2);

            return data;
        },

        formViewWithModel: function(model) {
            return new Beerery.OutputConfigFormView({
                model: model
            });
        }
    });

    Beerery.OutputConfigRowView = outputConfigRowView;

})();