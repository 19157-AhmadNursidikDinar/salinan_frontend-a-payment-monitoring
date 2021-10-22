import React, { useEffect, useState } from 'react';
import ContentContainer from "../../../../components/ContentContainer";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ColorsTheme from "../../../../assets/colors";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import ArrowBackIosRounded from "@material-ui/icons/ArrowBackIosRounded";


import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";


import SlaService from "../../../../services/sla.service";
import branchService from '../../../../services/branch.service';

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

export function FormAddService(props) {

    const { dataBranch } = props
    const classes = useTheStyle();

    const validationSchema = Yup.object().shape({
        branch_id: Yup.number().required("Masukkan nama kantor cabang!"),
        capacity: Yup.number().required("Masukkan Kapasitas Request!"),
        recomendation: Yup.string().required("Masukkan Recomendation Request!"),
    });

    const formik = useFormik({
        initialValues: {
            branch_id: "",
            capacity:"",
            recomendation: ""
        },
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async ({ branch_id, capacity }) => {
            const result = await SlaService.createSLA({ branch_id, capacity });
            if (!Boolean(result.error)) {
                props.history.push("/service-level-agreement", { success: true, message: "Service level agreement telah ditambahkan" });
            } else{
                console.log("error");
            }
        }
    });

    const handleBranchId = async (branch_id) =>{
        const result = await SlaService.getRecomendSLA({ branch_id});
        console.log(branch_id)
        if (!Boolean(result.error)) {
            console.log(result);
            formik.setValues({
                branch_id: branch_id,
                capacity: "",
                recomendation: result.recomendation
            });
        } else {
            formik.setValues({
                branch_id: branch_id,
                capacity: "",
                recomendation: ""
            });
        }
    }

    //page add branch
    return (
        <Paper className={classes.PaperSize} elevation={4}>
            <form onSubmit={formik.handleSubmit}>
                <Container maxWidth="md">
                    <Grid
                        container
                        spacing={3}
                        direction="row"
                        alignItems="center"
                        justify="center">

                        <Grid item xs={12}>
                            <FormControl
                                variant="outlined"
                                fullWidth
                                error={
                                    Boolean(formik.errors.branch_id) && formik.touched.branch_id
                                }
                                className={classes.FormControl}
                            >
                                <InputLabel htmlFor="user-roles">Branch</InputLabel>
                                <Select
                                    label="Branch"
                                    id="branchAgent"
                                    name="branch_id"
                                    value={formik.values.branch_id}
                                    onChange={(values) =>{
                                        formik.handleChange(values);
                                        handleBranchId(values.target.value);
                                    }}
                                    disabled={formik.isSubmitting}
                                    data-test="select-branch"
                                >
                                    <MenuItem value="">none</MenuItem>
                                    {dataBranch.map(
                                        (e, i) =>
                                            e.id !== 1 && (
                                                <MenuItem value={e.id} key={i} id={e.id}>
                                                    {e.branch_name}
                                                </MenuItem>
                                            )
                                    )}
                                </Select>
                                {Boolean(formik.errors.branch_id) &&
                                    formik.touched.branch_id && (
                                        <FormHelperText>{formik.errors.branch_id}</FormHelperText>
                                    )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="recomendation"
                                name="recomendation"
                                label="Recomendation"
                                variant="outlined"
                                value={formik.values.recomendation}
                                onChange={formik.handleChange}
                                fullWidth
                                disabled={true}
                                error={
                                    Boolean(formik.errors.recomendation) && formik.touched.recomendation
                                }
                                helperText={formik.errors.recomendation}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="capacity"
                                name="capacity"
                                label="Kapasitas Request"
                                variant="outlined"
                                type="number"
                                value={formik.values.capacity}
                                onChange={formik.handleChange}
                                fullWidth
                                disabled={formik.isSubmitting}
                                error={
                                    Boolean(formik.errors.capacity) && formik.touched.capacity
                                }
                                helperText={formik.errors.capacity}
                            />
                        </Grid>
                    </Grid>

                </Container>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Link to="/service-level-agreement">
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

export default function AddServiceLevelAgreement(props) {

    const [dataBranch, setDataBranch] = useState([]);

    async function GetBranchID() {
        const result = await branchService.getAllBranch();
        if (!Boolean(result.error)) {
            setDataBranch(result.data);
        } else {
            setDataBranch([]);
        }
    }

    useEffect(()=>{
        GetBranchID();
    },[])

    return (
        <ContentContainer role="admin" selectedMenu="Service Lvl Agreement">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingBottom: "2em",
                }}
            >
                <Typography variant="h4">Tambah Service Level Agreement</Typography>
            </div>
            <FormAddService history={props.history} dataBranch={dataBranch} />
        </ContentContainer>
    )
}
