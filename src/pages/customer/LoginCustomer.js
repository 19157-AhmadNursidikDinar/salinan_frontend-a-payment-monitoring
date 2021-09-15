import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import InputAdornment from "@material-ui/core/InputAdornment";
//import @material-ui/icons for icon username, password dan checkbox rememberMe
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
//import css and assets
import Logo from "../../assets/logoPM.png";
import BankerLogo from "../../assets/Banker.png";
import Circle from "../../assets/elipse.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";
import "../../styles/LoginCustomer.css";

const BlueCheckbox = withStyles({
  root: {
    color: blue[300],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Insert username!"),
  password: Yup.string()
    .min(6, "Use combination of 6 character or more")
    .required("Insert Password"),
  rememberMe: Yup.boolean(),
});

export default function LoginCustomer(props) {
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
      // console.log(values);
      const result = await AuthService.login({
        username,
        password,
        rememberMe,
      });
      console.log({ result });
      if (!Boolean(result.error)) {
        props.history.push("/customer");
      } else {
        setErrorMsg(result.error.response.data.msg);
      }
    },
  });

  return (
    <div className="container">
      <div className="left-side">
        <div className="box-cont">
          <div className="flex-center">
            <div className="header-logo">
              <img src={Logo} alt="app-logo" className="head-logo" />
              <h1 className="title-section">
                Pay<span>ment</span> <br /> Monitoring
              </h1>
            </div>
          </div>
          <h3 className="txt-signIn">Sign in to continue our application</h3>
          <div className="inside-box">
            {errorMsg && (
              <Alert severity="error" style={{ margin: "0.5em 0" }}>
                {errorMsg}
              </Alert>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className="user-pass">
                <div className="wrapped-txtfield">
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
                <div className="wrapped-txtfield">
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
                <div className="wrapped-rememberMe">
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
                  <Button className="btn-signIn" fullWidth type="submit">
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
                  <Link className="switch-signin" to="/login-officer">
                    Sign In as Officer
                  </Link>
                </div>
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
