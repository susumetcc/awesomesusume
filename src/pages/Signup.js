import React from "react";
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import firebase, { auth, db } from '../firebase';
import AuthForm from "../components/Authentication/AuthForm";
import "./Signup.css";

function openAccount(props) {
  const { email, password, name } = props;
  // Sign Up
  auth.createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      // Signed in
      var user = userCredential.user;
      await db.collection("users").doc(user.uid).set({
        pageUrl: "",
        name: name,
        avatarUrl: "",
        intro: "",
        favorite: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      window.location.href = "/";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', name: ''};

    this.mailChange = this.mailChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  mailChange(event) {
    this.setState({email: event.target.value});
  }

  passChange(event) {
    this.setState({password: event.target.value});
  }

  nameChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.email);
    openAccount(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item maxwidth="xs">
          <div>
            <React.Fragment>
              <span className={"center-item"}>
                <span className={"avatar-area"}>
                  <PersonAddIcon
                    style={{ height: "32px", width: "32px", color: "#ffffff" }}
                  />
                </span>
              </span>
              <Typography className={"center-item"} component="h1" variant="h5">
                Sign Up
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="name"
                label="表示名"
                id="name"
                onChange={this.nameChange}
              />
              <AuthForm
                handleSubmit={this.handleSubmit}
                onChangeMail={this.mailChange}
                onChangePass={this.passChange}
                type={"サインアップは無料です"}
              />
            </React.Fragment>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default Signup;