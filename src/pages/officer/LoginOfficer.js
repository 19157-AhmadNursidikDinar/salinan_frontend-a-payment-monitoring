import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

import InputAdornment from "@material-ui/core/InputAdornment";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import GroupIcon from "@material-ui/icons/Group";

import ColorsTheme from "../../assets/colors";
import Logo from "../../assets/images/logoPM.png";
import BankerLogo from "../../assets/images/Banker.png";
import Circle from "../../assets/images/elipse.png";
import useStyles from "../../styles/LoginPage";

import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";

const BlueCheckbox = withStyles({
  root: {
    color: ColorsTheme.blueJeans,
    "&$checked": {
      color: ColorsTheme.bleuDeFrance,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Insert username"),
  loginAs: Yup.string().required("Insert role"),
  password: Yup.string()
    .min(6, "Use combination of 6 character or more")
    .required("Insert Password"),
  rememberMe: Yup.boolean(),
});

export default function LoginOfficer(props) {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      loginAs: "generalSupport",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ username, password, rememberMe }) => {
      const result = await AuthService.login({
        username,
        password,
        rememberMe,
      });
      // console.log({ result });
      if (!Boolean(result.error)) {
        const role = AuthService.getUserRole();
        if (role === "ADMIN") {
          props.history.push("/admin");
        } else if (role === "GENERAL-SUPPORT") {
          props.history.push("/general-support");
        } else if (role === "ACCOUNTING") {
          props.history.push("/accounting");
        } else if (role === "USER") {
          props.history.push("/customer");
        } else {
          setErrorMsg("undefined role");
        }
      } else {
        setErrorMsg(result.error.response.data.msg);
      }
    },
  });

  return (
    <div className={classes.container}>
      <div className={classes.leftSide}>
        <div className={classes.boxContainer}>
          <div className={classes.flexCenter}>
            <div className={classes.headerLogo}>
              <img src={Logo} alt="app-logo" className={classes.headLogo} />
              <h1 className={classes.titleSection}>
                Pay<span className={classes.titleSectionSpan}>ment</span> <br />{" "}
                Monitoring
              </h1>
            </div>
          </div>
          <h3 className={classes.txtSignIn}>
            Sign in to continue our application{" "}
          </h3>
          <div className={classes.innerBox}>
            {errorMsg && (
              <Alert severity="error" style={{ margin: "0.5em 0" }}>
                {errorMsg}
              </Alert>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className={classes.userAndPass}>
                <div className={classes.wrappedTxtFieldOfficer}>
                  <TextField
                    className="txtfield"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon
                            style={{ color: ColorsTheme.cyanProcess }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    disabled={formik.isSubmitting}
                    error={
                      Boolean(formik.errors.username) && formik.touched.username
                    }
                    helperText={formik.errors.username}
                  />
                </div>
                <div className={classes.wrappedTxtFieldOfficer}>
                  <TextField
                    name="password"
                    className="txtfield"
                    type="password"
                    placeholder="Password"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon
                            style={{ color: ColorsTheme.cyanProcess }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    error={
                      Boolean(formik.errors.password) && formik.touched.password
                    }
                    helperText={formik.errors.password}
                  />
                </div>
                <div className={classes.wrappedTxtFieldOfficer}>
                  <TextField
                    id="standard-select"
                    select
                    value={formik.loginAs || "generalSupport"}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GroupIcon
                            style={{ color: ColorsTheme.cyanProcess }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="generalSupport">General Support</MenuItem>
                    <MenuItem value="accounting">Accounting</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </TextField>
                </div>
              </div>
              <div className={classes.wrappedRememberMe}>
                <FormControlLabel
                  control={
                    <BlueCheckbox
                      name="rememberMe"
                      checked={formik.values.rememberMe}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                    />
                  }
                  label="Remember Me"
                />
              </div>
              <div className={classes.wrappedSignIn} fullWidth>
                <Button
                  className={
                    formik.isSubmitting
                      ? classes.btnSignInLoading
                      : classes.btnSignIn
                  }
                  fullWidth
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  <b className={classes.btnSignInBold}>
                    {formik.isSubmitting ? "Loading..." : "Sign In"}
                  </b>
                </Button>
              </div>
              <div
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Link className={classes.switchSignIn} to="/">
                  Sign In as Customer
                </Link>
              </div>
            </form>
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
          <img
            className={classes.bankerImage}
            src={BankerLogo}
            alt="BankerLogo"
          />
        </div>
      </div>
    </div>
  );
}
