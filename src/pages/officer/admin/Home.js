import React, { useState, useEffect } from "react";
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
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import TablePaginationActions from "../../../components/table/payment/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ColorsTheme from "../../../assets/colors";
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert';

import AuthService from '../../../services/auth.service'

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
  button: {
    backgroundColor: ColorsTheme.dodgerBlue,
    "&:hover": {
      backgroundColor: ColorsTheme.blueCrayola,
    },
  }, 
  messageError: {
    display: "flex",
    justifyContent: "center"
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

//styling odd row
const StylingTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Home(props) {
  const classes = useStyles();
  const [paging, setPaging] = useState(0);
  const [flashMessage, setFlashMessage] = useState({ success: false, message: '' });
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("Loading...");
  const rowsPerPage = 7;

  const handleChangePage = (event, newPaging) => {
    setPaging(newPaging);
  };

  // get api data all branch office
  const fetchData = async () => {
    const result = await AuthService.getAllUser()
    if (!Boolean(result.error)) {
      setUsers(result.data)
      setErrorMsg("")
    } else {
      setUsers([])
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
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

          <Link to="/add-user"
            className={classes.actionComponent}>
            <Button fullWidth className={classes.button} variant="contained" color="primary" startIcon={<AddIcon />}>
              Add Account
            </Button>
          </Link>
          <TextField
            className={classes.actionComponent}
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
        </Grid>

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
                ? users.slice(
                  paging * rowsPerPage,
                  paging * rowsPerPage + rowsPerPage
                )
                : users
              ).map((user, index) => (
                <StylingTableRow key={index + 1}>
                  <StylingTableCell width="10%">{paging * rowsPerPage + index + 1}</StylingTableCell>
                  <StylingTableCell>{user.fullname}</StylingTableCell>
                  <StylingTableCell>{user.branch_id}</StylingTableCell>
                  <StylingTableCell>{user.branch_name}</StylingTableCell>
                  <StylingTableCell width="25%" align="center">
                    <Link to="/detail-user" >
                      <Button
                        className={classes.buttonMargin}
                        variant="contained"
                        color="info"
                        size="small"
                        startIcon={<VisibilityIcon />}
                      >
                        Detail
                      </Button>
                    </Link>
                    <Link to="/update-user" >
                      <Button className={classes.buttonMargin} variant="contained" color="primary" size="small"
                        startIcon={<EditIcon />}>
                        Update
                      </Button>
                    </Link>
                    <Link to="/hapus-user" >
                      <Button
                        className={classes.buttonMargin}
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
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
                  count={users.length}
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
