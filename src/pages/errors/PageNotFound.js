import React from "react";
import { Grid } from "@material-ui/core";

//style
import Logo from "../../assets/images/logoPM.png";
import useStyles from "../../styles/PageNotFound";

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <Grid className={classes.content} container justify="center">
      <img src={Logo} alt="error-logo" className={classes.imageError} />
      <h1 className={classes.descError}>
        ERROR 404 - PAGE NOT FOUND
        <p className={classes.textError}>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
      </h1>
    </Grid>
  );
}
