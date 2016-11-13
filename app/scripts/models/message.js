var Backbone = require('backbone');
var $ = require('jquery');

var Message = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    visible: true,
    body: ''
  },
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  }
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://caroline24.herokuapp.com/classes/Message',
});

module.exports = {
  Message: Message,
  MessageCollection: MessageCollection
};
