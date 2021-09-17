import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { blue, red, green, grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
    greenChip: {
        backgroundColor: green[500],
        color: "#fff",
        fontWeight: "bold",
    },
    redChip: {
        backgroundColor: red[500],
        color: "#fff",
        fontWeight: "bold",
    },
    blueChip: {
        backgroundColor: blue[500],
        color: "#fff",
        fontWeight: "bold",
    },
    greyChip: {
        backgroundColor: grey[500],
        color: "#fff",
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
