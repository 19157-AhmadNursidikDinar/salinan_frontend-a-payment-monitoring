import React, { Fragment } from "react";
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
import DetailIcon from "@material-ui/icons/Visibility";
import TablePaginationActions from "./TablePagination";
import Chip from "../../ActionChip";
import ColorsTheme from "../../../assets/colors";
import { dateOnly, dateAndTime } from "../../../utils/date-format";
import { convertActionToChipColor } from "../../../utils/chip-utils";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: ColorsTheme.lightSkyBlue,
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

export default function GeneralSupport({ paymentData = [], role }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 8;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Fragment>
      {Boolean(paymentData) && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell>no</StyledTableCell>
                <StyledTableCell align="center">
                  Tanggal Request
                </StyledTableCell>
                <StyledTableCell align="center">
                  Tanggal Pembayaran
                </StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? paymentData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : paymentData
              ).map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    {page * rowsPerPage + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dateAndTime(row.tanggal_request)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dateOnly(row.tanggal_pembayaran)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      label={row.action}
                      color={convertActionToChipColor(row.action)}
                      size="small"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={`${role}/payment-detail/${row.id}`}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<DetailIcon />}
                      >
                        Details
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
                  count={paymentData.length}
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
      )}
    </Fragment>
  );
}
