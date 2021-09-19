import { makeStyles } from "@material-ui/core/styles";
import ColorsTheme from "../assets/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: ColorsTheme.cultured,
  },
  wrapper: {
    [theme.breakpoints.down('sm')]: {
      display: "inline",
      marginLeft: theme.spacing(6)
    },
    [theme.breakpoints.up('md')]: {

      display: "flex"
    },
  },
  appBar: {
    backgroundColor: ColorsTheme.white,
    zIndex: theme.zIndex.drawer - 1,
    marginLeft: "30em",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  imgToolbar: {
    width: "100%",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflowX: 'hidden',
  },
  pageTitle: {
    fontSize: "1.15em",
    marginLeft: "1em",
  },
  footer: {
    marginTop: "auto",
    padding: "0.75em 1em",
    width: "100%",
    backgroundColor: ColorsTheme.white, //make relative instead of absolute
  },
  footerLeft: {
    display: "flex",
    [theme.breakpoints.down('sm')]: {
      justifyContent: "center",
      textAlign: "center"
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: "start"
    },
  },
  footerRight: {
    display: "flex",
    [theme.breakpoints.down('sm')]: {
      justifyContent: "center",
      textAlign: "center"
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: "end"
    },
  },
  titleSectionSpan: {
    color: ColorsTheme.pacificBlue,
  },
}));

export default useStyles;
