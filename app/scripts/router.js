var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var LoginContainer = require('./components/login.jsx').LoginContainer;
var MessageContainer = require('./components/messages.jsx').MessageContainer;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'messages/': 'messages'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(LoginContainer, {router:this}),
      document.getElementById('app')
    );
  },
  messages: function(){
    ReactDOM.render(
      React.createElement(MessageContainer, {router:this}),
      document.getElementById('app')
    );
  },
});

var router = new AppRouter();

module.exports = router;
