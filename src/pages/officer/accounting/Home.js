import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../../../components/ContentContainer";
import Table from "../../../components/table/payment/Table";
import TableSkeleton from "../../../components/table/payment/TableSkeleton";
import PaymentService from "../../../services/payment.service";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Accounting(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [flashMessage, setFlashMessage] = useState({
    success: false,
    message: "",
  });
  const [paymentData, setPaymentData] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    // show toast if after input data
    if (props.location.state) {
      setFlashMessage(props.location.state);
    }
  }, [props.location.state]);

  useEffect(() => {
    window.history.replaceState(null, "");
  }, []);

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async (page = 1) => {
    setIsLoading(true);
    const result = await PaymentService.getOfficerPaymentRequestList(page);
    setIsLoading(false);
    if (!Boolean(result.error)) {
      setPaymentData(result.data);
      setTotalData(result.totalData);
      if (Boolean(result.data)) {
        setErrorMsg("");
      } else {
        setErrorMsg("data not found");
      }
    } else {
      setPaymentData(null);
      setErrorMsg(result.error.response.data.msg);
    }
  };

  const handleChangePage = async (page) => {
    await fetchPaymentData(page + 1);
  };

  return (
    <ContentContainer role="accounting" selectedMenu="Beranda">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingBottom: "2em",
        }}
      >
        <Typography variant="h4">Daftar Payment Request</Typography>
      </div>
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
      {Boolean(errorMsg) && <Alert severity="warning">{errorMsg}</Alert>}
      <div style={{ display: isLoading ? "block" : "none" }}>
        <TableSkeleton />
      </div>
      <div style={{ display: isLoading ? "none" : "block" }}>
        <Table
          paymentData={paymentData}
          totalData={totalData}
          role="accounting"
          onChangePage={handleChangePage}
        />
      </div>
    </ContentContainer>
  );
}
