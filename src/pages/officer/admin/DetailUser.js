import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import MuiTableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {
    Button,
    Grid,
    Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

import ContentContainer from "../../../components/ContentContainer";
import { Link } from "react-router-dom";


const useMyStyles = makeStyles((theme) => ({
    BtnBack: {
        backgroundColor: "#1890FF",
        '&:hover': {
            backgroundColor: "# 2979ff",
        },
        margin: '20px',
        float: 'left',
    },
}));

const TableCell = withStyles({
    root: {
        borderBottom: "none",
        fontSize: "20px",
        fontWeight: 600,
    },
})(MuiTableCell);


const createData = (description, value) => {
    return { description, value };
};

const rows = [
    createData("Nama", "Dinda Nurlita"),
    createData("Role", "Accounting"),
    createData("Username", "10001"),
];


function FormDetailUser() {
    const classes = useMyStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.cardRequest}>
                <Grid container justify="center">
                    <CardContent>
                        <TableContainer className={classes.table}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow>
                                            <TableCell width="100px">{row.description}</TableCell>
                                            <TableCell align="right" width="100px" >:</TableCell>
                                            <TableCell >{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Link to="/admin">
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.BtnBack}
                                startIcon={<ArrowBackIosRoundedIcon />}
                            >
                                Kembali
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Card>
        </div >

    );
}

export default function DetailUser() {
    return (
        <ContentContainer role="admin" selectedMenu="Beranda">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingBottom: "2em",
                }}
            >
                <Typography variant="h4">Detail Account</Typography>
            </div >
            <FormDetailUser />
        </ContentContainer >
    );
}