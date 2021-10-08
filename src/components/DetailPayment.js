import React from "react";

import NumberFormat from "react-number-format";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import MuiTableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { withStyles } from "@material-ui/core/styles";
import useStyles from "../styles/HasilFormPayement";
import { dateOnly } from "../utils/date-format";

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

const convertActionToChipColor = (action) => {
    let result = "grey";
    if (["Rejected by Accounting", "Rejected by GS"].includes(action)) {
        result = "red";
    } else if (action === "Disetujui") {
        result = "green";
    } else if (["Menunggu Konfirmasi General Support", "Menunggu Konfirmasi Accounting"].includes(action)) {
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



export default function DetailPayment({ paymentDetail, children }) {
    const classes = useStyles();

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
                                label={paymentDetail.stage}
                                color={convertActionToChipColor(paymentDetail.stage)}
                            />
                        </TableCell>
                    </TableRow>
                    {children}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
