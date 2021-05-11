import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
    marginLeft: theme.spacing(36),
  },
  form: {
    width: "50%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //     axios.get("http://localhost:5000/login").then(response => {
  //         // if(response.data.length !==0){
  //             console.log("login",response);
  //         // }
  //     }).catch((err) => {
  //       console.log("error while fetching all registered user", err);
  //     });
  // }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(user.email) ? "" : "Email is not valid.";
    temp.password = user.password.length !== 0 ? "" : "This field is required";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (validate()) {
      console.log("Logged in user", user);
    } else {
      console.log("error", errors);
    }

    axios
      .post("http://localhost:5000/login", user)
      .then((response) => {
        // if(response.data.length !==0){
        console.log("login", response);
        // }
      })
      .catch((err) => {
        console.log("error while fetching all registered user", err.response);
      });
  };

  return (
    <div>
      <Paper className={classes.paper} elevation={11}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                type="email"
                size="small"
                value={user.email}
                {...(errors.email && { error: true, helperText: errors.email })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                onChange={handleChange}
                size="small"
                value={user.password}
                {...(errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
        <Link href="/register" variant="body2">
          Don't have an account? Sign up
        </Link>
      </Paper>
    </div>
  );
}

export default Login;
