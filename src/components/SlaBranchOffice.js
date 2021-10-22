import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import MuiTableCell from "@material-ui/core/TableCell";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import useStyles from "../styles/HasilFormPayement";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";

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

export default function SlaBranchOffice({ sla }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card>
                <Container fixed>
                    <CardContent>
                        <TableContainer className={classes.table}>
                            <Table className={classes.table} aria-label="simple table" size='small'>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Nama Kantor Cabang</TableCell>
                                        <TableCell>:</TableCell>
                                        <TableCell>{sla.branch_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Jumlah Request Perhari</TableCell>
                                        <TableCell>:</TableCell>
                                        <TableCell>{sla.capacity}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Rekomendasi Request Perhari</TableCell>
                                        <TableCell>:</TableCell>
                                        <TableCell>{sla.recomendation}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Container>
            </Card>
        </div>
    )
}
