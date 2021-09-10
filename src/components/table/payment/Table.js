import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePaginationActions from "./TablePagination";
import Chip from "../../ActionChip";
import { Link } from "react-router-dom";

const rows = [
  {
    no: "1",
    tgl_request: "11 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Menunggu Konfirmasi",
  },
  {
    no: "2",
    tgl_request: "12 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Disetujui",
  },
  {
    no: "3",
    tgl_request: "13 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Rejected by Accounting",
  },
  {
    no: "4",
    tgl_request: "14 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Rejected by GS",
  },
  {
    no: "5",
    tgl_request: "11 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Menunggu Konfirmasi",
  },
  {
    no: "6",
    tgl_request: "12 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Disetujui",
  },
  {
    no: "7",
    tgl_request: "13 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Rejected by Accounting",
  },
  {
    no: "8",
    tgl_request: "14 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Rejected by GS",
  },
  {
    no: "9",
    tgl_request: "11 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Menunggu Konfirmasi",
  },
  {
    no: "10",
    tgl_request: "12 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Disetujui",
  },
  {
    no: "11",
    tgl_request: "13 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Rejected by Accounting",
  },
  {
    no: "12",
    tgl_request: "14 Agustus 2012",
    tgl_pembayaran: "13 September 2021",
    action: "Rejected by GS",
  },
];

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#90caf9",
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function GeneralSupport({ role }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 8;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>no</StyledTableCell>
            <StyledTableCell>Tanggal Request</StyledTableCell>
            <StyledTableCell>Tanggal Pembayaran</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <StyledTableRow key={row.no}>
              <StyledTableCell>{row.no}</StyledTableCell>
              <StyledTableCell>{row.tgl_request}</StyledTableCell>
              <StyledTableCell>{row.tgl_pembayaran}</StyledTableCell>
              <StyledTableCell>
                <Chip
                  label={row.action}
                  color={
                    ["Rejected by Accounting", "Rejected by GS"].includes(
                      row.action
                    )
                      ? 'red'
                      : row.action === "Disetujui"
                        ? 'green'
                        : row.action === "Menunggu Konfirmasi"
                          ? 'blue'
                          : 'grey'
                  }
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`${role}/payment-detail`}>
                  <Button size="small" variant="contained" color="primary">
                    Lihat Detail
                  </Button>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={5}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
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
  );
}
