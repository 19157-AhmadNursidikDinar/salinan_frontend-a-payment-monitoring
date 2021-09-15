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
//Styling Page
const useTheStyle = makeStyles((theme) => ({
PaperSize: {
        padding: 40,
    },
    BtnSave: {
        backgroundColor: "#1890FF",
        '&:hover': {
            backgroundColor: "# 2979ff",
        },
        marginTop: 30,
        float: 'right',
    },
    BtnBack: {
        backgroundColor: "#1890FF",
        '&:hover': {
            backgroundColor: "# 2979ff",
        },
        marginTop: 30,
        float: 'left',
    },
}));

function FormAddBranch() {
    const classes = useTheStyle();

    //page add branch
    return(
        <Paper>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField 
                            id="BranchName"
                            name="BranchName"
                            label="Nama Kantor Cabang"
                            variant="outlined"
                            fullWidth />
                    </Grid>
                </Grid>
            </Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Link to="/branch-office-list">
                        <Button 
                            variant="contained"
                            color="primary"
                            className={classes.BtnBack}
                            startIcon={<ArrowBackIosRounded />}
                            >  
                            Kembali
                        </Button>
                    </Link>
                    <Link to="/branch-office-list">
                        <Button 
                            variant="contained"
                            color="primary"
                            className={classes.BtnSave}
                            SaveRounded={<SaveRoundedIcon />}
                            >
                            Simpan
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default function AddBranch() {
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
            <FormAddBranch />
        </ContentContainer>
    );
}
