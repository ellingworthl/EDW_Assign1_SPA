import React from 'react';
import './bootsnip-login.css';

var RegisterApp = React.createClass({
  render: function(){
    return (
// Page Content
// Log-in Template from http://bootsnipp.com 

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
          
            <h1>Registered as a User</h1>
            <p>As a registered user of this site you will be able to DO SOMETHING!</p>
            <br />

            <a href="#" data-toggle="modal" data-target="#login-modal">Click HERE to log-in</a>
            <div className="modal fade" id="login-modal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display: 'none'}}>
              <div className="modal-dialog">
                <div className="loginmodal-container">
                  <h1>Login to Your Account</h1><br />
                  <form>
                    <input type="text" name="user" placeholder="Username" />
                    <input type="password" name="pass" placeholder="Password" />
                    <input type="submit" name="login" className="login loginmodal-submit" defaultValue="Login" />
                  </form>
                  <div className="login-help">
                    <a href="#">Register</a> - <a href="#">Forgot Password</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default RegisterApp;