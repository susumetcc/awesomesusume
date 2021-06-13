import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import './App.css';
import { auth } from "firebase"
import Explore from "./pages/Explore";
import Post from "./pages/Post";

function App() {
  return (
    <>
      <div className="App">
        <Button color="primary" href="/">Awesome Susume</Button>
      </div>
      <Router>
        <Route exact path="/" component={Explore}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/post" component={Post}></Route>
      </Router>
    </>
  );
}

export default App;
