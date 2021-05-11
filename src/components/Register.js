import React, { useState } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
// import {Link} from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginLeft: theme.spacing(36),
  },
  form: {
    width: "45%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register() {
  const classes = useStyles();

  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    role: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    let temp = {};
    temp.fName = user.fName ? "" : "This field is required.";
    temp.lName = user.lName ? "" : "This field is required.";
    temp.role = user.role.length !== 0 ? "" : "This field is required.";
    temp.email = /\S+@\S+\.\S+/.test(user.email) ? "" : "Email is not valid.";
    temp.phoneNo =
      user.phoneNo.length === 10 ? "" : "10 digit number required.";
    temp.password = user.password.length > 8 ? "" : "Password should be of minimum 8 characters";
    temp.confirmPassword =
      user.confirmPassword === user.password
        ? ""
        : "Password does not match with the above.";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (validate()) {
      console.log("registered user", user);

      axios
        .post("http://localhost:5000/userRegister", user)
        .then((res) => {
          console.log(res.data);
          <Redirect to="/login" />
        })
        .catch((err) => {
          console.log("error while registering user", err.response);
        });
    } else {
      console.log("error", errors);
    }
  };

  return (
    <div>
      <Paper className={classes.paper} elevation={11}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="fName"
                onChange={handleChange}
                type="text"
                label="First Name"
                variant="outlined"
                size="small"
                value={user.fName}
                required
                fullWidth
                autoFocus
                {...(errors.fName && { error: true, helperText: errors.fName })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                name="lName"
                onChange={handleChange}
                type="text"
                size="small"
                value={user.lName}
                {...(errors.lName && { error: true, helperText: errors.lName })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel>Role</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  row
                  required
                  {...(errors.role && { error: true })}
                >
                  <FormControlLabel
                    value="vendor"
                    control={<Radio />}
                    label="Vendor"
                  />
                  <FormControlLabel
                    value="customer"
                    control={<Radio />}
                    label="Customer"
                  />
                </RadioGroup>
                {errors.role && (
                  <FormHelperText style={{ color: "red", fontSize: "12px" }}>
                    {errors.role}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
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
                fullWidth
                name="phoneNo"
                onChange={handleChange}
                type="number"
                label="Phone number"
                size="small"
                value={user.phoneNo}
                {...(errors.phoneNo && {
                  error: true,
                  helperText: errors.phoneNo,
                })}
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="password"
                autoComplete="new-password"
                name="confirmPassword"
                onChange={handleChange}
                label="Comfirm Password"
                size="small"
                value={user.confirmPassword}
                {...(errors.confirmPassword && {
                  error: true,
                  helperText: errors.confirmPassword,
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
            onClick={handleRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
              {/* <Link to="/">
                Already have an account? Sign in
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default Register;
