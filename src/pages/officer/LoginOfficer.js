import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";

import ColorsTheme from "../../assets/colors";
import Logo from "../../assets/images/logoPM.png";
import BankerLogo from "../../assets/images/Banker.png";
import Circle from "../../assets/images/elipse.png";
import useStyles from "../../styles/LoginPage";

const BlueCheckbox = withStyles({
  root: {
    color: ColorsTheme.blueJeans,
    "&$checked": {
      color: ColorsTheme.bleuDeFrance,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function LoginOfficer(props) {
  const classes = useStyles();
  const [rememberMe, setRememberMe] = useState(false);
  const [signInAs, setSignInAs] = useState("generalSupport");

  const handleChange = (Event) => {
    setRememberMe({ ...rememberMe, [Event.target.name]: Event.target.checked });
  };

  const signInClick = () => {
    signInAs === "admin" && props.history.push("/admin");
    signInAs === "generalSupport" && props.history.push("/general-support");
    signInAs === "accounting" && props.history.push("/accounting");
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftSide}>
        <div className={classes.boxContainer}>
          <div className={classes.flexCenter}>
            <div className={classes.headerLogo}>
              <img src={Logo} alt="app-logo" className={classes.headLogo} />
              <h1 className={classes.titleSection}>
                Pay<span className={classes.titleSectionSpan}>ment</span> <br /> Monitoring
              </h1>
            </div>
          </div>
          <h3 className={classes.txtSignIn}>Sign in to continue our application </h3>
          <div className={classes.innerBox}>
            <div className={classes.userAndPass}>
              <div className={classes.wrappedTxtFieldOfficer}>
                <TextField
                  className="txtfield"
                  id="txtUser"
                  type="text"
                  placeholder="Username"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon style={{ color: ColorsTheme.cyanProcess }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={classes.wrappedTxtFieldOfficer}>
                <TextField
                  className="txtfield"
                  id="txtPass"
                  type="password"
                  placeholder="Password"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: ColorsTheme.cyanProcess }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Login As
                </InputLabel>
                <Select
                  native
                  onChange={(e) => {
                    setSignInAs(e.target.value);
                  }}
                  label="Login As"
                  inputProps={{
                    shrink: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: ColorsTheme.cyanProcess }} />
                      </InputAdornment>
                    ),
                  }}
                  value={signInAs || ''}
                >
                  <option value="generalSupport">General Support</option>
                  <option value="accounting">Accounting</option>
                  <option value="admin">Admin</option>
                </Select>
              </FormControl>
            </div>
            <div className={classes.wrappedRememberMe}>
              <FormControlLabel
                control={
                  <BlueCheckbox
                    checked={rememberMe.checkedRemember}
                    onChange={handleChange}
                    name="checkedRemember"
                  />
                }
                label="Remember Me"
              />
            </div>
            <div className={classes.wrappedSignIn} fullWidth>
              <Button className={classes.btnSignIn} onClick={signInClick} fullWidth>
                <b className={classes.btnSignInBold}>Sign In</b>
              </Button>
            </div>
            <div
              style={{
                marginTop: 20,
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Link className={classes.switchSignIn} to="/">Sign In as Customer</Link>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.rightSide}>
        <div className={classes.welcomeTitle}>
          <h1 className={classes.welcome}>WELCOME BACK,</h1>
          <h2 className={classes.textNotice}>Make your payment efficiently</h2>
        </div>
        <div className={classes.img}>
          <img className={classes.circledImage} src={Circle} alt="Round.png" />
          <img className={classes.bankerImage} src={BankerLogo} alt="BankerLogo" />
        </div>
      </div>
    </div>
  );
}
