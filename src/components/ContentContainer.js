import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import { FaEdit } from "react-icons/fa";

import logo from "../assets/images/logo.svg";
import ColorsTheme from "../assets/colors";
import useStyles from "../styles/ContentContainer";
import SignOutDialog from "./dialogs/SignOutDialog";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";

const menuItems = {
  customer: [
    { label: "Beranda", icon: <HomeIcon />, link: "/customer" },
    {
      label: "Payment Request",
      icon: <FaEdit style={{ fontSize: "1.4em", marginLeft: "0.2em" }} />,
      link: "/add-payment-request",
    },
  ],
  admin: [
    { label: "Beranda", icon: <HomeIcon />, link: "/admin" },
    {
      label: "Daftar Kantor Cabang",
      icon: <BusinessIcon />,
      link: "/branch-office-list",
    },
    {
      label: "Service Lvl Agreement",
      icon: <FaEdit style={{ fontSize: "1.4em", marginLeft: "0.2em" }} />,
      link: "/service-level-agreement",
    },
  ],
  accounting: [{ label: "Beranda", icon: <HomeIcon />, link: "/accounting" }],
  generalSupport: [
    { label: "Beranda", icon: <HomeIcon />, link: "/general-support" },
  ],
};

export default function MiniDrawer({
  children,
  role = "customer",
  selectedMenu = "Beranda",
}) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleLogoutClick = () => {
    AuthService.logout();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          elevation={0}
        >
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                style={{ marginLeft: !open && "2.8em" }}
              >
                <MenuIcon />
              </IconButton>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          PaperProps={{ elevation: 5 }}
        >
          <div className={classes.toolbar}>
            <img src={logo} alt="logo" />
            <span className={classes.pageTitle}>Payment Monitoring</span>
          </div>
          <Divider />
          <List>
            {menuItems[role].map(({ label, icon, link }) => (
              <Link to={link} key={label}>
                <ListItem
                  button
                  key={label}
                  style={{
                    borderRight:
                      selectedMenu === label && "solid #2196f3 0.3em",
                    backgroundColor:
                      selectedMenu === label && ColorsTheme.aliceBlue,
                    color: ColorsTheme.dimGray,
                  }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              </Link>
            ))}
            <SignOutDialog handleConfirm={handleLogoutClick} />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
      <div className={classes.footer}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <span style={{ marginLeft: open ? "240px" : "80px" }}>
            Copyright © 2021 Payment Monitoring
          </span>
          <span> Version {process.env.REACT_APP_VERSION}</span>
        </Grid>
      </div>
    </div>
  );
}
