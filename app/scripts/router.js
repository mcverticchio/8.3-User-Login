var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var setupParse = require('./parseUtilities').setupParse;
var LoginSignUpContainer = require('./components/login.jsx').LoginSignUpContainer;
var MessageContainer = require('./components/messages.jsx').MessageContainer;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'messages/': 'messages'
  },
  initialize: function(){
    setupParse('carolinesparseserver', 'slumber')
  },
  index: function(){
    ReactDOM.render(
      React.createElement(LoginSignUpContainer, {router:this}),
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
