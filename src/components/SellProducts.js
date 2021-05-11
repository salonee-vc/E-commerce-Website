import React, { useState } from "react";
import ModalComp from "./ModalComp";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function SellProducts() {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>Sell Product Page</div>
      <div>Your Products List</div>
      <button onClick={handleOpen}>Add Product</button>
      <ModalComp open={open} handleOpen={handleOpen} handleClose={handleClose}>
        <div>message here</div>
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
                // onChange={handleChange}
                type="email"
                size="small"
                // value={user.email} 
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={handleLogin}
          >
            ADD
          </Button>
        </form>
      </ModalComp>
    </div>
  );
}

export default SellProducts;
