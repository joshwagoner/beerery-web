(function() {

    var inputConfigCollectionView = Beerery.ConfigCollectionViewBase.extend({
        viewWithModel: function(model) {
            return new Beerery.InputConfigRowView({
                model: model
            });
        }
    });

    Beerery.InputConfigCollectionView = inputConfigCollectionView;

})();