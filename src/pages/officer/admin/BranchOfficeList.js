import React, { useEffect, useState } from "react";
//Re-using component
import ContentContainer from "../../../components/ContentContainer";
import TablePaginationActions from "../../../components/table/payment/TablePagination";
//import from @material-ui/icons
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
//import from @material-ui/core
import {
    Button,
    InputAdornment,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableFooter,
    TablePagination,
    TextField,
    Typography,
    Collapse,
    IconButton
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ColorsTheme from "../../../assets/colors";

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
        },
        margin: theme.spacing(1)
    },
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

export default function BranchOfficeList(props) {
    const classes = useStyles();
    const [pages, setPages] = useState(0);
    const [flashMessage, setFlashMessage] = useState({ success: false, message: '' });
    const [branchs, setBranchs] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const rowsPage = 10;

    //event handling change page
    const handleChangePage = (event, newPages) => {
        setPages(newPages);
    }

    // get api data all branch office
    const fetchData = async () => {
        const result = await BranchService.getAllBranch()
        if (!Boolean(result.error)) {
            setBranchs(result.data)
            setErrorMsg("")
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
        fetchData()
    }, [])

    return (
        <ContentContainer role="admin" selectedMenu="Daftar Kantor Cabang">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingBottom: "2em",
                }}>
                <Typography variant="h4">
                    Daftar Kantor Cabang
                </Typography>
            </div>

            <Paper className={classes.PaperSize} elevation={4}>

                <div className={classes.headerTable}>
                    <Link to="/add-branch">
                        <Button className={classes.button} variant="contained" color="primary" startIcon={<AddIcon />}>
                            Add Kantor Cabang
                        </Button>
                    </Link>
                    <TextField
                        className="txtfield"
                        id="txtSearchOffice"
                        type="text"
                        placeholder="Find Office Address"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            )
                        }}
                    />
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

                <div className={classes.messageError}>
                    <h2 style={{ display: errorMsg ? 'block' : 'none' }}>{errorMsg}</h2>
                </div>
                <TableContainer component={Paper} style={{ display: errorMsg ? 'none' : 'block' }}>
                    <Table className={classes.table} aria-label="custom table pagination">
                        <TableHead>
                            <TableRow>
                                <StylingTableCell>no</StylingTableCell>
                                <StylingTableCell>Nama Kantor Cabang</StylingTableCell>
                                <StylingTableCell align="center">Action</StylingTableCell>
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
                                    <StylingTableCell>{branch.id === 1? "pusat" : branch.branch_name }</StylingTableCell>
                                    <StylingTableCell width="25%" align="center">
                                        <Link to="/detail-branch" className={classes.buttonMargin}>
                                            <Button
                                                variant="contained"
                                                color="info"
                                                size="small"
                                                startIcon={<VisibilityIcon />}>
                                                Detail
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