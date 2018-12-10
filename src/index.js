import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import Nav from "./Nav";

ReactDom.render(<Nav />, document.querySelector("#nav"));
ReactDom.render(<App ciy="Lisbon" />, document.querySelector("#lisbon"));
