{/*Trying to fix Collapse NavBar! code from https://github.com/learncodeacademy/react-js-tutorials/blob/master/2-react-router/src/js/components/layout/Nav.js */}
import React from 'react';
import { Link } from "react-router";

export default class NavBar extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { collapsed } = this.state;

    return (
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="container">

            {/*Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="nav navbar-nav">
                    <li className="active"><Link to="/"><span className="navbar-brand"></span> Field Archery Finder (FAF)</Link></li>
                    <li><Link to="about">About</Link></li>
                    <li><Link to="venues">Venues</Link></li>
                    <li><Link to="reviews">Reviews</Link></li>
                    <li><Link to="register">Login</Link></li>
                </ul>
            </div>
        </nav>
    </div>
    );
  }
}   