import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import ContentContainer from "../../components/ContentContainer";
import Table from "../../components/table/payment/Table";
import TableSkeleton from "../../components/table/payment/TableSkeleton";
import PaymentService from "../../services/payment.service";
import Alert from "@material-ui/lab/Alert";

export default function GeneralSupport() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [errorMsg, setErrorMsg] = useState();
  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async (page = 1) => {
    setIsLoading(true);
    const result = await PaymentService.getCustomerPaymentRequestList(page);
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
    <ContentContainer role="customer" selectedMenu="Beranda">
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
      <div style={{ display: isLoading ? "block" : "none" }}>
        <TableSkeleton />
      </div>
      <div style={{ display: isLoading ? "none" : "block" }}>
        <Table
          paymentData={paymentData}
          totalData={totalData}
          role="customer"
          onChangePage={handleChangePage}
        />
      </div>
    </ContentContainer>
  );
}
