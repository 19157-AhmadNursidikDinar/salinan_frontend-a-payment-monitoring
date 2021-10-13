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
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
    },
    RequestDetail: {
        marginTop: 21,
    },
    ResultAlert: {
        margin: '0 1.5em 1.5em 1.5em',
    },
    DisabledField: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: ColorsTheme.black
        }
    }
}));

export default useStyles;