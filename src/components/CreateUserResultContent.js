import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Alert from "@material-ui/lab/Alert";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import MuiTableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useStyles from "../styles/customer/HasilFormPayment";

const TableCell = withStyles((theme) => ({
  root: {
    borderBottom: "none",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "18px",
    },
  },
}))(MuiTableCell);

const MTableRow = ({ label, value }) => {
  return (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell align="center">:</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
};

function CreateUserResultContent({ newUserData, handleResetFormValues }) {
  React.useEffect(() => {
    console.log(newUserData);
  }, [newUserData]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const handleClickNewPayment = () => {
    handleResetFormValues();
  };

  return (
    <Fragment>
      <Alert severity="success" style={{ margin: "1em 0" }}>
        Akun berhasil dibuat!
      </Alert>
      <Card className={classes.cardRequest}>
        <Container fixed>
          <CardContent>
            <TableContainer className={classes.table}>
              <Table
                className={classes.table}
                aria-label="simple table"
                size="small"
              >
                <TableBody>
                  <MTableRow
                    label="Nama Lengkap"
                    value={newUserData?.fullname || ""}
                  />
                  <MTableRow
                    label="Username"
                    value={newUserData?.username || ""}
                  />
                  <MTableRow
                    label="Role"
                    value={newUserData?.role_name || ""}
                  />
                  {newUserData.role_id !== 1 && (
                    <MTableRow
                      label="Cabang"
                      value={newUserData?.branch_name || ""}
                    />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Container>
        <CardActions className={classes.cardActions}>
          <Grid container justifyContent="flex-end">
            <Button
              size="small"
              variant="contained"
              color="primary"
              className={classes.buttonAction}
              endIcon={<ArrowForwardIosIcon />}
              onClick={handleClickNewPayment}
            >
              {" "}
              {matches ? "Create" : "Create New User"}
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Fragment>
  );
}

export default CreateUserResultContent;
