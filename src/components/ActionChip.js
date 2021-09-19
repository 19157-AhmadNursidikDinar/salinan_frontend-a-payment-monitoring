import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import ColorsTheme from '../assets/colors';

const useStyles = makeStyles({
    greenChip: {
        backgroundColor: ColorsTheme.greenPantone,
        color: ColorsTheme.white,
        fontWeight: "bold",
    },
    redChip: {
        backgroundColor: ColorsTheme.tartOrange,
        color: ColorsTheme.white,
        fontWeight: "bold",
    },
    blueChip: {
        backgroundColor: ColorsTheme.tuftsBlue,
        color: ColorsTheme.white,
        fontWeight: "bold",
    },
    greyChip: {
        backgroundColor: ColorsTheme.grayWeb,
        fontWeight: "bold",
    },
});

export default function RedChip({ label = "", color = 'grey' }) {
    const classes = useStyles();

    const getChipStyle = (mColor) => {
        if (mColor === "red") {
            return classes.redChip;
        }
        if (mColor === "green") {
            return classes.greenChip;
        }
        if (mColor === "blue") {
            return classes.blueChip;
        }
        return classes.greyChip;
    }

    return (
        <div>
            <Chip
                label={label}
                className={getChipStyle(color)}
            />
        </div>
    )
}
