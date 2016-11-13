var React = require('react');
var $ = require ('jquery');
var User = require('../models/user.js').User;


var Signup = React.createClass({
  getInitialState: function(){
    return{
      username: '',
      password: ''
    };
  },
  handleUsernameInput: function(e){
    this.setState({username: e.target.value})
  },
  handlePasswordInput: function(e){
    this.setState({password: e.target.value})
  },
  handleSignUp: function(e){
    e.preventDefault();
    var username= this.state.username;
    var password= this.state.password;

    this.props.signUp(username, password);
  },
  render: function(){
    return(
      <div className="col-md-6">
        <h2>Need an Account? Sign Up!</h2>
        <form onSubmit={this.handleSignUp} id="signup">

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input onChange={this.handleUsernameInput} value={this.state.username} className="form-control" name="email" id="email" type="email" placeholder="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.handlePasswordInput} value={this.state.password} className="form-control" name="password" id="password" type="password" placeholder="Password Please" />
          </div>

          <input className="btn btn-primary" type="submit" value="Sign Me Up!" />
        </form>
      </div>
    )
  }
});


var Signin = React.createClass({
  getInitialState: function(){
    return{
      username: '',
      password: ''
    };
  },
  handleUsernameInput: function(e){
    this.setState({username: e.target.value})
    // console.log(this.state.username);
  },
  handlePasswordInput: function(e){
    this.setState({password: e.target.value})
  },
  handleSignIn: function(e){
    e.preventDefault();
    var username= this.state.username;
    var password= this.state.password;
    console.log(username)
    this.props.signIn(username, password);
  },
  render: function(){
    return(
        <div className="col-md-6">
          <h2>Please Login</h2>
          <form onSubmit={this.handleSignIn} id="login">
            <div className="form-group">
              <label htmlFor="email-login">Email address</label>
              <input onChange={this.handleUsernameInput} value={this.state.username} className="form-control" name="email" id="email-login" type="email" placeholder="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password-login">Password</label>
              <input onChange={this.handlePasswordInput} value={this.state.password} className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
            </div>

            <input className="btn btn-primary" type="submit" value="Beam Me Up!" />
          </form>
        </div>
    )
  }
});


var LoginSignUpContainer = React.createClass({
  getInitialState: function(){
    return {
      user: new User()
    }
  },
  signUp: function(username, password){
    this.state.user.set({username: username, password: password});
    this.state.user.signUp()
  },
  signIn: function(username, password){
    this.state.user.set({username: username, password: password});
    this.state.user.signIn(username, password)
  },
  // userSignUp: function(){
  //   var url = 'https://caroline24.herokuapp.com/';
  //   var resultPromise= $.ajax(url).then(function(data){
  //
  //   });
  //
  //   $(document).on('submit', '#signup', function(e){
  //     e.preventDefault();
  //
  //     var data = {
  //       'username': $('#email').val(),
  //       'password': $('#password').val()
  //     };
  //
  //
  //     $.post(url + 'users', data).then(function(response){
  //       console.log(response);
  //       // localStorage.setItem('token', JSON.stringify(response.sessionToken));
  //
  //     });
  //   });
  // },
  // userSignIn: function(){
  //
  //   var self = this;
  //   $(document).on('submit', '#login', function(e){
  //     e.preventDefault();
  //
  //     var url = 'https://caroline24.herokuapp.com/';
  //
  //     var username = $('#email-login').val();
  //     var password = $('#password-login').val();
  //     var loginUrl = url +'login?username=' + encodeURI(username) + '&password=' + encodeURI(password);
  //     console.log(loginUrl);
  //
  //     localStorage.setItem('username', JSON.stringify(username));
  //     // console.log(self.props.router);
  //     $.ajax(loginUrl, {
  //       success: function(response){
  //         console.log(response.sessionToken)
  //
  //         var router = self.props.router;
  //         router.navigate('messages/', {trigger:true});
  //       },
  //
  //       error: function(xhr){
  //         $('.error').html(xhr.responseJSON.error);
  //         alert('Incorrect login');
  //       }
  //     });
  //   });
  // },
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <Signup signUp={this.signUp} />
          <Signin signIn={this.signIn} />
        </div>
      </div>
    )
  }
});
// <Signin userSignIn={this.userSignIn} router={this.props.router}/>


module.exports = {
  LoginSignUpContainer: LoginSignUpContainer
}
