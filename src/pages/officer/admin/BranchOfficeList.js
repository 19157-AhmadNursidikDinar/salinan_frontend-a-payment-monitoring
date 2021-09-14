import React from "react";
//Re-using component
import ContentContainer from "../../../components/ContentContainer";
import TablePaginationActions from "../../../components/table/generalSupport/TablePagination";
//import from @material-ui/icons
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
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
    Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
//making Get List Branch Office using array Object
const offices = [
    {
        no: "1",
        kantor: "KC JATINEGARA",
    },
    {
        no: "2",
        kantor: "KC SENAYAN",
    },
    {
        no: "3",
        kantor: "KC KEBON JERUK",
    },
    {
        no: "4",
        kantor: "KC PLUIT",
    },
    {
        no: "5",
        kantor: "KC PONDOK INDAH",
    },
    {
        no: "6",
        kantor: "KC JATIASIH BEKASI",
    },
    {
        no: "7",
        kantor: "KC SAWANGAN DEPOK",
    },
    {
        no: "8",
        kantor: "KC TANGERANG",
    },
    {
        no: "9",
        kantor: "KC TANGERANG SELATAN",
    },
    {
        no: "10",
        kantor: "KC BOGOR",
    },
    {
        no: "11",
        kantor: "KC DAGO BANDUNG",
    },
    {
        no: "12",
        kantor: "KC SEMARANG",
    },
    {
        no: "13",
        kantor: "KC YOGYAKARTA",
    },
    {
        no: "14",
        kantor: "KC SURABAYA",
    },
]

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
}));

const StylingTableCell = withStyles(() => ({
    head: {
        backgroundColor: "#9ocaf9",
        fontWeight: "bold",
    },
    body: {
        fontSize: 14,
    }
}))(TableCell);
//Styling odd row
const StylingTableRow = withStyles((theme) =>({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
      },
}))(TableRow);

export default function BranchOfficeList() {
    const sections = useStyles();
    const [pages, setPages] = React.useState(0);
    const rowsPage = 7;
//event handling change page
    const handleChangePage = (event, newPages) => {
        setPages(newPages);
    }

    return (
        <ContentContainer role="admin" selectedMenu="Beranda">
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
            <Paper className={sections.PaperSize} elevation={4}>
                <div className={sections.headerTable}>
                    <Link to="/add-branch">
                        <Button variant="contained" color="primary" startIcon={<AddIcon/>}>
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
            <TableContainer component={Paper}>
                <Table className={sections.table} aria-label="custom table pagination">
                  <TableHead>
                      <TableRow>
                          <StylingTableCell>no</StylingTableCell>
                          <StylingTableCell>Nama Kantor Cabang</StylingTableCell>
                          <StylingTableCell align="center">Action</StylingTableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {(rowsPage > 0
                        ? offices.slice(
                            pages * rowsPage,
                            pages * rowsPage + rowsPage
                        )
                        : offices
                        ).map((office) => (
                            <StylingTableRow key={office.no}>
                                <StylingTableCell>{office.no}</StylingTableCell>
                                <StylingTableCell>{office.kantor}</StylingTableCell>
                                <StylingTableCell width="25%">
                                    <Link to="/detail-branch" className={sections.buttonMargin}>
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
                            rowsPageOptions={[]}
                            colSpan={5}
                            count={offices.length}
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