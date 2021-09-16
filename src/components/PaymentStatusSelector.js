import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1,0),
        minWidth: 230,
    },
    centerCell: {
        padding: "0.8em 3em"
    },

}));

export default function PaymentStatusSelector() {
    const classes = useStyles();
    const [status, setStatus] = useState('null');

    return (
        <>
            <tr>
                <td>Status Request</td>
                <td
                    className={classes.centerCell}>:</td>
                <td>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="null">-Ubah Status-</MenuItem>
                            <MenuItem value="accept">Accept</MenuItem>
                            <MenuItem value="reject">Reject</MenuItem>
                        </Select>
                    </FormControl>
                </td>
            </tr>
            {status === "reject" && (<tr>
                <td>Alasan</td>
                <td
                    className={classes.centerCell}>:</td>
                <td>
                    <TextField
                        // label="Multiline"
                        multiline
                        maxRows={6}
                        minRows={4}
                        variant="outlined"
                        className={classes.formControl}
                    /> 
                </td>
            </tr>)}
            
        </>
       
    )
}