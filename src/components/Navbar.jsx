import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  static propTypes = {}

  render() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/">Home</Link></li>  
              <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/entertainment">Entertainment</Link></li> 
              <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/technology">Technology</Link></li>
             
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Functional Component Version
                </a>
                <ul className="dropdown-menu">
                <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/F">Home</Link></li>
                <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/FNews">News</Link></li> 
                <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/Fbusiness">Business</Link></li>
                <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/Fentertainment">Entertainment</Link></li> 
                <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/Fhealth">Health</Link></li>
                <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/Fscience">Science</Link></li>
                <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/Fsports">Sports</Link></li>
                <li className="nav-item"><Link className="nav-link active" aria-current="page"  to="/Ftechnology">Technology</Link></li>
                </ul>
              </li>
            </ul> 
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar