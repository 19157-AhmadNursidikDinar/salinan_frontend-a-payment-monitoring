import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { blue } from "@material-ui/core/colors";
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

import "../../styles/LoginOfficer.css";

import Logo from "../../assets/logoPM.png";
import BankerLogo from "../../assets/Banker.png";
import Circle from "../../assets/elipse.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";

const BlueCheckbox = withStyles({
  root: {
    color: blue[300],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "white",
    },
  },

  textField: {
    margin: theme.spacing(1),
    minWidth: "100%",
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "white",
    },
  },

  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  button: {
    background: "linear-gradient(45deg, #15AAD9 30%, #7EE0FF 90%)",
    border: 0,
    borderRadius: 5,
    boxShadow: "0 3px 5px 2px white",
    color: "white",
    height: 40,
    width: 300,
    padding: "0 30px",
  },
}));

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Insert username!"),
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
    <div className="container">
      <div className="left">
        <div className="box-container">
          <div className="flex-center">
            <div className="header-logo">
              <img src={Logo} alt="app-logo" className="head-logo" />
              <h1 className="title-section">
                Pay<span>ment</span> <br /> Monitoring
              </h1>
            </div>
          </div>
          <h3 className="common-text">Sign in to continue our application </h3>
          <div className="inner-box">
            <form onSubmit={formik.handleSubmit}>
              <div className="user-and-pass">
                <div className={classes.textField}>
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
                          <PersonIcon style={{ color: "#2EB7E2" }} />
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
                <div className={classes.textField}>
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
                          <LockIcon style={{ color: "#2EB7E2" }} />
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
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Login As
                  </InputLabel>
                  <Select
                    native
                    // onChange={(e) => {
                    //   setSignInAs(e.target.value);
                    // }}
                    label="Login As"
                    inputProps={{
                      shrink: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon style={{ color: "#2EB7E2" }} />
                        </InputAdornment>
                      ),
                    }}
                    // value={signInAs || ""}
                  >
                    <option value="generalSupport">General Support</option>
                    <option value="accounting">Accounting</option>
                    <option value="admin">Admin</option>
                  </Select>
                </FormControl>
              </div>
              <div className="rememberMe-wrap">
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
              <div className="wrapped-signin">
                <Button
                  className={
                    formik.isSubmitting ? "btn-signIn-loading" : "btn-signIn"
                  }
                  fullWidth
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  <b>{formik.isSubmitting ? "Loading..." : "Sign In"}</b>
                </Button>
              </div>
              <div
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Link className="switch-signin" to="/">
                  Sign In as Customer
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="right-side">
        <div className="welcome-title">
          <h1 className="welcome">WELCOME BACK,</h1>
          <h2 className="text-notice">Make your payment efficiently</h2>
        </div>
        <div className="img">
          <img className="circled-image" src={Circle} alt="Round.png" />
          <img className="banker-image" src={BankerLogo} alt="BankerLogo" />
        </div>
      </div>
    </div>
  );
}
