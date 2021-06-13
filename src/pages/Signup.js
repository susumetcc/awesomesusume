import React from "react";
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import AuthForm from "../components/AuthForm";
import "./Signup.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mail: '', pass: ''};

    this.mailChange = this.mailChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  mailChange(event) {
    this.setState({mail: event.target.value});
  }

  passChange(event) {
    this.setState({pass: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.mail);
    event.preventDefault();
  }

  render() {
    return (
      <Grid container justify="center">
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
                Sign Up
              </Typography>
              <AuthForm
                handleSubmit={this.handleSubmit}
                onChangeMail={this.mailChange}
                onChangePass={this.passChange}
              />
            </React.Fragment>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default Signup;