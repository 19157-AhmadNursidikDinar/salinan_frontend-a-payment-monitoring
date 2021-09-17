import React from 'react';
//Material-Ui Cores
import {
    Button,
    Container,
    TextField,
    Grid,
    Typography,
    Paper,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    IconButton,
    InputAdornment
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//Material-Ui Icons
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//Links
import ContentContainer from "../../../components/ContentContainer";
import { Link } from "react-router-dom";

//PAGE STYLE
const useMyStyles = makeStyles((theme) => ({
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
    }
}));


function FormUpdateUser() {
    const classes = useMyStyles();

    //STATE "Role"
    const [role, setRole] = React.useState('');
    const handleRole = (event) => {
        setRole(event.target.value);
    };

    //STATE "Show/Hide Password"
    const [values, setValues] = React.useState({
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({ showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    ////PAGE UPDATE USER
    return (
        <Paper className={classes.PaperSize} elevation={4}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="AccountName"
                            name="AccountName"
                            label="Nama"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="user-roles">Role</InputLabel>
                            <Select
                                labelId="user-roles"
                                label="Role"
                                id="UserRole"
                                value={role}
                                onChange={handleRole}
                            >
                                <MenuItem value={"Acc"}>Accounting</MenuItem>
                                <MenuItem value={"GS"}>General Support</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="UserName"
                            name="UserName"
                            label="Username"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="Password"
                            name="Password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type={values.showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Link to="/admin">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.BtnBack}
                            startIcon={<ArrowBackIosRoundedIcon />}
                        >
                            Kembali
                        </Button>
                    </Link>
                    <Link to="/admin">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.BtnSave}
                            endIcon={<SaveRoundedIcon />}
                        >
                            Update
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default function UpdateUser() {
    return (
        <ContentContainer role="admin" selectedMenu="Beranda">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingBottom: "2em",
                }}
            >
                <Typography variant="h4">Detail Account</Typography>
            </div>
            <FormUpdateUser />
        </ContentContainer>
    );
}