import React from "react";
import { Redirect } from 'react-router-dom';
import firebase, { auth } from '../firebase';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import Snackbar from '@material-ui/core/Snackbar';
import AuthForm from "../components/Authentication/AuthForm";
import LoginProvider from "../components/LoginProvider";
import "./Signup.css";

async function signInAuth(props) {
  await auth.signInWithEmailAndPassword(props.email, props.password)
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
    this.state = {email: '', password: '', isSignin: false, redirect: redirect, open: false, isChecking: false};

    this.mailChange = this.mailChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleLoginHandler = this.googleLoginHandler.bind(this);
    this.appleLoginHandler = this.appleLoginHandler.bind(this);
    this.alertClose = this.alertClose.bind(this);
  }

  mailChange(event) {
    this.setState({email: event.target.value});
  }

  passChange(event) {
    this.setState({password: event.target.value});
  }

  async handleSubmit(event) {
    let uid = await signInAuth(this.state);
    console.log(uid)
    if (uid) {
      this.setState({isSignin: true});
    } else {
      this.setState({open: true});
    }
    event.preventDefault();
  }

  async googleLoginHandler() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.setState({isChecking: true});
    await auth.signInWithPopup(provider).then((result) => {
      this.setState({isSignin: true});
    }).catch((error) => {
      console.log(error)
      this.setState({open: true, isChecking: false});
    });
  }

  async appleLoginHandler() {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    this.setState({isChecking: true});
    await auth.signInWithPopup(provider).then((result) => {
      this.setState({isSignin: true});
    }).catch((error) => {
      console.log(error)
      this.setState({open: true, isChecking: false});
    });
  }

  alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false});
  };

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
                  <span className={"avatar-area"}>
                    <PersonIcon
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
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={this.state.open}
                autoHideDuration={5000}
                onClose={this.alertClose}
                message="サインインできませんでした。もう一度やり直してください。"
                action={
                  <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.alertClose}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
              >
              </Snackbar>
            </div>
            <div>
              {this.state.isChecking?
                <p>認証中...</p>
              :
                <LoginProvider google={this.googleLoginHandler} apple={this.appleLoginHandler} />
              }
            </div>
          </Grid>
        }
      </Grid>
    );
  }
}

export default Signin;