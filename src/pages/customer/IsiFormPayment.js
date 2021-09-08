import "date-fns";
import React from "react";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import { SendRounded } from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import ContentContainer from "../../components/ContentContainer";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  Container,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

//import './styleFormPayment.css';

//CUSTOM STYLE
const useMyStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#1890FF",
    "&:hover": {
      backgroundColor: "# 2979ff",
    },
    margin: theme.spacing(1),
    float: "right",
  },
  PaperSize: {
    padding: 40,
  },
}));

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

function FormRequest(props) {
  const classes = useMyStyles();

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
  const handleSubmit = () =>{
    props.history.push("/payment-request-result", {from : "Payment Request"});
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
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendRounded />}
              onClick={handleSubmit}
            >
              Submit Payment Request
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
