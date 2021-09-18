import { makeStyles } from "@material-ui/core/styles";
import ColorsTheme from "../../assets/colors";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: "28px",
  },
  pos: {
    marginBottom: 12,
  },

  cardRequest: {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
  },

  cardActions: {
    margin: 24,
    display: "flex",
    justifyContent: "space-between",
  },

  buttonAction: {
    backgroundColor: ColorsTheme.dodgerBlue,
    "&:hover": {
      backgroundColor: ColorsTheme.blueCrayola,
    },
    color: ColorsTheme.white,
    fontWeight: 600,
    fontSize: 14,
  },

  table: {
    borderBottom: "none",
  },
});


export default useStyles;