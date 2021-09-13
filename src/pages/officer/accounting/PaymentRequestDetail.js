
import React from "react";

// Material ui core
import {
    Typography,
    Paper,
    Button
} from "@material-ui/core";

// Material ui icons
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { Link } from "react-router-dom";


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
    },
    BtnUpdate:{
        float:"right"
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
                                <td>Unit Kerja</td>
                                <td
                                    className={classes.centerCell}>:</td>
                                <td>KC BANK PM</td>
                            </tr>
                            <tr>
                                <td>Diminta oleh</td>
                                <td
                                    className={classes.centerCell}>:</td>
                                <td>Asep Sunandar</td>
                            </tr>
                            <tr>
                                <td>Keperluan Payment</td>
                                <td
                                    className={classes.centerCell}>:</td>
                                <td>SPP Juli 2020</td>
                            </tr>
                            <tr>
                                <td>Tanggal Pembayaran</td>
                                <td
                                    className={classes.centerCell}>:</td>
                                <td>Sabtu,10 Juli 2021</td>
                            </tr>
                            <tr>
                                <td>Jumlah Payment</td>
                                <td
                                    className={classes.centerCell}>:</td>
                                <td>Rp.1.000.000</td>
                            </tr>
                            <tr>
                                <td>Terbilang</td>
                                <td
                                    className={classes.centerCell}>:</td>
                                <td>Satu Juta Rupiah</td>
                            </tr>
                            <tr>
                                <td>Nama Rek. Penerima</td>
                                <td
                                    className={classes.centerCell}>:</td>
                                <td>MD Mubarokul Huda</td>
                            </tr>
                            <tr>
                                <td>No. Rekening Penerima</td>
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
                            <PaymentStatusSelector />
                        </tbody>
                    </table>
                </div>
                <div>
                    <Link to="/accounting">
                        <Button
                            variant="contained"
                            color="primary"
                            // className={classes.BtnBack}
                            startIcon={<ArrowBackIosRoundedIcon />}
                        >
                            Kembali
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.BtnUpdate}
                        endIcon={<SaveRoundedIcon />}
                    >
                        Update
                    </Button>
                 
                </div>
            </Paper>
        </ContentContainer>
    );
}

export default PaymentRequestDetail;