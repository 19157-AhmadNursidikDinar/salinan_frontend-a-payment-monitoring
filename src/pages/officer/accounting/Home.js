import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../../../components/ContentContainer";
import Table from "../../../components/table/payment/Table";
import TableSkeleton from "../../../components/table/payment/TableSkeleton";
import PaymentService from "../../../services/payment.service";
import Alert from "@material-ui/lab/Alert";

export default function Accounting() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    setIsLoading(true);
    const result = await PaymentService.getOfficerPaymentRequestList();
    setIsLoading(false);
    if (!Boolean(result.error)) {
      setPaymentData(result.data);
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
      {Boolean(errorMsg) && <Alert severity="warning">{errorMsg}</Alert>}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Table paymentData={paymentData} role="accounting" />
      )}
    </ContentContainer>
  );
}
