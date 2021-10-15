import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../../../components/ContentContainer";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TextField from '@material-ui/core/TextField';
import ColorsTheme from "../../../assets/colors";

import TablePaginationActions from "../../../components/table/payment/TablePagination";

//import api service
import BranchService from "../../../services/branch.service"

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 500,
    },
    headerTable: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: theme.spacing(2),
    },
    PaperSize: {
        padding: theme.spacing(4),
    },
    buttonMargin: {
        margin: theme.spacing(1),
    },
    messageError: {
        display: "flex",
        justifyContent: "center"
    },
    alert: {
        marginBottom: theme.spacing(2)
    },
    button: {
        backgroundColor: ColorsTheme.dodgerBlue,
        "&:hover": {
            backgroundColor: ColorsTheme.blueCrayola,
        }
    },
    actionComponent: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

const StylingTableCell = withStyles(() => ({
    head: {
        backgroundColor: "#90caf9",
        fontWeight: "bold",
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

//Styling odd row
const StylingTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function ServiceLevelAgreement(props) {
    const classes = useStyles();
    const [pages, setPages] = useState(0);
    const [flashMessage, setFlashMessage] = useState({ success: false, message: '' });
    const [branchs, setBranchs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState();
    const rowsPage = 10;

    //event handling change page
    const handleChangePage = (event, newPages) => {
        setPages(newPages);
    }

    // get api data all branch office
    const fetchData = async () => {

        setIsLoading(true);
        const result = await BranchService.getAllBranch()

        setIsLoading(false);
        if (!Boolean(result.error)) {
            setBranchs(result.data)
            if (Boolean(result.data)) {
                setErrorMsg("");
            } else {
                setErrorMsg("data not found");
            }
        } else {
            setBranchs([])
            setErrorMsg(result.error.response.data.msg)
        }
    }

    useEffect(() => {
        // show toast if after input data
        if (props.location.state) {
            setFlashMessage(props.location.state)
        }
    }, [props.location.state])

    useEffect(() => {
        window.history.replaceState(null, '')
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ContentContainer role="admin" selectedMenu="Service Lvl Agreement">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingBottom: "2em",
                }}
            >
                <Typography variant="h4">Service Level Agreement</Typography>
            </div>

            <Paper className={classes.root}>
                <TableContainer component={Paper} style={{ display: errorMsg ? 'none' : 'block' }}>
                    <Table className={classes.table} aria-label="custom table pagination">
                        <TableHead>
                            <TableRow>
                                <StylingTableCell>no</StylingTableCell>
                                <StylingTableCell>Nama Kantor Cabang</StylingTableCell>
                                <StylingTableCell>Request Payment Perhari</StylingTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPage > 0
                                ? branchs.slice(
                                    pages * rowsPage,
                                    pages * rowsPage + rowsPage
                                )
                                : branchs
                            ).map((branch, index) => (
                                <StylingTableRow key={index + 1}>
                                    <StylingTableCell width="10%">{pages * rowsPage + index + 1}</StylingTableCell>
                                    <StylingTableCell>{branch.id === 1 ? "pusat" : branch.branch_name}</StylingTableCell>
                                    <StylingTableCell>
                                        <TextField
                                            id="outlined-number"
                                            label="Jumlah Request"
                                            type="number"
                                            variant="outlined"
                                        />
                                    </StylingTableCell>
                                </StylingTableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    colSpan={5}
                                    count={branchs.length}
                                    rowsPerPage={rowsPage}
                                    page={pages}
                                    SelectProps={{
                                        inputProps: { "aria-label": "rows per page" },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>

            </Paper>
        </ContentContainer>
    );
}
