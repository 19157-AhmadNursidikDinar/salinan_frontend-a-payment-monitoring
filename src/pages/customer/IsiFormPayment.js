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
//import custom components
import ContentContainer from "../../components/ContentContainer";
import PaymentResultContent from "../../components/PaymentResultContent";
import useStyles from "../../styles/customer/IsiFormPayment";
import * as Yup from "yup";
import { useFormik } from "formik";
//import API service
import PaymentService from "../../services/payment.service";
import CountedText from "angka-menjadi-terbilang";

const initValue = {
  customer_name: "",
  customer_phone: "",
  request_date: new Date(),
  request: "daily-needs",
  request_other: "",
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
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      prefix="Rp "
      suffix=",00"
    />
  );
}

function NumberFormatPhone(props) {
  const { inputRef, onChange, ...others } = props;
  return (
    <NumberFormat
      {...others}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format="+62 ### #### #####"
      allowEmptyFormatting={true}
    />
  );
}

const validationSchema = Yup.object().shape({
  customer_name: Yup.string().required("Input required!"),
  customer_phone: Yup.string().max(12, "Must be 12 digits or less"),
  request: Yup.string().required("Input required!"),
  amount: Yup.number().required("Input required!"),
  account_name: Yup.string().required("Input required!"),
  account_number: Yup.string().required("Input required!"),
  request_other: Yup.string().when("request", {
    is: "others",
    then: Yup.string().required("Input required!")
  }),
});

export function FormRequest({ formValues, handleSubmit }) {
  const classes = useStyles();

  const [errorMsg, setErrorMsg] = useState();

  function CapitalizeWords(str) {
    return str.replace(/\w\S*/g, function (kata) {
      const kataBaru = kata.slice(0, 1).toUpperCase() + kata.substr(1);
      return kataBaru;
    });
  }

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({
      customer_name,
      customer_phone,
      request_date,
      request,
      request_other,
      amount,
      amount_counted,
      account_name,
      account_number,
    }) => {
      console.log({
        customer_name,
        customer_phone,
        request_date,
        request,
        request_other,
        amount,
        amount_counted,
        account_name,
        account_number,
      });
      if (request !== "others") {
        request_other = ""
      }
      if (amount > 0) {
        amount_counted = amount_counted = CapitalizeWords(
          CountedText(formik.values.amount) + " rupiah"
        );
      }
      if (customer_phone !== "") {
        customer_phone = "62" + customer_phone;
      }
      const result = await PaymentService.insertPayment({
        customer_name,
        customer_phone,
        request,
        request_other,
        amount,
        amount_counted,
        account_number,
        account_name,
      });

      if (!Boolean(result.error)) {
        setErrorMsg("");
        handleSubmit({
          customer_name,
          customer_phone,
          request_date,
          request,
          request_other,
          amount,
          amount_counted,
          account_name,
          account_number,
        });
      } else {
        setErrorMsg(result.error.response.data.msg);
      }
    },
  });

  return (
    <Paper className={classes.PaperSize} elevation={4}>
      {Boolean(errorMsg) && (
        <Alert severity="error" className={classes.ResultAlert}>
          {errorMsg}
        </Alert>
      )}
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="customer_name"
                name="customer_name"
                label="Nama Customer *"
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
              <TextField
                id="customer_phone"
                name="customer_phone"
                label="No. Telepon Customer"
                variant="outlined"
                fullWidth
                InputProps={{
                  inputComponent: NumberFormatPhone,
                }}
                value={formik.values.customer_phone}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
                error={
                  Boolean(formik.errors.customer_phone) &&
                  formik.touched.customer_phone
                }
                helperText={formik.errors.customer_phone}
                data-test="txt-customer_phone"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Keperluan Payment *
                </InputLabel>
                <Select
                  native
                  label="Keperluan Payment"
                  name="request"
                  value={formik.request}
                  onChange={formik.handleChange}
                  data-test="select-request"
                >
                  <option value="daily-needs">Kebutuhan Sehari-Hari</option>
                  <option value="loan-repayment">Membayar Cicilan</option>
                  <option value="education-fund">Keperluan Pendidikan</option>
                  <option value="travel-fund">Keperluan Wisata</option>
                  <option value="bill-payment">Pembayaran Tagihan</option>
                  <option value="others">Keperluan Lainnya</option>
                </Select>
                <Grid item xs={12}>
                  <Collapse in={formik.values.request === "others"}>
                    <TextField
                      id="request_other"
                      className={classes.RequestDetail}
                      label="Detail Keperluan Payment *"
                      variant="outlined"
                      fullWidth
                      value={formik.values.request_other}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      error={
                        Boolean(formik.errors.request_other) &&
                        formik.touched.request_other
                      }
                      helperText={formik.errors.request_other}
                      data-test="txt-detail-request"
                    />
                  </Collapse>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="amount"
                name="amount"
                label="Angka Nominal *"
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
                autoComplete="off"
                data-test="txt-amount"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="amount_counted"
                className={classes.DisabledField}
                label="Terbilang"
                variant="outlined"
                minRows={2}
                maxRows={4}
                multiline
                fullWidth
                value={
                  Boolean(formik.values.amount)
                    ? CapitalizeWords(
                      CountedText(formik.values.amount) + " rupiah"
                    )
                    : ""
                }
                onChange={formik.handleChange}
                disabled
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
                label="Nama Penerima *"
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
                label="No. Rekening Penerima *"
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
    </Paper>
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