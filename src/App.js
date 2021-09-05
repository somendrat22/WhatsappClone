import './App.css';
import React, {useState} from 'react';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Login.js';
import {useStateValue} from "./StateProvider";
function App() {
  const [{user}, dispatch] = useStateValue();
  return (
    <div className="App">
      {!user ? (
        <Login></Login>
      ):(
          <div className = "app__body">
          <Router>
          <Sidebar></Sidebar>
            <Switch>
              <Route path = "/rooms/:roomId">
                <Chat></Chat>
              </Route>
              <Route path = "/">
                {/* <Chat></Chat> */}
              </Route>  
            </Switch>
          </Router>
        </div>
      )}
     
    </div>
  );
}

export default App;
