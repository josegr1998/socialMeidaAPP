import React, { useState, useEffect } from "react";
import { AppBar, Button, Typography, Toolbar, Avatar } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const { logout } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  //podria hacer que user sea global, cambiarlo desde el reducer y ponerlo como dependency en el useEffect para que vuelva a reenderizar el navbar. Y ponerlo en el local storage desde el userContext usando la variable global
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  //loggin out

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          variant='h2'
          align='center'
          className={classes.heading}
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt='memories'
          height='60'
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}{" "}
              {/*porque cuando me logeo no proveo imagen */}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={() => {
                logout();
                navigate("/");
                setUser(null);
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
