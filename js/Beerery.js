Beerery = {};

Beerery.config = {
    rootUrl: "http://10.0.0.27:3000/"
};

Beerery.App = Backbone.View.extend({
    initialize: function() {
        var self = this;

        this.inputStates = new Beerery.InputStateCollection();
        this.outputStates = new Beerery.OutputStateCollection();

        this.inputConfigs = new Beerery.InputConfigCollection();
        this.inputConfigs.fetch({
            success: function(col, res) {
                var inputColView = new Beerery.InputConfigCollectionView({
                    collection: col,
                    el: $('#input-list')[0]
                });
                inputColView.render();

                self.loadInputStates(col);
            },
            error: function(col, res) {
                $("#input-list").html("<div>Error retrieving inputs: " + res.statusText + "</div>");
            }
        });

        this.outputConfigs = new Beerery.OutputConfigCollection();
        this.outputConfigs.fetch({
            success: function(col, res) {
                var outputColView = new Beerery.OutputConfigCollectionView({
                    collection: col,
                    el: $('#output-list')[0]
                });
                outputColView.render();

                self.loadOutputStates(col);
            },
            error: function(col, res) {
                $("#output-list").html("<div>Error retrieving outputs: " + res.statusText + "</div>");
            }
        });

        // connect page level controls
        $("#add-input-button").on({
            click: $.proxy(this.addInput, this)
        });

        $("#add-output-button").on({
            click: $.proxy(this.addOutput, this)
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
        app_router.on('route:goToConfig', function() {

        });
        app_router.on('route:goToEdit', function(name) {
            console.log("edit: " + name);

            var hostModal = new Beerery.HostModal({
                model: ""
            });
            $('.app').append(hostModal.render().el);
        });
        app_router.on('route:defaultRoute', function(actions) {
            console.log(actions);
        });

        Backbone.history.start();
    },

    loadInputStates: function(inputConfigCollection) {
        // get inputs states
        var self = this;
        inputConfigCollection.each(function(input) {
            var inputState = new Beerery.InputState({
                name: input.get("name")
            });
            self.inputStates.add(inputState);

            inputState.fetch({
                success: function() {},
                error: function(model) {
                    model.set("valid", false);
                }
            });
        });

        var inputStateColView = new Beerery.ConfigCollectionViewBase({
            collection: this.inputStates,
            el: $('#input-state-list')[0]
        });
        inputStateColView.viewWithModel = function(model) {
            return new Beerery.InputStateView({
                model: model
            });
        };

        inputStateColView.render();
    },

    loadOutputStates: function(outputConfigCollection) {
        // get inputs states
        var self = this;
        outputConfigCollection.each(function(input) {
            var outputState = new Beerery.OutputState({
                name: input.get("name")
            });
            self.outputStates.add(outputState);

            outputState.fetch({
                success: function() {},
                error: function(model) {
                    model.set("valid", false);
                }
            });
        });

        var outputStateColView = new Beerery.ConfigCollectionViewBase({
            collection: this.outputStates,
            el: $('#output-state-list')[0]
        });
        outputStateColView.viewWithModel = function(model) {
            return new Beerery.OutputStateView({
                model: model
            });
        };

        outputStateColView.render();
    },

    addInput: function() {
        var hostModal = new Beerery.HostModal();
        hostModal.title = "New Input";

        var newInputModel = new Beerery.InputConfig();

        var editForm = new Beerery.InputConfigFormView({
            model: newInputModel
        });

        var renderedModal = hostModal.render();
        renderedModal.$(".bbm-modal__section").append(editForm.render().el);

        var self = this;
        this.listenTo(renderedModal, "submit", function() {
            editForm.update();

            newInputModel.save({}, {
                success: function() {
                    // add the model to the collection
                    self.inputConfigs.add(newInputModel);
                }
            });
        });

        $('.app').append(renderedModal.el);
    },

    addOutput: function() {
        var hostModal = new Beerery.HostModal();
        hostModal.title = "New Output";

        var newOutputModel = new Beerery.OutputConfig();

        var editForm = new Beerery.OutputConfigFormView({
            model: newOutputModel
        });

        var renderedModal = hostModal.render();
        renderedModal.$(".bbm-modal__section").append(editForm.render().el);

        var self = this;
        this.listenTo(renderedModal, "submit", function() {
            editForm.update();

            newOutputModel.save({}, {
                success: function() {
                    // add the model to the collection
                    self.outputConfigs.add(newOutputModel);
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