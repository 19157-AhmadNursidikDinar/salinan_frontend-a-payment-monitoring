// Material ui core
import {
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Table,
    TableBody,
    TableContainer,

} from "@material-ui/core";
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ContentContainer from "../../../components/ContentContainer";
import PaymentStatusSelector from "../../../components/PaymentStatusSelector";
import useStyles from "../../../styles/customer/HasilFormPayment";

function PaymentRequestDetail(props) {
    const classes = useStyles();
    const handleClickGoBack = () => {
        props.history.goBack();
    }

    return (
        <ContentContainer role="accounting">
            <div
                style={{
                    width: "100%",
                    paddingBottom: "1em",
                }}
            >
                <Typography variant="h5">Payment Request</Typography>
            </div>
            <div className={classes.root}>
                <Card className={classes.cardRequest}>
                    <CardContent>
                        <Container fixed>
                            <TableContainer className={classes.table}>
                                <Table className={classes.table} aria-label="simple table" size='small'>
                                    <TableBody>
                                        <PaymentStatusSelector />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                    </CardContent>
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
                        // onClick={handleClickNewPayment}
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </ContentContainer>
    );
}

export default PaymentRequestDetail;