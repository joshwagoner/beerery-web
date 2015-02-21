(function() {

  var hostModal = Backbone.Modal.extend({
    template: _.template($('#modal-template').html()),

    cancelEl: '.bbm-close',
    submitEl: '.bbm-submit',

    beforeCancel: function(){
    	this.trigger("cancel");
    },

    beforeSubmit: function(){
    	this.trigger("submit");
    }
  });

  Beerery.HostModal = hostModal;

  Beerery.HostModal.prototype.serializeData = function() {
  	var data = Backbone.Modal.prototype.serializeData.apply(this);

  	_.extend(data, {
  		title: this.title
  	});
    
    return data;
  };

})();