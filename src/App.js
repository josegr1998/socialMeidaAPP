import React from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //switch has been replaced with Routes
//tambien ahora el children que muestra se llama element
import useStyles from "./styles";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./Auth/Auth";

function App() {
  const classes = useStyles();

  return (
    <Router>
      <Container maxwidth='lg'>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />}></Route>
          <Route path='/auth' exact element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
