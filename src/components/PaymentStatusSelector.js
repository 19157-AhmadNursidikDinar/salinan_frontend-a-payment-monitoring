import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Alert } from "@material-ui/lab";
import DetailPaymentService from "../services/detail.payment.service";
import { dateOnly } from "../utils/date-format";
import DetailSkeleton from "../components/DetailSkeleton";
// Material ui core
import {
    FormControl,
    MenuItem,
    Select,
    TextField,
    TableRow
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

const MTableRow = ({ label, value }) => {
    return (
      <TableRow>
        <TableCell>{label}</TableCell>
        <TableCell align="center">:</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    );
  };

function PaymentStatusSelector() {
    const classes = useStyles();
    const [status, setStatus] = useState('null');
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState (false);
    const [paymentDetail, setPaymentDetail] = useState ([]);
    const [errorMsg, setErrorMsg] = useState ();
    useEffect(() => {
      fetchPaymentDetail();
    }, []);
  
    const fetchPaymentDetail = async () => {
      setIsLoading (true);
      const result = await DetailPaymentService.getOfficerDetailPayment(id);
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
  
    return (
        <>
          {Boolean(errorMsg) && <Alert severity="warning">{errorMsg}</Alert>}
      {isLoading ? (  
           <DetailSkeleton />
      ) : (
            <TableRow>
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
                    value={dateOnly(paymentDetail.payment_date) || ""}
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
                    {paymentDetail.value === "null" ? (
                        <TableCell>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth size="small">
                                <Select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value="null">-Ubah Status-</MenuItem>
                                    <MenuItem value="accept">Accept</MenuItem>
                                    <MenuItem value="reject">Reject</MenuItem>
                                </Select>
                            </FormControl>
                        </TableCell>
                    ) : (
                        <TableCell>{paymentDetail.value}</TableCell>
                    )}
            </TableRow>
      )}
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
                            size="small" />
                    </TableCell>
                </TableRow>
            ) : (
                <TableCell> </TableCell>
            )}
        </>
    )
}

export default PaymentStatusSelector