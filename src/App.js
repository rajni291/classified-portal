import header from './header.png';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './App.css';
import Category from './category/Category';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">

          <img className="dashboard-tabs-icon" src={header} alt="" height="70px" />

          <NavLink to="/category" activeClassName="active" className="Link-header" >
            <div className="title"> One Click</div>
          </NavLink>

          <NavLink to="/postadd" activeClassName="active" className="Link-header" >
            <div className="post" >Post Ads</div>
          </NavLink>

        </header>

        <div className="content-body">
          {
            <Router>
              <Switch>
                <Route exact path="/category" component={Category} />
                <Route exact path="/" component={Category} />
              </Switch>
            </Router>
          }
        </div>
      </Router>

      <footer className="footer">About us</footer>
    </div>
  );
}

export default App;
