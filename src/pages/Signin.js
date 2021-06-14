import React from "react";
import { Redirect } from 'react-router-dom';
import { auth } from '../firebase';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import AuthForm from "../components/AuthForm";
import "./Signup.css";

function signInAuth(props) {
  auth.signInWithEmailAndPassword(props.email, props.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("認証成功: " + user.uid)
      window.location.href = props.redirect;
      console.log(props.redirect)
      return user.uid;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage + ": " + errorCode)
      return null;
    });
}

class Signin extends React.Component {
  constructor(props) {
    super(props);
    const query = window.location.search;
    let redirect = "/";
    if(props.redirect) {
      redirect = props.redirect;
    } else if(query) {
      let queries = {};
      query.slice(1).split('&').forEach(function(query) {
        // = で分割してkey,valueをオブジェクトに格納
        var queryArr = query.split('=');
        queries[queryArr[0]] = queryArr[1];
        console.log(queries)
      });
      redirect = queries['redirect'];
    }
    this.state = {email: '', password: '', isSignin: false, redirect: redirect};

    this.mailChange = this.mailChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  mailChange(event) {
    this.setState({email: event.target.value});
  }

  passChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    let uid = signInAuth(this.state);
    console.log(uid)
    if (uid) {
      this.setState({isSignin: true});
    }
    event.preventDefault();
  }

  render() {
    return (
      <Grid container justify="center">
        { this.state.isSignin === true ?
          <Redirect to={this.state.redirect} />
        :
          <Grid item maxwidth="xs">
            <div>
              <React.Fragment>
                <span className={"center-item"}>
                  <span className={"avater-area"}>
                    <PersonAddIcon
                      style={{ height: "32px", width: "32px", color: "#ffffff" }}
                    />
                  </span>
                </span>
                <Typography className={"center-item"} component="h1" variant="h5">
                  Sign In
                </Typography>
                <AuthForm
                  handleSubmit={this.handleSubmit}
                  onChangeMail={this.mailChange}
                  onChangePass={this.passChange}
                  type={"サインイン"}
                />
              </React.Fragment>
            </div>
          </Grid>
        }
      </Grid>
    );
  }
}

export default Signin;