import React from "react";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Position from "@material-ui/system";
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
    username: "10001"
  },
  {
    no: "2",
    nama: "Eka Dinda",
    role: "Accounting",
    username: "10002"
  },
  {
    no: "3",
    nama: "Dinda Eka Saja",
    role: "Admin",
    username: "10003"
  },
  {
    no: "4",
    nama: "Eka Dinda saja",
    role: "Admin",
    username: "10004"
  },
  {
    no: "5",
    nama: "Hidayat",
    role: "General Support",
    username: "10005"
  },
  {
    no: "6",
    nama: "Dinda Eka",
    role: "General Support",
    username: "10006"
  },
  {
    no: "7",
    nama: "Eka Dinda",
    role: "Accounting",
    username: "10007"
  },
  {
    no: "8",
    nama: "Dinda Eka Saja",
    role: "Admin",
    username: "10008"
  },
  {
    no: "9",
    nama: "Eka Dinda saja",
    role: "Admin",
    username: "10009"
  },
  {
    no: "10",
    nama: "Hidayat",
    role: "General Support",
    username: "10010"
  }
]

const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
})

const StylingTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#90caf9",
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  }
}))(TableCell);

//styling odd row
const StylingTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  }
}))(TableRow);

export default function Home() {
  const c = useStyles();
  const [paging, setPaging] = React.useState(0);
  const rowPerPage = 5;

  const handleChangePage = (Event, newPaging) => {
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
      <Link to="/add-user">
        <Button
          variant="contained"
          color="primary"
        >
          Add New Role Account
        </Button>
      </Link>
          <TextField
                  className="txtfield"
                  id="txtSearch"
                  type="text"
                  placeholder="Search"
                  variant="outlined"
                  small
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
  
      <TableContainer component={Paper}>
        <Table className={c.table} aria-label="custom-pagination-table">
          <TableHead>
            <TableRow>
              <StylingTableCell>no</StylingTableCell>
              <StylingTableCell>Nama</StylingTableCell>
              <StylingTableCell>Role</StylingTableCell>
              <StylingTableCell>Username</StylingTableCell>
              <StylingTableCell>Action</StylingTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {(rowPerPage > 0
                ? rows.slice(paging * rowPerPage, paging * rowPerPage + rowPerPage)
                : rows
                ).map((row) => (
                  <StylingTableRow key={row.no}>
                    <StylingTableCell>{row.no}</StylingTableCell>
                    <StylingTableCell>{row.nama}</StylingTableCell>
                    <StylingTableCell>{row.role}</StylingTableCell>
                    <StylingTableCell>{row.username}</StylingTableCell>
                    <StylingTableCell>
                      <Link to="/update-user">
                        <Button
                             variant="contained"
                             color="primary"
                        >
                        Update User
                        </Button>
                        </Link>
                    </StylingTableCell>
                  </StylingTableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination 
              rowsPerPageOptions= {[]}
              colSpan= {5}
              count= {rows.length}
              rowPerPage= {rowPerPage}
              paging= {paging}
              SelectProps={{
                inputProps: { "aria-label" : "rows per page"},
                native: true,
              }}
              onPageChange= {handleChangePage}
              ActionsComponent= {TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </ContentContainer>
  );
}
