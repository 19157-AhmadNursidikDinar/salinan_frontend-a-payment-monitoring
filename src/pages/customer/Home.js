import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ContentContainer from "../../components/ContentContainer";
import Table from "../../components/table/payment/Table";
import TableSkeleton from "../../components/table/payment/TableSkeleton";
import PaymentService from "../../services/payment.service";
import Alert from "@material-ui/lab/Alert";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { useFormik } from "formik";

export default function GeneralSupport() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [errorMsg, setErrorMsg] = useState();
  const [searchValue, setSearchValue] = useState(null);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ search }) => {
      setSearchValue(search);
      fetchPaymentData(1, search);
    },
  });

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async (page = 1, searchQuery) => {
    setIsLoading(true);
    const result = await PaymentService.getCustomerPaymentRequestList(
      page,
      searchQuery
    );
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
    fetchPaymentData(page + 1, searchValue);
  };

  const resetSearch = () => {
    formik.resetForm();
    formik.setErrors({});
    setSearchValue(null);
    fetchPaymentData();
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
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            justifyContent="flex-end"
            style={{ margin: "1em 0" }}
            spacing={1}
          >
            <Grid item>
              <TextField
                id="search"
                name="search"
                placeholder="search"
                variant="outlined"
                value={formik.values.search}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting || Boolean(searchValue)}
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
            {Boolean(searchValue) ? (
              <Grid item>
                <Button
                  onClick={resetSearch}
                  variant="contained"
                  color="secondary"
                >
                  Reset
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    formik.isSubmitting || !Boolean(formik.values.search)
                  }
                >
                  Search
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
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
