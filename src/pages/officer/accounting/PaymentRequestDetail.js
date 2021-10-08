import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import PaymentService from "../../../services/payment.service";
import DetailSkeleton from "../../../components/DetailSkeleton";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// Material ui core
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  Container
} from "@material-ui/core";
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ContentContainer from "../../../components/ContentContainer";
import useStyles from "../../../styles/customer/HasilFormPayment";

import DetailPayment from "../../../components/DetailPayment";
import PaymentStatusSelector from "../../../components/PaymentStatusSelector";



function PaymentRequestDetailAccounting(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  useEffect(() => {
    fetchPaymentDetail(id);
  }, [id]);

  const fetchPaymentDetail = async (id) => {
    setIsLoading(true);
    const result = await PaymentService.getDetailPayment(id);
    setIsLoading(false);
    if (!Boolean(result.error)) {
      setPaymentDetail(result.data);
      if (Boolean(result.data)) {
        setErrorMsg("");
      } else {
        setErrorMsg("data not found");
      }
    } else {
      setPaymentDetail(null);
      setErrorMsg(result.error.response.data.msg);
    }
  };


  const handleClickNewPayment = () => {
    props.history.push("/add-payment-request");
  }

  const handleClickGoBack = () => {
    props.history.goBack();
  }

  return (
    <ContentContainer role="accounting">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingBottom: "2em",
        }}
      >
        <Typography variant="h5">Payment Request</Typography>
      </div>
      {Boolean(errorMsg) && <Alert severity="warning">{errorMsg}</Alert>}
      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className={classes.root}>
          <Card className={classes.cardRequest}>
            <Container fixed>
              <CardContent>
                <DetailPayment paymentDetail={paymentDetail}>
                  <PaymentStatusSelector />
                </DetailPayment>
              </CardContent>
            </Container>
            <CardActions className={classes.cardActions}>
              <Button size="small"
                variant="contained"
                color="primary"
                className={classes.buttonAction}
                onClick={handleClickGoBack}
                startIcon={<ArrowBackIosRoundedIcon />}
              >
                Back
                        </Button>
              <Button size="small"
                variant="contained"
                color="primary"
                className={classes.buttonAction}
                endIcon={<SaveRoundedIcon />}
                onClick={handleClickNewPayment}
              > {matches ? 'Update' : 'Update Payment Request'}
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </ContentContainer>
  );
}

export default PaymentRequestDetailAccounting;