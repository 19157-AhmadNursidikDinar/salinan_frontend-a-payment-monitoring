import React from "react";
import Grid from "@material-ui/core/Grid";

//style
import Logo from "../../assets/images/logoPM.png";
import useStyles from "../../styles/PageNotFound";

export default function AccessForbiden() {
  const classes = useStyles();
  return (
    <Grid className={classes.content} container justify="center">
      <img src={Logo} alt="error-logo" className={classes.imageError} />
      <h1 className={classes.descError}>
        ERROR 403
        <p className={classes.textError}>ACCESS FORBIDDEN</p>
      </h1>
    </Grid>
  );
}
