import React, { useState } from "react";

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
    createData("Status Request", "null"),
];

function PaymentStatusSelector() {
    const classes = useStyles();
    const [status, setStatus] = useState('null');

    return (
        <>
            {rows.map((row) => (
                <TableRow key={row.name}>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>:</TableCell>
                    {row.value === "null" ? (
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
                        <TableCell>{row.value}</TableCell>
                    )}
                </TableRow>
            ))}
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