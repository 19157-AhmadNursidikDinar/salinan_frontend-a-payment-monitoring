import React from "react";
import Grid from "@material-ui/core/Grid";
import AuthToken from "../../utils/auth-token";

//style
import Logo from "../../assets/images/logoPM.png";
import useStyles from "../../styles/PageNotFound";

export default function AccessUnauthorized() {
  const classes = useStyles();
  React.useEffect(() => {
    AuthToken.removeToken();
  }, []);

  return (
    <Grid className={classes.content} container justify="center">
      <img src={Logo} alt="error-logo" className={classes.imageError} />
      <h1 className={classes.descError}>
        ERROR 401
        <p className={classes.textError}>ACCESS UNAUTHORIZED</p>
      </h1>
    </Grid>
  );
}
