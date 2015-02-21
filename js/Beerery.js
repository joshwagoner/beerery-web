Beerery = {};

Beerery.config = {
    rootUrl: "http://10.0.0.27:3000/"
};

Beerery.App = Backbone.View.extend({
    initialize : function() {
        console.log("initializing beerery");

        this.inputConfigs = new Beerery.InputConfigCollection();
        this.inputConfigs.fetch({
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

        this.outputConfigs = new Beerery.OutputConfigCollection();
        this.outputConfigs.fetch({
            success: function(col, res){
                var outputColView = new Beerery.OutputConfigCollectionView({
                    collection:col,
                    el: $('#output-list')[0]
                });
                outputColView.render();
            },
            error: function(col, res){
                $("#output-list").html("<div>Error retrieving outputs: " + res.statusText + "</div>");
            }
        });

        // connect page level controls
        $("#add-input-button").on({
            click: $.proxy(this.addInput, this)
        });

        var AppRouter = Backbone.Router.extend({
            routes: {
                "config": "goToConfig",
                "input/edit/:name": "goToEdit",
                "*actions": "defaultRoute" // Backbone will try match the route above first
            }
        });
        // Instantiate the router
        var app_router = new AppRouter();
        app_router.on('route:goToConfig', function () {
            
        });
        app_router.on('route:goToEdit', function (name) {
            console.log( "edit: " + name ); 

            var hostModal = new Beerery.HostModal({
                model: ""
            });
            $('.app').append(hostModal.render().el);
        });
        app_router.on('route:defaultRoute', function (actions) {
            console.log( actions ); 
        });

        Backbone.history.start();
    },

    addInput: function(){
        var hostModal = new Beerery.HostModal();
        hostModal.title = "New Input";

        var newInputModel = new Beerery.InputConfig();

        var editForm = new Beerery.InputConfigFormView({
            model: newInputModel
        });

        var renderedModal = hostModal.render();
        renderedModal.$(".bbm-modal__section").append(editForm.render().el);

        var self = this;
        this.listenTo(renderedModal, "submit", function(){
            editForm.update();

            newInputModel.save({}, {
                success: function(){
                    // add the model to the collection
                    self.inputConfigs.add(newInputModel);
                }
            });
        });

        $('.app').append(renderedModal.el);
    }
});

// Beerery.App = function(){

// };

// Beerery.addInput = function(){
//     var hostModal = new Beerery.HostModal();
//     hostModal.title = "New Input";

//     var newInputModel = new Beerery.InputConfig();

//     var editForm = new Beerery.InputConfigFormView({
//         model: newInputModel
//     });

//     var renderedModal = hostModal.render();
//     renderedModal.$(".bbm-modal__section").append(editForm.render().el);

//     this.listenTo("")

//     $('.app').append(renderedModal.el);
// };

// Beerery.initialize = function(){
// 	console.log("initializing beerery");

// 	var inputConfigs = new Beerery.InputConfigCollection();
// 	inputConfigs.fetch({
//         success: function(col, res){
//         	var inputColView = new Beerery.InputConfigCollectionView({
//                 collection:col,
//                 el: $('#input-list')[0]
//             });
//             inputColView.render();
//         },
//         error: function(col, res){
//         	$("#input-list").html("<div>Error retrieving inputs: " + res.statusText + "</div>");
//         }
//     });

//     var outputConfigs = new Beerery.OutputConfigCollection();
// 	outputConfigs.fetch({
//         success: function(col, res){
//         	var outputColView = new Beerery.OutputConfigCollectionView({
//                 collection:col,
//                 el: $('#output-list')[0]
//             });
//             outputColView.render();
//         },
//         error: function(col, res){
//         	$("#output-list").html("<div>Error retrieving outputs: " + res.statusText + "</div>");
//         }
//     });

//     // connect page level controls
//     $("#add-input-button").on({
//         click: Beerery.addInput
//     });

//     var AppRouter = Backbone.Router.extend({
//         routes: {
//             "config": "goToConfig",
//             "input/edit/:name": "goToEdit",
//             "*actions": "defaultRoute" // Backbone will try match the route above first
//         }
//     });
//     // Instantiate the router
//     var app_router = new AppRouter();
//     app_router.on('route:goToConfig', function () {
        
//     });
//     app_router.on('route:goToEdit', function (name) {
//         console.log( "edit: " + name ); 

//         var hostModal = new Beerery.HostModal({
//             model: ""
//         });
//         $('.app').append(hostModal.render().el);
//     });
//     app_router.on('route:defaultRoute', function (actions) {
//         console.log( actions ); 
//     });

//     Backbone.history.start();
// };