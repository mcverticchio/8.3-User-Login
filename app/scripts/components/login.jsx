var React = require('react');
var $ = require ('jquery');

$.ajaxSetup({
  beforeSend: function(xhr){
    xhr.setRequestHeader("X-Parse-Application-Id", "carolinesparseserver" );
    xhr.setRequestHeader("X-Parse-REST-API-Key", "slumber");
  }
});


var Signup = React.createClass({
  render: function(){
    return(
      <div className="col-md-6">
        <h2>Need an Account? Sign Up!</h2>
        <form onSubmit={this.props.userSignUp} id="signup">

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input className="form-control" name="email" id="email" type="email" placeholder="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" name="password" id="password" type="password" placeholder="Password Please" />
          </div>

          <input className="btn btn-primary" type="submit" value="Sign Me Up!" />
        </form>
      </div>
    )
  }
});


var Signin = React.createClass({
  render: function(){
    return(
        <div className="col-md-6">
          <h2>Please Login</h2>
          <form onSubmit={this.props.userSignIn} id="login">
            <div className="form-group">
              <label htmlFor="email-login">Email address</label>
              <input className="form-control" name="email" id="email-login" type="email" placeholder="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password-login">Password</label>
              <input className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
            </div>

            <input className="btn btn-primary" type="submit" value="Beam Me Up!" />
          </form>
        </div>
    )
  }
});


var LoginContainer = React.createClass({
  userSignUp: function(){
    var url = 'https://caroline24.herokuapp.com/';
    var resultPromise= $.ajax(url).then(function(data){

    });

    $(document).on('submit', '#signup', function(e){
      e.preventDefault();

      var data = {
        'username': $('#email').val(),
        'password': $('#password').val()
      };

      var url = 'https://caroline24.herokuapp.com/';

      $.post(url + 'users', data).then(function(response){
        console.log(response);
      });
    });
  },
  userSignIn: function(){
    // var url = 'https://caroline24.herokuapp.com/';
    // var resultPromise = $.ajax(url).then(function(data){
    //   // console.log(data);
    // });
    var self = this;
    $(document).on('submit', '#login', function(e){
      e.preventDefault();

      var url = 'https://caroline24.herokuapp.com/';

      var username = $('#email-login').val();
      var password = $('#password-login').val();
      var loginUrl = url +'login?username=' + encodeURI(username) + '&password=' + encodeURI(password);
      console.log(loginUrl);

      // console.log(self.props.router);
      $.ajax(loginUrl, {
        success: function(response){
          // alert("success!");
          console.log(response.sessionToken)
          localStorage.setItem('token', response.sessionToken);

          var router = self.props.router;
          router.navigate('messages/', {trigger:true});
        },

        error: function(xhr){
          $('.error').html(xhr.responseJSON.error);
          alert('Incorrect login');
        }
      });
    });
  },
  render: function(){
    console.log(this.props.router);
    return(
      <div className="container">
        <div className="row">
          <Signup userSignUp={this.userSignUp} />
          <Signin userSignIn={this.userSignIn} router={this.props.router}/>
        </div>
      </div>
    )
  }
});

module.exports = {
  LoginContainer: LoginContainer
}
