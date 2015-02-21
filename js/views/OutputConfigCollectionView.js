(function() {

    var outputConfigCollectionView = Beerery.ConfigCollectionViewBase.extend({
        viewWithModel: function(model) {
            return new Beerery.OutputConfigRowView({
                model: model
            });
        }
    });

    Beerery.OutputConfigCollectionView = outputConfigCollectionView;

})();