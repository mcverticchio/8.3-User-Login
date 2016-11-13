var Backbone = require('backbone');
var $ = require('jquery');

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',

  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  }
});

var Message = ParseModel.extend({
  idAttribute: 'objectId',
  // defaults: {
  //   visible: true,
  //   body: ''
  // },
  urlRoot: 'https://caroline24.herokuapp.com/classes/Message',
  // save: function(key, val, options){
  //   this.set('messages', this.get('body').toJSON());
  //
  //   return ParseModel.prototype.save.apply(this,arguments);
  // },
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://caroline24.herokuapp.com/classes/Message',
  parse: function(data){
   return data.results;
 }
});

module.exports = {
  Message: Message,
  MessageCollection: MessageCollection
};
