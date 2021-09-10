
import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/ChevronLeft";
import ContentContainer from "../../../components/ContentContainer";
import PaymentStatusSelector from "../../../components/PaymentStatusSelector";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    paddingBottom: "1em",
  },
  paper: {
    padding: "1em",
  },
  tableContainer: {
    display: "flex", justifyContent: "center"
  },
  centerCell: {
    padding: "0.5em 1em"
  }
});


function PaymentRequestDetail() {
  const classes = useStyles();

  return (
    <ContentContainer role="generalSupport">
      <div
        className={classes.root}
      >
        <Typography variant="h5">Payment Request</Typography>
      </div>
      <Paper
        className={classes.paper}>
        <div
          className={classes.tableContainer}>
          <table>
            <tbody>
              <tr>
                <td>Diminta oleh</td>
                <td
                  className={classes.centerCell}>:</td>
                <td>Asep Sunandar</td>
              </tr>
              <PaymentStatusSelector />
            </tbody>
          </table>
        </div>
        <div>
          <Button startIcon={<BackIcon />} variant="contained" color="primary">
            Kembali
          </Button>
        </div>
      </Paper>
    </ContentContainer>
  );
}

export default PaymentRequestDetail;