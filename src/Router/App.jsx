import React from 'react';

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <i>
            <Link to="/login" style={{ margin: "-20px" }}>
              Login
            </Link>
          </i>
          <i>
            <Link to="/home" style={{ margin: "-20px" }}>
              Home
            </Link>
          </i>
          <i
            onClick={() => {
              localStorage.removeItem("edit");
              localStorage.removeItem("token");
              localStorage.removeItem("type");
              (() => {
                window.location.reload(false);
              })();
            }}
          >
            Logout
          </i>
        </nav>
        <div className="container">
          <Switch>
            <Route path="/register">
              <div>
                <Register />
                <center>
                  <Link
                    to="/login"
                    style={{
                      color: "rgb(31, 67, 187)",
                      textAlign: "center",
                    }}
                  >
                    Already Signed Up! Login Here!
                  </Link>
                </center>
              </div>
            </Route>

            <Route path="/login">
              <div>
                <Login />
                <center>
                  <Link
                    to="/register"
                    style={{
                      color: "rgb(31, 67, 187)",
                      textAlign: "center",
                    }}
                  >
                    Don’t have an account? Sign Up!
                  </Link>
                </center>
              </div>
            </Route>
            <Route path="/home">
              <center>
                <Home />
              </center>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
