var React = require('react');
var Backbone = require('backbone');

var models = require('../models/message.js');


// var MessageForm = React.createClass({
//   getInitialState: function(){
//     return this.props.message.toJSON();
//   },
//   componentWillReceiveProps: function(newProps){
//     this.setState(newProps.message.toJSON());
//   },
//   handleChange: function(e){
//     this.setState({message: e.target.value});
//     // console.log(this.state.message);
//   },
//   handleSubmit: function(e){
//     e.preventDefault();
//     console.log('submittted');
//     this.props.sendMsg(this.state);
//   },
//   render: function(){
//     // message = this.props.message;
//     var self = this;
//     return(
//       <form onSubmit={this.handleSubmit}>
//         <input onChange={this.handleChange} type="text" className="form-control" id="chat" placeholder="Write a Message.." />
//         <button type="submit" className="btn btn-primary msgSendBtn">Send Message</button>
//       </form>
//     );
//   }
// });

var MessageList = React.createClass({
  render: function(){
    var messageList = this.props.messages.map(function(message){
      console.log(message.get('objectId'))
      return <div key={message.cid} className="row well">
                <div className="col-md-12">
                  <span className="content">{message.get('body')}</span>
                </div>
            </div>
    })
    return(
          <div>
            {messageList}
          </div>
    );
  }
});

var MessageContainer = React.createClass({
  getInitialState: function(){
    return {
      message: new models.Message(),
      messageCollection: new models.MessageCollection()
    };
  },
  componentWillMount: function(){
    var messageCollection = this.state.messageCollection;
    messageCollection.fetch().then(() => {
      this.setState({messageCollection: messageCollection});
      console.log(messageCollection);
    })
  },
  // sendMsg: function(message){
  //   var message = this.state.message;
  //   message.save().then(() => {
  //     console.log(message);
  //   })
  // //   var user =localStorage.get('username');
  // //   this.state.messageCollection.create({
  // //
  // },
  render:function(){
    return(
      <div className="container">
        <h1>Welcome, {localStorage.getItem('username')}!</h1>
        <MessageList messages={this.state.messageCollection} />
      </div>
    )
  }
});
// <MessageForm message={this.state.message} sendMsg={this.sendMsg}/>


module.exports = {
  MessageContainer: MessageContainer
}
