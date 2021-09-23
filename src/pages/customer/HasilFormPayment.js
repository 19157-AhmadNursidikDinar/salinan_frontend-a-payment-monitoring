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

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ContentContainer from "../../components/ContentContainer";
import useStyles from "../../styles/customer/HasilFormPayment";

import Chip from "../../components/ActionChip";

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

const convertActionToChipColor = (action) => {
  let result = "grey";
  if (["Rejected by Accounting", "Rejected by GS"].includes(
    action)) {
    result = "red"
  } else if (action === "Disetujui") {
    result = "green"

  } else if (action === "Menunggu Konfirmasi") {
    result = "blue"
  }
  return result;
}


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
  createData("Status Request", "Menunggu Konfirmasi"),
];

function HasilFormPayment(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
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
                <Table className={classes.table} aria-label="simple table" size='small'>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.description}</TableCell>
                        <TableCell align="center">:</TableCell>
                        {row.description === "Status Request" ? (
                          <TableCell>
                <Chip
                  label={row.value}
                  color={
                    convertActionToChipColor(row.value)
                  }
                />
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
            <Button size="small"
              variant="contained"
              color="primary"
              className={classes.buttonAction}
              onClick={handleClickGoBack}
              startIcon={<ArrowBackIosIcon />}
            >
              Back
            </Button>
            <Button size="small"
              variant="contained"
              color="primary"
              className={classes.buttonAction}
              endIcon={<ArrowForwardIosIcon />}
              onClick={handleClickNewPayment}
            > {matches ? 'New' : 'New Payment Request'}
              
            </Button>
          </CardActions>
        </Card>
      </div>
    </ContentContainer>
  );
}

export default HasilFormPayment;
