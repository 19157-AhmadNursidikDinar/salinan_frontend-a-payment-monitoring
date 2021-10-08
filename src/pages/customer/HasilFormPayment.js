import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DetailSkeleton from "../../components/DetailSkeleton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PaymentService from "../../services/payment.service";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ContentContainer from "../../components/ContentContainer";
import useStyles from "../../styles/customer/HasilFormPayment";

import { Alert } from "@material-ui/lab";
import DetailPayment from "../../components/DetailPayment"

export default function HasilFormPayment(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
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
    <ContentContainer role="customer">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingBottom: "2em",
        }}
      >
        <Typography variant="h4">Payment Request</Typography>
      </div>
      {Boolean(errorMsg) && <Alert severity="warning">{errorMsg}</Alert>}
      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className={classes.root}>
          <Card className={classes.cardRequest}>
            <Container fixed>
              <CardContent>
                <DetailPayment paymentDetail={paymentDetail} />
              </CardContent>
            </Container>
            <CardActions className={classes.cardActions}>
              <Button size="small"
                variant="contained"
                color="primary"
                className={classes.buttonAction}
                onClick={handleClickGoBack}
                startIcon={<ArrowBackIosIcon />}
              >
                Back
            </Button>
              <Button size="small"
                variant="contained"
                color="primary"
                className={classes.buttonAction}
                endIcon={<ArrowForwardIosIcon />}
                onClick={handleClickNewPayment}
              > {matches ? 'New' : 'New Payment Request'}

              </Button>
            </CardActions>
          </Card>
        </div>

      )}
    </ContentContainer>
  );
}


