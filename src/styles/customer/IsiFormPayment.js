import { makeStyles } from "@material-ui/core/styles";
import ColorsTheme from "../../assets/colors";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: ColorsTheme.dodgerBlue,
        "&:hover": {
            backgroundColor: ColorsTheme.blueCrayola,
        },
        margin: theme.spacing(1),
        float: "right",
    },
    PaperSize: {
        padding: 40,
    },
}));

export default useStyles;