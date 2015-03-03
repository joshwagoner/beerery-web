(function() {

    var configViewBase = Backbone.View.extend({
        formViewWithModel: function(model) {
            return {};
        },

        initialize: function() {

        },

        dataJSON: function() {
            return this.model.toJSON();
        },

        render: function() {
            this.$el.html(this.template({
                data: this.dataJSON()
            }));

            this.$('.edit').on({
                'click': $.proxy(this.edit, this)
            });

            this.$('.delete').on({
                'click': $.proxy(this.destroy, this)
            });

            return this;
        },

        edit: function() {
            var hostModal = new Beerery.HostModal();
            hostModal.title = "Edit " + this.model.get("name");

            var editForm = this.formViewWithModel(this.model);

            var renderedModal = hostModal.render();

            renderedModal.$(".bbm-modal__section").append(editForm.render().el);

            this.listenTo(renderedModal, "submit", function() {
                editForm.update();

                // save to the server
                this.model.save();

                // re-render
                this.render();
            });

            $('.app').append(renderedModal.el);
        },

        destroy: function() {
            if (confirm("Delete " + this.model.get("name") + "?")) {
                this.model.destroy({
                    success: function() {},
                    error: function() {}
                });
            }
        }
    });

    Beerery.ConfigViewBase = configViewBase;

})();