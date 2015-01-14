Beerery = {};

Beerery.config = {
    rootUrl: "http://10.0.0.27:3000/"
};

Beerery.initialize = function(){
	console.log("initializing beerery");

	var inputConfigs = new Beerery.InputConfigCollection();
	inputConfigs.fetch({
        success: function(col, res){
        	var inputColView = new Beerery.InputConfigCollectionView({
                collection:col,
                el: $('#input-list')[0]
            });
            inputColView.render();
        },
        error: function(col, res){
        	$("#input-list").html("<div>Error retrieving inputs: " + res.statusText + "</div>");
        }
    });

    var outputConfigs = new Beerery.OutputConfigCollection();
	outputConfigs.fetch({
        success: function(col, res){
        	
        },
        error: function(col, res){
        	$("#output-list").html("<div>Error retrieving outputs: " + res.statusText + "</div>");
        }
    });

    var AppRouter = Backbone.Router.extend({
        routes: {
            "config": "goToConfig",
            "*actions": "defaultRoute" // Backbone will try match the route above first
        }
    });
    // Instantiate the router
    var app_router = new AppRouter();
    app_router.on('route:goToConfig', function () {
        
    });
    app_router.on('route:defaultRoute', function (actions) {
        console.log( actions ); 
    });

    Backbone.history.start();
};