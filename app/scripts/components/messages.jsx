var React = require('react');
var $ = require('jquery');

var MessageContainer = React.createClass({
  render: function(){
    return(
      <h1>Welcome to the Chat App!</h1>
    )
  }
});

module.exports = {
  MessageContainer: MessageContainer
}
