import { makeStyles } from "@material-ui/core/styles";
import ColorsTheme from "../../../assets/colors";

const useStyles = makeStyles((theme) => ({
    PaperSize: {
        padding: 40,
    },
    BtnSave: {
        backgroundColor: ColorsTheme.dodgerBlue,
        "&:hover": {
            backgroundColor: ColorsTheme.blueCrayola,
        },
        marginTop: 30,
        float: 'right',
    },
    BtnBack: {
        backgroundColor: ColorsTheme.dodgerBlue,
        "&:hover": {
            backgroundColor: ColorsTheme.blueCrayola,
        },
        marginTop: 30,
        float: 'left',
    },
}));

export default useStyles;