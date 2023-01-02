import {Link} from 'react-router-dom'
import Login from './auth/Login';

/**
 * The navigation bar in web application that provdes the access to all the pages, provided that the user
 * has logged in
 * @returns the link to the homepage and and calls on the login functionality 
 */
function Navbar() {
  return (
    <div className= "top-panel" aria-label= "top-panel">
      <nav className="navbar" aria-label="Navigation Bar">
        <div id="appTitle" className="appTitle">
          <Link className="Trek-link" to="/">TREK</Link>
        </div>
        <Login></Login>        
      </nav>
    </div>
  );
}
export default Navbar;