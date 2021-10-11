import React, {Fragment} from "react";
// Material ui core
import {
    FormControl,
    MenuItem,
    Select,
    TextField,
    TableRow,
    FormHelperText
} from "@material-ui/core";

import MuiTableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import useStyles from "../styles/customer/HasilFormPayment";

const TableCell = withStyles((theme) => ({
    root: {
        borderBottom: "none",
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
            fontSize: "12px",
        },
        [theme.breakpoints.up('md')]: {
            fontSize: "18px",
        },
    },
}))(MuiTableCell);

function PaymentStatusSelector({ formik }) {
    const classes = useStyles();

    return (
        <Fragment>
            <TableRow>
                <TableCell>
                    Update Status Request
                </TableCell>
                <TableCell align="center">:</TableCell>
                <TableCell>
                    <FormControl
                        variant="outlined"
                        fullWidth size="small"
                        className={classes.formControl}
                        error={
                            Boolean(formik.errors.stage) && formik.touched.stage
                        }>
                        <Select
                            name="stage"
                            value={formik.values.stage}
                            onChange={formik.handleChange}
                            disabled={formik.isSubmitting}
                        >
                            <MenuItem value="null">-Ubah Status-</MenuItem>
                            <MenuItem value="accept">Accept</MenuItem>
                            <MenuItem value="reject">Reject</MenuItem>
                        </Select>
                        {Boolean(formik.errors.stage) && formik.touched.stage && (
                            <FormHelperText>{formik.errors.stage}</FormHelperText>
                        )}
                    </FormControl>
                </TableCell>
            </TableRow>
            {formik.values.stage === "reject" ? (
                <TableRow>
                    <TableCell>Alasan</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>
                        <TextField
                            name="reason"
                            multiline
                            maxRows={6}
                            minRows={4}
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={formik.values.reason}
                            disabled={formik.isSubmitting}
                            onChange={formik.handleChange}
                            error={
                                Boolean(formik.errors.reason) && formik.touched.reason
                            }
                            helperText={formik.errors.reason} />
                    </TableCell>
                </TableRow>
            ) : (
                <TableCell> </TableCell>
            )}
        </Fragment>
    )
}


export default PaymentStatusSelector