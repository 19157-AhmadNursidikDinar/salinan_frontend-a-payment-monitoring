import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NumberFormat from "react-number-format";
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
import DetailSkeleton from "../../components/DetailSkeleton";
import MuiTableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DetailPaymentService from "../../services/detail.payment.service";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ContentContainer from "../../components/ContentContainer";
import useStyles from "../../styles/customer/HasilFormPayment";
import { dateOnly } from "../../utils/date-format";

import Chip from "../../components/ActionChip";
import { Alert } from "@material-ui/lab";

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

  } else if (action === "Menunggu Konfirmasi General Support") {
    result = "blue"
  }
  return result;
}

const MTableRow = ({ label, value }) => {
  return (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell align="center">:</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
};

export default function HasilFormPayment(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState (false);
  const [paymentDetail, setPaymentDetail] = useState ([]);
  const [errorMsg, setErrorMsg] = useState ();
  useEffect(() => {
    fetchPaymentDetail();
  }, []);

  const fetchPaymentDetail = async () => {
    setIsLoading (true);
    const result = await DetailPaymentService.getCustomerDetailPayment(id);
    setIsLoading (false);
    if (!Boolean(result.error)) {
        setPaymentDetail(result.data);
        if (Boolean(result.data)) {
          setErrorMsg("");
        }else {
          setErrorMsg("data not found");
        }
    } else {
      setPaymentDetail(null);
      setErrorMsg(result.error.response.data.msg);
    }
  };

  const CurrencyFormat = (props) => {
  return (
    <NumberFormat
      value={paymentDetail.amount}
      prefix="Rp."
      decimalSeparator="."
      displayType="text"
      thousandSeparator={true}
      allowNegative={true} />
  )
}

  const handleClickNewPayment = () => {
    props.history.push("/add-payment-request");
  }

  const handleClickGoBack = () => {
    props.history.goBack();
  }

  return (
    <ContentContainer role="customer">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingBottom: "2em",
        }}
      >
        <Typography variant="h4">Payment Request</Typography>
      </div>
        {Boolean(errorMsg) && <Alert severity="warning">{errorMsg}</Alert>}
      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className={classes.root}>
        <Card className={classes.cardRequest}>
          <Container fixed>
            <CardContent>
              <TableContainer className={classes.table}>
                <Table className={classes.table} aria-label="simple table" size='small'>
                  <TableBody>
                  <MTableRow
                    label="Diminta Oleh"
                    value={paymentDetail.customer_name || ""}
                  />
                  <MTableRow
                    label="Keperluan Payment"
                    value={paymentDetail.request || ""}
                  />
                  <MTableRow
                    label="Tanggal Pembayaran"
                    value={dateOnly(paymentDetail.payment_date || "")}
                  />
                  <MTableRow
                    label="Jumlah Payment"
                    value={CurrencyFormat(paymentDetail.amount)}
                  />
                  <MTableRow
                    label="Terbilang"
                    value={paymentDetail.amount_counted || ""}
                  />
                  <MTableRow
                    label="Nama Rek. Penerima"
                    value={paymentDetail.account_name || ""}
                  />
                  <MTableRow
                    label="No. Rekening Penerima"
                    value={paymentDetail.account_number || ""}
                  />
                  <TableRow>
                    <TableCell>Status Request</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>
                      <Chip
                        label="Menunggu Konfirmasi General Support"
                        color={convertActionToChipColor("Menunggu Konfirmasi General Support")}
                      />
                    </TableCell>
                    </TableRow>
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

      )}
    </ContentContainer>
  );
}


