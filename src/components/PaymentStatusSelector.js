import React, { useState, Fragment } from "react";
// Material ui core
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  TableRow,
} from "@material-ui/core";

import MuiTableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import useStyles from "../styles/customer/HasilFormPayment";

const TableCell = withStyles((theme) => ({
  root: {
    borderBottom: "none",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "18px",
    },
  },
}))(MuiTableCell);

function PaymentStatusSelector() {
  const classes = useStyles();
  const [status, setStatus] = useState("null");

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            fullWidth
            size="small"
          >
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="null">-Ubah Status-</MenuItem>
              <MenuItem value="accept">Accept</MenuItem>
              <MenuItem value="reject">Reject</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      </TableRow>

      {status === "reject" ? (
        <TableRow>
          <TableCell>Alasan</TableCell>
          <TableCell>:</TableCell>
          <TableCell>
            <TextField
              multiline
              maxRows={6}
              minRows={4}
              variant="outlined"
              fullWidth
              size="small"
            />
          </TableCell>
        </TableRow>
      ) : (
        <TableCell> </TableCell>
      )}
    </Fragment>
  );
}

export default PaymentStatusSelector;
