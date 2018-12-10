import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";

export default class Nav extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar col-md-12 navbar__search">
          <a className=" navbar__img navbar-brand" href="#">
            <img
              src={require("./panorama.png")}
              className="d-inline-block align-center pano-logo"
              alt=""
            />
          </a>
          <button className="btn btn-about">About</button>
        </nav>
      </div>
    );
  }
}
