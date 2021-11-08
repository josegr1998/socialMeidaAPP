import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PostProvider } from "./context/PostContext";

ReactDOM.render(
  <PostProvider>
    <App />
  </PostProvider>,
  document.getElementById("root")
);
