import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Alert from "@material-ui/lab/Alert";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import MuiTableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useStyles from "../styles/customer/HasilFormPayment";
import Chip from "./ActionChip";
import moment from "moment";
import NumberFormat from "react-number-format";

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

const convertActionToChipColor = (action) => {
  let result = "grey";
  if (["Rejected by Accounting", "Rejected by GS"].includes(action)) {
    result = "red";
  } else if (action === "Disetujui") {
    result = "green";
  } else if (action === "Menunggu Konfirmasi") {
    result = "blue";
  }
  return result;
};

const MTableRow = ({ label, value }) => {
  return (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell align="center">:</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
};

function HasilFormPayment({ formValues, resetFormValues }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  let dt = moment(formValues.payment_date);
  let formattedDate = dt.format('DD MMMM YYYY')
  const handleClickNewPayment = () => {
    resetFormValues();
  };
  const CurrencyFormat = () => {
    return (
      <NumberFormat
        value={formValues?.amount}
        prefix="Rp "
        suffix=",00"
        thousandSeparator="."
        decimalSeparator=","
        displayType="text"
        allowNegative={true} />
    )
  }

  return (
    <>
      <Alert severity="success" style={{ margin: "1em 0" }}>
        Payment request berhasil dibuat!
      </Alert>
      <Card className={classes.cardRequest}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "2em 0",
          }}
        >
          <Typography variant="h4">Detail Payment Request</Typography>
        </div>
        <Container fixed>
          <CardContent>
            <TableContainer className={classes.table}>
              <Table
                className={classes.table}
                aria-label="simple table"
                size="small"
              >
                <TableBody>
                  <MTableRow
                    label="Diminta Oleh"
                    value={formValues?.customer_name || ""}
                  />
                  <MTableRow
                    label="Keperluan Payment"
                    value={formValues?.request || ""}
                  />
                  <MTableRow
                    label="Tanggal Pembayaran"
                    value={formattedDate || ""}
                  />
                  <MTableRow
                    label="Jumlah Payment"
                    value={CurrencyFormat(formValues?.amount)}
                  />
                  <MTableRow
                    label="Terbilang"
                    value={formValues?.amount_counted || ""}
                  />
                  <MTableRow
                    label="Nama Rek. / Penerima"
                    value={formValues?.account_name || ""}
                  />
                  <MTableRow
                    label="No. Rekening Penerima"
                    value={formValues?.account_number || ""}
                  />
                  <TableRow>
                    <TableCell>Status Request</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>
                      <Chip
                        label="Menunggu Konfirmasi"
                        color={convertActionToChipColor("Menunggu Konfirmasi")}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Container>
        <CardActions className={classes.cardActions}>
          <Grid container justifyContent="flex-end">
            <Button
              size="small"
              variant="contained"
              color="primary"
              className={classes.buttonAction}
              endIcon={<ArrowForwardIosIcon />}
              onClick={handleClickNewPayment}
            >
              {" "}
              {matches ? "New" : "New Payment Request"}
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}

export default HasilFormPayment;
