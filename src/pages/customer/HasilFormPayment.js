import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import MuiTableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import ContentContainer from "../../components/ContentContainer";
import useStyles from "../../styles/HasilFormPayement";

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    fontSize: "18px",
    fontWeight: 600,
  },
})(MuiTableCell);



const createData = (description, value) => {
  return { description, value };
};

const rows = [
  createData("Diminta Oleh", "Asep Sunandar"),
  createData("Keperluan Payment", "SPP Juli 2020"),
  createData("Tanggal Pembayaran", "Sabtu, 10 Juli 2020"),
  createData("Jumlah Payment", "Rp. 1.000.000"),
  createData("Terbilang", "Satu juta rupiah"),
  createData("Nama Rek. / Penerima", "MD. Mubarokul Huda"),
  createData("No. Rekening Penerima", "15000757050"),
  createData("Request Terkirim", "Jum’at, 9 Juli 2021 (09.00 PM)"),
  createData("Status Request", "Diteruskan ke Accounting"),
];

function HasilFormPayment(props) {
  const classes = useStyles();

  const handleClickNewPayment = () => {
    props.history.push("/add-payment-request");
  }

  const handleClickGoBack = () => {
    props.history.goBack();
  }

  return (
    <ContentContainer role="customer" selectedMenu={props.location.state.from}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingBottom: "2em",
        }}
      >
        <Typography variant="h4">Hasil Payment Request</Typography>
      </div>
      <div className={classes.root}>
        <Card className={classes.cardRequest}>
          <Container fixed>
            <CardContent>
              <TableContainer className={classes.table}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.description}</TableCell>
                        <TableCell align="center">:</TableCell>
                        {row.description === "Status Request" ? (
                          <TableCell>
                            <span
                              style={{
                                backgroundColor: "#5DEFC3",
                                borderRadius: 8,
                                padding: 6,
                              }}
                            >
                              {row.value}
                            </span>
                          </TableCell>
                        ) : (
                          <TableCell>{row.value}</TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Container>
          <CardActions className={classes.cardActions}>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonAction}
              onClick={handleClickGoBack}
              startIcon={<ArrowBackIosIcon />}
            >
              Kembali
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonAction}
              endIcon={<ArrowForwardIosIcon />}
              onClick={handleClickNewPayment}
            >
              Buat Payment Request Baru 
            </Button>
          </CardActions>
        </Card>
      </div>
    </ContentContainer>
  );
}

export default HasilFormPayment;
