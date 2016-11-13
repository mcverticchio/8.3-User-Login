var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var MessageCollection = require('../models/message.js').MessageCollection;


var MessageForm = React.createClass({
  getInitialState: function(){
    return {
      message: ''
    };
  },
  handleMessage: function(e){
    var message = e.target.value;
    this.setState({message: message});
  },
  handleMessagePost: function(e){
    e.preventDefault();
    var messageData = {
      username: localStorage.getItem('username'),
      message: this.state.message
    };
    this.props.handleMessagePost(messageData)
    this.setState({message: ''});
  },
  render: function(){
    return (
      <form onSubmit={this.handleMessagePost} className="form-horizontal well">
        <div className="form-group">
          <label htmlFor="messageInput" className="control-label">Message</label>
          <div>
            <input onChange={this.handleMessage} value={this.state.message} type="text" className="form-control" id="messageInput" placeholder="Your message here" />
          </div>
        </div>
        <div className="form-group">
          <div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </div>
        </div>
      </form>
    );
  }
});


var MessageList = React.createClass({
  render: function(){
    var messages = this.props.collection;


    var messageList = messages.map(function(data){
      return (
          <div key={data.get("objectId") || data.cid} className="list-group-item">
            <strong>{data.get('username')}:</strong> {data.get('message')}
          </div>
        )
    });
    return (
        <div  className="list-group">
          {messageList}
        </div>
    );
  }
});


var MessageContainer = React.createClass({
  getInitialState: function(){
    return {
      // message: new models.Message(),
      messageCollection: new MessageCollection()
    };
  },
  componentWillMount: function(){
    var self = this;
    // var messageCollection = this.state.messageCollection;
    var messageCollection = this.state.messageCollection
    messageCollection.fetch().then(() => {
      self.setState({messageCollection: messageCollection});
      // var local= localStorage.user;
      // console.log(localStorage.getItem('username'))
    });
  },
  handleMessagePost: function(messageData){
    //console.log(messageData);
    var data = {
      'username': messageData.username,
      'message': messageData.message
    };
    this.state.messageCollection.create(data);
    this.setState({messageCollection: this.state.messageCollection});
  },
  render: function(){
    // console.log(messageCollection);
    return(
      <div className="container">
        <h1>Welcome, {localStorage.getItem('username')}!</h1>
        <MessageList collection={this.state.messageCollection} />
        <MessageForm handleMessagePost={this.handleMessagePost}/>
      </div>
    )
  }
});


module.exports = {
  MessageContainer: MessageContainer
}
