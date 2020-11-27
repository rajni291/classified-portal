import header from './header.png';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Category from './category/Category';

function App() {
  return (
    <div className="App">
      <header className="App-header">  
      <img className="dashboard-tabs-icon" src={header} alt="" height="70px"  />
      <div className="title"> One Click</div>
      </header>
      <div className="content-body">
      {
          <Router>
              <Switch>
                  <Route exact path="/"  >
                      <div>
                          <Category />
                      </div>
                  </Route>
              </Switch>
          </Router>
      }
  </div>
    </div>
  );
}

export default App;
