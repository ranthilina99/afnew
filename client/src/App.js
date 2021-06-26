import './App.css';
import React,{useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import store from "../store";
import {Provider} from "react-redux";
import Admin from "./pages/login/admin";
import Editor from "./pages/login/editor";
import Reviewer from "./pages/login/reviewer";
import Login from "./pages/login/login";
import Dashboard from "./pages/DashBoard/dashboard";
import Header from "./component/Header/Header";
import {loadUser} from "./action/action";
import {setToken} from "./setToken";

if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
}
function App() {

    useEffect(() => {
        store.dispatch(loadUser())
    },[]);

  return (
    <div className="App">
        <Header/>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/editor" component={Editor}/>
                    <Route path="/reviewer" component={Reviewer}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Dashboard}/>
                </Switch>
            </Router>
        </Provider>
    </div>
  );
}

export default App;
