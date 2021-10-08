import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "@material-ui/lab";
import PaymentService from "../../../services/payment.service";
import DetailSkeleton from "../../../components/DetailSkeleton";
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



function PaymentRequestDetailGeneralSupport(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  const validationStage = (stage) => {
    let result = "null";
    if (stage === "accept") {
      result = "PENDING-GS";
    } else {
      result = "PENDING-GS-REJECT";
    }
    return result;
  }

  const validationSchema = Yup.object().shape({
    stage: Yup.string().required("Input required!").notOneOf(["null"], "Input required!"),
    reason: Yup.string().when("stage", {
      is: "reject",
      then: Yup.string().required("Input required!"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      stage: "null",
      reason: ""
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ stage, reason }) => {
      const idPayment = parseInt(id);
      const stagePayment = validationStage(stage);
      const result = await PaymentService.updatePaymentRequestStage({ idPayment, stagePayment, reason });
      if (!Boolean(result.error)) {
        const msg = stagePayment === "PENDING-GS" ? "Payment request telah diteruskan ke accounting" : "Payment request berhasil ditolak";
        props.history.push("/general-support", { success: true, message: msg });
      }
    }
  });

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

  const handleClickGoBack = () => {
    props.history.goBack();
  }

  return (
    <ContentContainer role="generalSupport">
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
            <form onSubmit={formik.handleSubmit}>
              <Container fixed>
                <CardContent>
                    <DetailPayment paymentDetail={paymentDetail}>
                      {!Boolean(paymentDetail.reason) && <PaymentStatusSelector formik={formik} />}
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
                  type="submit"
                  className={classes.buttonAction}
                  endIcon={<SaveRoundedIcon />}
                >
                  {formik.isSubmitting ? "Updating..." : "Update"}
                </Button>
              </CardActions>
            </form>
          </Card>
        </div>
      )}
    </ContentContainer>
  );
}

export default PaymentRequestDetailGeneralSupport;
