import { Button } from '@material-ui/core';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import './App.css';
import Auth from "./components/Authentication/Auth"
import Explore from "./pages/Explore";
import Article from "./pages/Article";
import Timeline from "./pages/Timeline";
import Post from "./pages/Post";
import Signout from "./components/Signout"
import Search from "./pages/Search";
import SearchBox from "./components/SearchBox";

function App() {
  return (
    <>
      <div className="App">
        <header>
          <Button color="primary" href="/">Awesome Susume</Button>
          <Button color="secondary" href="/signup">新規登録</Button>
          <Button color="secondary" href="/signin">サインイン</Button>
          <Button color="secondary" href="/signout">サインアウト</Button>
          <SearchBox></SearchBox>
        </header>
        <Router>
          <Route exact path="/" component={Explore}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/signin" component={Signin}></Route>
          <Route exact path="/p/:docid" component={Article}></Route>
          <Route exact path="/t/:userid" component={Timeline}></Route>
          <Route exact path="/search" component={Search}></Route>
          <Route exact path="/signout" component={Signout}></Route>
          {/* ここから下は認証が必要なページ */}
          <Route exact path="/post"><Auth path="/post" component={Post}></Auth></Route>
        </Router>
      </div>
    </>
  );
}

export default App;
