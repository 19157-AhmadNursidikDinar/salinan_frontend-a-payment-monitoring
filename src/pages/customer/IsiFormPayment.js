//import react
import React from "react";
import NumberFormat from "react-number-format";
//import material-ui components
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { SendRounded } from "@material-ui/icons";
//import datepicker components
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
//import custom components
import ContentContainer from "../../components/ContentContainer";
import useStyles from "../../styles/customer/IsiFormPayment";

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

export function FormRequest(props) {
  const classes = useStyles();

  //Value Default Nominal
  // const [values, setValues] = React.useState({
  //     numberformat: '0',
  // })
  // const handleChange = (event) => {
  //     setValues({
  //         ...values,
  //         [event.target.name]: event.target.value,
  //     });
  // };

  //Value Default Tanggal
  const [currentDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // button pindah link menggunakan props history ke hasil form request dan menginialisasi menu sebelumnya
  const handleSubmit = () => {
    props.history.push("/payment-request-result", { from: "Payment Request" });
  }

  return (
    <Paper className={classes.PaperSize} elevation={4}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="CustomerName"
              name="CustomerName"
              label="Nama Customer"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="PaymentReason"
              name="PaymentReason"
              label="Keperluan Payment"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12}>
              <KeyboardDatePicker
                id="PaymentDate"
                label="Tanggal Pembayaran Aktual"
                variant="outlined"
                format="dd/MM/yyyy"
                value={currentDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                fullWidth
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item xs={12}>
            <TextField
              id="AmountNumber"
              name="numberformat"
              label="Angka Nominal"
              variant="outlined"
              value={null}
              // onChange={handleChange}
              InputProps={{
                inputComponent: NumberFormatIDR,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="AmountText"
              name="AmountText"
              label="Terbilang"
              variant="outlined"
              minRows={2}
              maxRows={4}
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="RecipientName"
              name="RecipientName"
              label="Nama Penerima"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="RecipientAccount"
              name="RecipientAccount"
              label="No. Rekening Penerima"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button size="small"
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendRounded />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default function IsiFormPayment(props) {
  return (
    <ContentContainer role="customer" selectedMenu="Payment Request">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingBottom: "2em",
        }}
      >
        <Typography variant="h4">Silahkan Isi Form Payment Request</Typography>
      </div>
      <FormRequest history={props.history} />
    </ContentContainer>
  );
}
