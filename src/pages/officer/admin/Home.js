import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from "@material-ui/core/InputAdornment";
import ContentContainer from "../../../components/ContentContainer";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "../../../components/table/generalSupport/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";

//making Get List Account using Array Object
const rows = [
  {
    no: "1",
    nama: "Dinda Eka",
    role: "General Support",
    username: "10001",
  },
  {
    no: "2",
    nama: "Eka Dinda",
    role: "Accounting",
    username: "10002",
  },
  {
    no: "3",
    nama: "Dinda Eka Saja",
    role: "Admin",
    username: "10003",
  },
  {
    no: "4",
    nama: "Eka Dinda saja",
    role: "Admin",
    username: "10004",
  },
  {
    no: "5",
    nama: "Hidayat",
    role: "General Support",
    username: "10005",
  },
  {
    no: "6",
    nama: "Dinda Eka",
    role: "General Support",
    username: "10006",
  },
  {
    no: "7",
    nama: "Eka Dinda",
    role: "Accounting",
    username: "10007",
  },
  {
    no: "8",
    nama: "Dinda Eka Saja",
    role: "Admin",
    username: "10008",
  },
  {
    no: "9",
    nama: "Eka Dinda saja",
    role: "Admin",
    username: "10009",
  },
  {
    no: "10",
    nama: "Hidayat",
    role: "General Support",
    username: "10010",
  },
];

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

//styling odd row
const StylingTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Home() {
  const classes = useStyles();
  const [paging, setPaging] = React.useState(0);
  const rowsPerPage = 7;

  const handleChangePage = (event, newPaging) => {
    setPaging(newPaging);
  };

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
        <Typography variant="h4">Beranda Admin</Typography>
      </div>
      <Paper className={classes.PaperSize} elevation={4}>
        <div className={classes.headerTable}>
          <Link to="/add-user">
            <Button variant="contained" color="primary" startIcon={<AddIcon/>}>
              Add New Role Account
            </Button>
          </Link>
          <TextField
            className="txtfield"
            id="txtSearch"
            type="text"
            placeholder="Search"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StylingTableCell>no</StylingTableCell>
                <StylingTableCell>Nama</StylingTableCell>
                <StylingTableCell>Role</StylingTableCell>
                <StylingTableCell>Username</StylingTableCell>
                <StylingTableCell align="center">Action</StylingTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    paging * rowsPerPage,
                    paging * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <StylingTableRow key={row.no}>
                  <StylingTableCell>{row.no}</StylingTableCell>
                  <StylingTableCell>{row.nama}</StylingTableCell>
                  <StylingTableCell>{row.role}</StylingTableCell>
                  <StylingTableCell>{row.username}</StylingTableCell>
                  <StylingTableCell width="25%">
                    <Link to="/detail-user" className={classes.buttonMargin}>
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        startIcon={<VisibilityIcon />}
                      >
                        Detail
                      </Button>
                    </Link>
                    <Link to="/update-user" className={classes.buttonMargin}>
                      <Button variant="contained" color="primary" size="small" 
                        startIcon={<EditIcon />}>
                        Update
                      </Button>
                    </Link>
                    <Link to="/hapus-user" className={classes.buttonMargin}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                      >
                        Hapus
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
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={paging}
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
