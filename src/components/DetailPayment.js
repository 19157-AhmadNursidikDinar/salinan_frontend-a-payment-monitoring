import React from "react";

import NumberFormat from "react-number-format";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import MuiTableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { withStyles } from "@material-ui/core/styles";
import useStyles from "../styles/HasilFormPayement";
import { dateOnly, dateAndTime } from "../utils/date-format";
import { convertActionToChipColor } from "../utils/chip-utils";

import Chip from "./ActionChip";

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

const MTableRow = ({ label, value }) => {
    return (
        <TableRow>
            <TableCell>{label}</TableCell>
            <TableCell align="center">:</TableCell>
            <TableCell>{value}</TableCell>
        </TableRow>
    );
};

export default function DetailPayment({ paymentDetail, children }) {
    const classes = useStyles();

    const CurrencyFormat = () => {
        return (
            <NumberFormat
                value={paymentDetail.amount}
                prefix="Rp "
                suffix=",00"
                thousandSeparator="."
                decimalSeparator=","
                displayType="text"
                allowNegative={true} />
        )
    }

    const PhoneOptions = () => {
        return paymentDetail.phone === "" ? "-"
            : "+" + paymentDetail.phone
    }

    const PaymentDateStatus = () => {
        return paymentDetail.payment_date === "" ? "-"
            : dateOnly(paymentDetail.payment_date)
    }

    return (
        <TableContainer className={classes.table}>
            <Table className={classes.table} aria-label="simple table" size='small'>
                <TableBody>
                    <MTableRow
                        label="Diminta Oleh"
                        value={paymentDetail.customer_name || ""}
                    />
                    <MTableRow
                        label="No. Telepon"
                        value={PhoneOptions(paymentDetail.phone)}
                    />
                    <MTableRow
                        label="Keperluan Payment"
                        value={paymentDetail.request || ""}
                    />
                    <MTableRow
                        label="Tanggal Pembayaran"
                        value={PaymentDateStatus(paymentDetail.payment_date)}
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
                    <MTableRow
                        label="Request Terkirim"
                        value={dateAndTime(paymentDetail.request_date) || ""}
                    />
                    <MTableRow
                        label="Status Request"
                        value={
                            <Chip
                                label={paymentDetail.stage}
                                color={convertActionToChipColor(paymentDetail.stage || "")}
                            />
                        }
                    />
                    {Boolean(paymentDetail.reason) &&
                        <MTableRow
                            label="Keterangan"
                            value={paymentDetail.reason || ""}
                        />
                    }
                    {children}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
