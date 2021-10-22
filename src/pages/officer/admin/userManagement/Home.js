import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import InputAdornment from "@material-ui/core/InputAdornment";
import ContentContainer from "../../../../components/ContentContainer";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableSkeleton from "../../../../components/table/payment/TableSkeleton";
import DeleteUserDialog from "../../../../components/dialogs/DeleteUserDialog";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TablePaginationActions from "../../../../components/table/payment/TablePagination";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ColorsTheme from "../../../../assets/colors";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";

import UserService from "../../../../services/user.service";

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
  button: {
    backgroundColor: ColorsTheme.dodgerBlue,
    "&:hover": {
      backgroundColor: ColorsTheme.blueCrayola,
    },
  },
  messageError: {
    display: "flex",
    justifyContent: "center",
  },
  actionComponent: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  alert: {
    margin: "1em 0",
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

export default function Home(props) {
  const classes = useStyles();
  const [paging, setPaging] = useState(0);
  const [flashMessage, setFlashMessage] = useState({
    success: false,
    message: "",
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState();
  const rowsPerPage = 10;

  const handleChangePage = (event, newPaging) => {
    setPaging(newPaging);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const result = await UserService.getAllUser();
    setIsLoading(false);
    if (!Boolean(result.error)) {
      setUsers(result.data);
      if (Boolean(result.data)) {
        setErrorMsg("");
      } else {
        setErrorMsg("data not found");
      }
    } else {
      setUsers([]);
      setErrorMsg(result.error.response.data.msg);
    }
  };

  useEffect(() => {
    if (props.location.state) {
      setFlashMessage(props.location.state);
    }
  }, [props.location.state]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setIsLoading(true);
    const result = await UserService.DeleteUser(id);
    // console.log({ result });
    if (!Boolean(result.error)) {
      setFlashMessage({
        success: true,
        message: "User has been deleted",
      });
      fetchData();
    } else {
      setErrorMsg(result.error.response.data.msg);
    }
    setIsLoading(false);
  };

  function PaperListUser(props) {
    return (
      <Paper className={classes.PaperSize} elevation={4}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link to="/add-user" className={classes.actionComponent}>
            <Button
              fullWidth
              className={classes.button}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
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

        <Collapse in={flashMessage.success}>
          <Alert
            className={classes.alert}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setFlashMessage({ success: false, message: "" });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {flashMessage.message}
          </Alert>
        </Collapse>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StylingTableCell>no</StylingTableCell>
                <StylingTableCell>Nama</StylingTableCell>
                <StylingTableCell>Username</StylingTableCell>
                <StylingTableCell>Role</StylingTableCell>
                <StylingTableCell>Kantor Cabang</StylingTableCell>
                <StylingTableCell style={{ width: "300px" }}></StylingTableCell>
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
                  <StylingTableCell width="10%">
                    {paging * rowsPerPage + index + 1}
                  </StylingTableCell>
                  <StylingTableCell>{user.fullname}</StylingTableCell>
                  <StylingTableCell>{user.username}</StylingTableCell>
                  <StylingTableCell>{user.role_name}</StylingTableCell>
                  <StylingTableCell>{user.branch_name}</StylingTableCell>
                  <StylingTableCell style={{ width: "300px" }}>
                    <Grid
                      container
                      justifyContent="center"
                      spacing={1}
                      style={{
                        maxWidth: "300px",
                      }}
                    >
                      <Grid item>
                        <Link to={`/detail-user/${user.id}`}>
                          <Button size="small" variant="contained">
                            Details
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link to={`/update-user/${user.id}`}>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            Update
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item>
                        <DeleteUserDialog
                          username={user.username}
                          handleConfirm={() => {
                            handleDelete(user.id);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </StylingTableCell>
                </StylingTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={6}
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
    );
  }

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

      {Boolean(errorMsg) && <Alert severity="warning">{errorMsg}</Alert>}
      {isLoading ? <TableSkeleton /> : <PaperListUser />}
    </ContentContainer>
  );
}
