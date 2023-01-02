import Navbar from './components/Navbar';
import Home from './components/Home';
import Posts from './components/Posts';
import Account from './components/Account'
import Create from './components/Create'
import PostDetails from './graveyard/PostDetails';
import Friends from './components/Friends';
import PageNotFound from './components/failpages/PageNotFound';
import AboutUs from './components/AboutUs';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Settings from './components/Settings';
import CreateFail from './components/failpages/CreateFail';
import profile from './components/auth/Login'

/**
 * The 'App' file that houses the routes for smaller components of the App 
 * @returns the 'App' that will then be rendered in index.tsx
 */
function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <div className="content">
          <Switch> 
            {/* <Route exact path="/" render={() => (
              profile() ? (
                <Home></Home>
            ) : (
              <Home/>
            ))}/>
             </Route> */}
             <Route exact path="/" >
                <Home></Home>
             </Route>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route exact path="/posts">
              <Posts></Posts>
            </Route>
            <Route exact path="/aboutus">
              <AboutUs></AboutUs>
            </Route>
            <Route exact path="/friends">
              <Friends></Friends>
            </Route>
            <Route exact path="/settings">
              <Settings></Settings>
            </Route>
            <Route exact path="/account">
              <Account></Account>
            </Route>
            <Route path="/posts/:id">
              <PostDetails />
            </Route>
            <Route path="/createfail">
              <CreateFail />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;