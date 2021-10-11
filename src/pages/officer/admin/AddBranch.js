import React from "react";
//@material-ui/core
import {
    Container,
    TextField,
    Button,
    Grid,
    Typography,
    Paper,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
//@material-ui/icons
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import ArrowBackIosRounded from "@material-ui/icons/ArrowBackIosRounded";

//links
import { Link } from "react-router-dom";
import ContentContainer from "../../../components/ContentContainer";
import ColorsTheme from "../../../assets/colors";
//use formik
import { useFormik } from "formik";
import * as Yup from "yup";

//import api service
import BranchService from "../../../services/branch.service"

//Styling Page
const useTheStyle = makeStyles((theme) => ({
    PaperSize: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    BtnSave: {
        backgroundColor: ColorsTheme.dodgerBlue,
        '&:hover': {
            backgroundColor: ColorsTheme.blueCrayola,
        },
        marginTop: 30,
        marginRight: theme.spacing(2),
        float: 'right',
    },
    BtnBack: {
        backgroundColor: ColorsTheme.dodgerBlue,
        '&:hover': {
            backgroundColor: ColorsTheme.blueCrayola,
        },
        marginTop: 30,
        marginLeft: theme.spacing(2),
        float: 'left',
    },
}));

function FormAddBranch(props) {

    const classes = useTheStyle();

    const validationSchema = Yup.object().shape({
        branchName: Yup.string().required("Masukkan nama kantor cabang!"),
    });

    const formik = useFormik({
        initialValues: {
            branchName: ""
        },
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async ({ branchName }) => {
            const result = await BranchService.insertBranch({ branchName });
            if (!Boolean(result.error)) {
                props.history.push("/branch-office-list", { success: true, message: "Data kantor cabang telah ditambahkan" });
            }
        }
    });

    //page add branch
    return (
        <Paper className={classes.PaperSize} elevation={4}>
            <form onSubmit={formik.handleSubmit}>
                <Container maxWidth="md">
                    <Grid
                        spacing={3}
                        direction="row"
                        alignItems="center"
                        justify="center">

                        <Grid item xs={12}>
                            <TextField
                                id="branchName"
                                name="branchName"
                                label="Nama Kantor Cabang"
                                variant="outlined"
                                value={formik.values.branchName}
                                onChange={formik.handleChange}
                                fullWidth
                                disabled={formik.isSubmitting}
                                error={
                                    Boolean(formik.errors.branchName) && formik.touched.branchName
                                }
                                helperText={formik.errors.branchName}
                            />
                        </Grid>
                    </Grid>

                </Container>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Link to="/branch-office-list">
                            <Button size="small"
                                variant="contained"
                                color="primary"
                                className={classes.BtnBack}
                                startIcon={<ArrowBackIosRounded />}
                            >
                                Back
                            </Button>
                        </Link>
                        <Button size="small"
                            variant="contained"
                            color="primary"
                            disabled={formik.isSubmitting}
                            className={classes.BtnSave}
                            endIcon={<SaveRoundedIcon />}
                            type="submit"
                        >
                            {formik.isSubmitting ? "Saving..." : "Save"}
                        </Button>


                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default function AddBranch(props) {
    return (
        <ContentContainer role="admin" selectedMenu="Daftar Kantor Cabang">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingBottom: "2em",
                }}
            >
                <Typography variant="h4">Tambah Kantor Cabang</Typography>
            </div>
            <FormAddBranch history={props.history} />
        </ContentContainer>
    );
}
