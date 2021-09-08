import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
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

export default function LoginCustomer(props) {
  const signInClick = () => {
    console.log("test");
    props.history.push("/customer");
  };

  const [RememberMe, SetRememberMe] = useState({ checkedRemember: false });
  
  const handleChange = (Event) => {
    SetRememberMe({ ...RememberMe, [Event.target.name]: Event.target.checked });
  };

  return (
    <div className="container">
      <div class="left-side">
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
            <div className="user-pass">
              <div className="wrapped-txtfield">
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
                        <PersonIcon style={{ color: "#2EB7E2" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="wrapped-txtfield">
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
                        <LockIcon style={{ color: "#2EB7E2" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="wrapped-rememberMe">
                <FormControlLabel
                  control={
                    <BlueCheckbox
                      checked={RememberMe.checkedRemember}
                      onChange={handleChange}
                      name="checkedRemember"
                    />
                  }
                  label="Remember Me"
                />
              </div>
              <div className="wrapped-signin">
                
              <Button className="btn-signIn" onClick={signInClick} 
                  fullWidth><b>Sign In</b></Button>
              </div>
              
            <div style={{marginTop:20, justifyContent:'center', display:'flex'}}><Link className="switch-signin" to="/login-officer">Sign In as Officer</Link></div>
            </div>
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
