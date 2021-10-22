import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../../../../components/ContentContainer";
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
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
import ColorsTheme from "../../../../assets/colors";

import TablePaginationActions from "../../../../components/table/payment/TablePagination";
import TableSkeleton from "../../../../components/table/payment/TableSkeleton";

//import api service
import SlaService from "../../../../services/sla.service";

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
    const [sla, setSla] = useState([]);
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
        const result = await SlaService.getAllSLA()

        setIsLoading(false);
        if (!Boolean(result.error)) {

            const filterSla = result.data.reduce((acc, current) => {
                const x = acc.find(item => item.branch_name === current.branch_name);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc.filter((item) => item.capacity > 0);;
                }
            }, []);

            setSla(filterSla)
            if (Boolean(result.data)) {
                setErrorMsg("");
            } else {
                setErrorMsg("data not found");
            }
        } else {
            setSla([])
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

    function PaperServiceLevelAgreement(props) {
        return (
            <Paper className={classes.PaperSize} elevation={4}>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Link to="/add-service" className={classes.actionComponent}>
                        <Button className={classes.button} variant="contained" color="primary" startIcon={<AddIcon />}>
                            Add Service
                        </Button>
                    </Link>
                </Grid>

                <div className={classes.messageError}>
                    <h2 style={{ display: errorMsg ? 'block' : 'none' }}>{errorMsg}</h2>
                </div>
                <TableContainer component={Paper} style={{ display: errorMsg ? 'none' : 'block' }}>
                    <Table className={classes.table} aria-label="custom table pagination">
                        <TableHead>
                            <TableRow>
                                <StylingTableCell>no</StylingTableCell>
                                <StylingTableCell>Nama Kantor Cabang</StylingTableCell>
                                <StylingTableCell>Request Payment Perhari</StylingTableCell>
                                <StylingTableCell>Jumlah Rekomendasi Request</StylingTableCell>
                                <StylingTableCell>Status Rekomendasi Request</StylingTableCell>
                                <StylingTableCell>Action</StylingTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPage > 0
                                ? sla.slice(
                                    pages * rowsPage,
                                    pages * rowsPage + rowsPage
                                )
                                : sla
                            ).map((branch, index) => (
                                <StylingTableRow key={index + 1}>
                                    <StylingTableCell width="10%">{pages * rowsPage + index + 1}</StylingTableCell>
                                    <StylingTableCell>{branch.branch_name}</StylingTableCell>
                                    <StylingTableCell>{branch.capacity}</StylingTableCell>
                                    <StylingTableCell>{branch.recomendation}</StylingTableCell>
                                    <StylingTableCell>{branch.same_with_recomendation}</StylingTableCell>
                                    <StylingTableCell>
                                        <Link to={{ pathname: `/update-service/${branch.branch_id}`, state:{
                                            capacity: `${branch.capacity}`,
                                            recomendation: `${branch.recomendation}`,
                                        } }} className={classes.actionComponent}>
                                            <Button variant="contained" color="primary" startIcon={<EditIcon />}>
                                                Update
                                            </Button>
                                        </Link>
                                    </StylingTableCell>
                                </StylingTableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    colSpan={5}
                                    count={sla.length}
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
        )
    }

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
            <Collapse in={flashMessage.success} >
                <Alert
                    className={classes.alert}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setFlashMessage({ success: false, message: '' });
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {flashMessage.message}
                </Alert>
            </Collapse>
            {Boolean(errorMsg) && <Alert severity="warning">{errorMsg}</Alert>}
            {isLoading ? (
                <TableSkeleton />
            ) : (
                <PaperServiceLevelAgreement />
            )}
        </ContentContainer>
    );
}
