import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
    greenChip: {
        backgroundColor: "#4caf50",
        color: "#fff",
        fontWeight: "bold",
    },
    redChip: {
        backgroundColor: "#f44336",
        color: "#fff",
        fontWeight: "bold",
    },
    blueChip: {
        backgroundColor: "#2196f3",
        color: "#fff",
        fontWeight: "bold",
    },
    greyChip: {
        backgroundColor: "grey",
        fontWeight: "bold",
    },
});

export default function RedChip({ label = "", color = 'grey' }) {
    const classes = useStyles();
    return (
        <div>
            <Chip
                label={label}
                className={color === "red"
                    ? classes.redChip : color === "green"
                        ? classes.greenChip
                        : color === "blue"
                            ? classes.blueChip
                            : classes.greyChip
                }
            />
        </div>
    )
}
