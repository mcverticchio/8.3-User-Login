var Backbone = require('backbone');
var $ = require('jquery');

var User = Backbone.Model.extend({
  defaults: {
    username: '',
    password: ''
  },
  idAttribute: 'objectId',
  urlRoot: 'https://caroline24.herokuapp.com/users',
  parse: function(data){
    console.log('parse', data);
    return data.results
  },
  signIn: function(username, password){
   $.ajax('https://caroline24.herokuapp.com/' + 'login?username=' + encodeURI(username) + '&password=' + encodeURI(password)).then(function(response){
     localStorage.setItem('token', response.sessionToken);
     localStorage.setItem('username', username);
    //  console.log(localStorage.getItem('username'))
     Backbone.history.navigate('messages/', {trigger: true});
   })
  },
  signUp: function(){
    var self=this;
    var username= this.get('username');
    var password= this.get('password');

    this.save().then(function(data){
     localStorage.setItem('user', JSON.stringify(self.toJSON()));
    });
  },
});

module.exports = {
  User: User
};
