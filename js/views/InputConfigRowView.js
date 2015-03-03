(function() {

    var inputConfigRowView = Beerery.ConfigViewBase.extend({
        template: _.template($('#input-config-tile-template').html()),
        attributes: {
            class: "tile"
        },

        formViewWithModel: function(model) {
            return new Beerery.InputConfigFormView({
                model: model
            });
        }
    });

    Beerery.InputConfigRowView = inputConfigRowView;

})();