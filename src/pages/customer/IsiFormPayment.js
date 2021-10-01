//import react
import React, { useState } from "react";
import NumberFormat from "react-number-format";
//import material-ui components
import Button from "@material-ui/core/Button";
import Collapse from '@material-ui/core/Collapse';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { SendRounded } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
//import datepicker components
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
//import custom components
import ContentContainer from "../../components/ContentContainer";
import PaymentResultContent from "../../components/PaymentResultContent";
import useStyles from "../../styles/customer/IsiFormPayment";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
//import API service
import PaymentService from "../../services/payment.service";

const initValue = {
  customer_name: "",
  payment_date: moment(new Date()).format("YYYY-MM-DD"),
  request: "daily-needs",
  detail_request: "",
  amount: "",
  amount_counted: "",
  account_name: "",
  account_number: "",
};

//SET Prefix in Nominal TextBox
function NumberFormatIDR(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="Rp."
    />
  );
}

const validationSchema = Yup.object().shape({
  customer_name: Yup.string().required("Input required!"),
  payment_date: Yup.string().required("Input required!"),
  request: Yup.string().required("Input required!"),
  amount: Yup.string().required("Input required!"),
  amount_counted: Yup.string().required("Input required!"),
  account_name: Yup.string().required("Input required!"),
  account_number: Yup.string().required("Input required!"),
});

function FormRequest({ formValues, handleSubmit }) {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState();
  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({
      customer_name,
      payment_date,
      request,
      detail_request,
      amount,
      amount_counted,
      account_name,
      account_number,
    }) => {
      if (request === "others") {
        request = detail_request
      }
      const result = await PaymentService.insertPayment({
        customer_name,
        request,
        amount,
        amount_counted,
        account_number,
        account_name,
        payment_date,
      });

      if (!Boolean(result.error)) {
        setErrorMsg("")
      } else {
        setErrorMsg(result.error.response.data.msg);
      }

      handleSubmit(
        {
          customer_name,
          payment_date: moment(payment_date).format("YYYY-MM-DD"),
          request,
          amount,
          amount_counted,
          account_name,
          account_number,
        });
    },
  });

  return (
    <Paper className={classes.PaperSize} elevation={4}>
      {Boolean(errorMsg) && <Alert severity="warning">{errorMsg}</Alert>}
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="customer_name"
                name="customer_name"
                label="Nama Customer"
                variant="outlined"
                fullWidth
                value={formik.values.customer_name}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
                error={
                  Boolean(formik.errors.customer_name) &&
                  formik.touched.customer_name
                }
                helperText={formik.errors.customer_name}
                data-test="txt-customer_name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Keperluan Payment
                </InputLabel>
                <Select
                  native
                  label="Keperluan Payment"
                  name="request"
                  value={formik.request}
                  onChange={formik.handleChange}
                  data-test="select-request"
                >
                  <option value="daily-needs">daily-needs</option>
                  <option value="loan-repayment">loan-repayment</option>
                  <option value="education-fund">education-fund</option>
                  <option value="travel-fund">travel-fund</option>
                  <option value="bill-payment">bill-payment</option>
                  <option value="others">others</option>
                </Select>
                <Grid item xs={12}>
                  <Collapse in={formik.values.request === "others"}>
                    <TextField
                      id="detail_request"
                      className={classes.RequestDetail}
                      label="Detail Keperluan Payment"
                      variant="outlined"
                      fullWidth
                      value={formik.values.detail_request}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      error={
                        Boolean(formik.errors.request) &&
                        formik.touched.request
                      }
                      helperText={formik.errors.request}
                      data-test="txt-detail-request"
                    />
                  </Collapse>
                </Grid>
              </FormControl>
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={12}>
                <KeyboardDatePicker
                  name="payment_date"
                  label="Tanggal Pembayaran Aktual"
                  variant="outlined"
                  format="dd/MM/yyyy"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  value={formik.payment_date}
                  onChange={formik.handleChange}
                  fullWidth
                  disabled={formik.isSubmitting}
                  error={
                    Boolean(formik.errors.payment_date) &&
                    formik.touched.payment_date
                  }
                  helperText={formik.errors.payment_date}
                  data-test="txt-payment_date"
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid item xs={12}>
              <TextField
                id="amount"
                name="amount"
                label="Angka Nominal"
                variant="outlined"
                InputProps={{
                  inputComponent: NumberFormatIDR,
                }}
                fullWidth
                value={formik.values.amount}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
                error={Boolean(formik.errors.amount) && formik.touched.amount}
                helperText={formik.errors.amount}
                data-test="txt-amount"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="amount_counted"
                name="amount_counted"
                label="Terbilang"
                variant="outlined"
                minRows={2}
                maxRows={4}
                multiline
                fullWidth
                value={formik.values.amount_counted}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
                error={
                  Boolean(formik.errors.amount_counted) &&
                  formik.touched.amount_counted
                }
                helperText={formik.errors.amount_counted}
                data-test="txt-amount_counted"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="account_name"
                name="account_name"
                label="Nama Penerima"
                variant="outlined"
                fullWidth
                value={formik.values.account_name}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
                error={
                  Boolean(formik.errors.account_name) &&
                  formik.touched.account_name
                }
                helperText={formik.errors.account_name}
                data-test="txt-account_name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="account_number"
                name="account_number"
                label="No. Rekening Penerima"
                variant="outlined"
                fullWidth
                value={formik.values.account_number}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
                error={
                  Boolean(formik.errors.account_number) &&
                  formik.touched.account_number
                }
                helperText={formik.errors.account_number}
                data-test="txt-account_number"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                size="small"
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendRounded />}
                data-test="btn-submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper >
  );
}

export default function IsiFormPayment() {
  const [formValues, setFormValues] = useState(initValue);
  const [isSubmited, setIsSubmited] = useState(false);
  const handleResetFormValues = (values) => {
    setIsSubmited(false);
    setFormValues(initValue);
  };
  const handleSubmit = (values) => {
    setIsSubmited(true);
    setFormValues(values);
  };

  return (
    <ContentContainer role="customer" selectedMenu="Payment Request">
      {isSubmited ? (
        <PaymentResultContent
          formValues={formValues}
          resetFormValues={handleResetFormValues}
        />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              paddingBottom: "2em",
            }}
          >
            <Typography variant="h4">
              Silahkan Isi Form Payment Request
            </Typography>
          </div>
          <FormRequest formValues={formValues} handleSubmit={handleSubmit} />
        </>
      )}
    </ContentContainer>
  );
}
