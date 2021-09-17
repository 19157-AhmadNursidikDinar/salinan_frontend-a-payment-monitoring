import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/ChevronLeft";
import ContentContainer from "../../../components/ContentContainer";
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
              <tr>
                <td>Keperluan Payment</td>
                <td style={{ padding: "0.5em 1em" }}>:</td>
                <td>SPP Juli 2020</td>
              </tr>
              <tr>
                <td>Tanggal Pembayaran</td>
                <td
                  className={classes.centerCell}>:</td>
                <td>Sabtu, 10 Juli 2021</td>
              </tr>
              <tr>
                <td>Jumlah Payment</td>
                <td
                  className={classes.centerCell}>:</td>
                <td>Rp 1.000.000</td>
              </tr>
              <tr>
                <td>Terbilang</td>
                <td
                  className={classes.centerCell}>:</td>
                <td>Satu juta Rupiah</td>
              </tr>
              <tr>
                <td>Nama Rek. Penerima</td>
                <td
                  className={classes.centerCell}>:</td>
                <td>MD Mubarokul Huda</td>
              </tr>
              <tr>
                <td>No Rek. Penerima</td>
                <td
                  className={classes.centerCell}>:</td>
                <td>15000757050</td>
              </tr>
              <tr>
                <td>Request Terkirim</td>
                <td
                  className={classes.centerCell}>:</td>
                <td>Jum'at, 9 Juli 2021 (09.00 PM)</td>
              </tr>
              <tr>
                <td>Status Request</td>
                <td
                  className={classes.centerCell}>:</td>
                <td>Menunggu konfirmasi general support</td>
              </tr>
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
