import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import './App.css';
import Auth from "./components/Auth"
import Explore from "./pages/Explore";
import Post from "./pages/Post";
import Signout from "./components/Signout"

function App() {
  return (
    <>
      <div className="App">
        <header>
          <Button color="primary" href="/">Awesome Susume</Button>
          <Button color="secondary" href="/signup">新規登録</Button>
          <Button color="secondary" href="/signin">サインイン</Button>
          <Button color="secondary" href="/signout">サインアウト</Button>
        </header>
      </div>
      <Router>
        <Route exact path="/" component={Explore}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        {/* ここから下は認証が必要なページ */}
        <Auth path="/post" component={Post}></Auth>
        <Auth path="/signout" component={Signout}></Auth>  
      </Router>
    </>
  );
}

export default App;
