import { makeStyles } from "@material-ui/core/styles";
import ColorsTheme from "../../../assets/colors";

const useStyles = makeStyles((theme) => ({
  PaperSize: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  BtnSave: {
    backgroundColor: ColorsTheme.dodgerBlue,
    "&:hover": {
      backgroundColor: ColorsTheme.blueCrayola,
    },
    marginTop: 30,
    marginRight: theme.spacing(2),
    float: "right",
  },
  BtnBack: {
    backgroundColor: ColorsTheme.dodgerBlue,
    "&:hover": {
      backgroundColor: ColorsTheme.blueCrayola,
    },
    marginTop: 30,
    marginLeft: theme.spacing(2),
    float: "left",
  },
  alert: {
    margin: "1em 0",
  },
}));

export default useStyles;
