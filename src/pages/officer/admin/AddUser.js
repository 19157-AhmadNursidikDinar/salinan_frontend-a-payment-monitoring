import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    InputAdornment,
    FormHelperText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//Material-Ui Icons
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Links
import ContentContainer from "../../../components/ContentContainer";
import RoleService from '../../../services/role.service'
import branchService from '../../../services/branch.service';




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
    },
}));



function FormAddUser() {
    const router = useHistory()
    const classes = useMyStyles();
    const [dataBranch, setDataBranch] = useState([])
    //STATE "Show/Hide Password"
    const [values, setValues] = useState({
        showPassword: false,
    });

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        username: Yup.string()
          .min(6, 'Min 6 character required ')
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        password: Yup.string()
            .required('Required'),
        role_id: Yup.number()
            .notOneOf([0], 'msg')
            .required('Required'),
        branch_id: Yup.number()
            .required('required')
      })

    const formik = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            password: "",
            role_id: 0,
            branch_id: 1
        },
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async ({fullname, username, password, role_id, branch_id}) => {
            const dataUser = {fullname, username, password, role_id, branch_id}
            const data = await RoleService.CreateNewRole(dataUser)
            console.log(data);
            !data.error && router.push('/admin')
        },
      });

    // const handleBranch = (event) => {
    //     setBranch(event.target.value);
    //     for (const key of dataBranch) {
    //        if (key.branch_name === event.target.value) {
    //            setNewUser({...newUser, 'branch_id': key.id})
    //        }
    //     }
    // };
    const handleClickShowPassword = () => {
        setValues({ showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    async function GetBranchID() {
        const branchID = await branchService.getAllBranch()
        setDataBranch(branchID.data)
    }

    useEffect(() => {
        GetBranchID()
    }, [])
    //PAGE ADD USER
    return (
        <Paper className={classes.PaperSize} elevation={4}>
                <form onSubmit={formik.handleSubmit}>
            <Container>
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <TextField
                            id="AccountName"
                            name='fullname'
                            label="Nama"
                            variant="outlined"
                            fullWidth
                            value={formik.values.fullname}
                            disabled={formik.isSubmitting}
                            onChange={formik.handleChange}
                            error={
                                Boolean(formik.errors.fullname) && formik.touched.fullname
                              }
                            helperText={formik.errors.fullname}
                           
                        />                        
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl 
                            variant="outlined" 
                            fullWidth 
                            error={
                                Boolean(formik.errors.role_id) && formik.touched.role_id
                              }
                            className={classes.FormControl}>
                            <InputLabel htmlFor="user-roles">Role</InputLabel>
                            <Select
                                labelId="user-roles"
                                label="Role"
                                id="UserRole"
                                name='role_id'
                                value={formik.values.role_id}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={1}>Admin</MenuItem>
                                <MenuItem value={2}>General Support</MenuItem>
                                <MenuItem value={3}>Accounting</MenuItem>
                                <MenuItem value={4}>User</MenuItem>
                            </Select>
                            {

                                formik.errors.role_id &&<FormHelperText>eror</FormHelperText>
                            }
                            
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{display:  formik.values.role_id === 4 ? 'block' : 'none'}}>
                        <FormControl 
                            variant="outlined" 
                            fullWidth
                            error={
                                Boolean(formik.errors.branch_id) && formik.touched.branch_id
                              }
                            className={classes.FormControl}>
                            <InputLabel htmlFor="user-roles">Branch</InputLabel>
                            <Select
                                labelId="branchAgent"
                                label="Branch"
                                id="branchAgent"
                                value={formik.values.branch_id}
                                onChange={formik.handleChange}
                            >
                                {
                                    dataBranch.map((e, i)=> e.id !== 1 && <MenuItem value={e.id} key={i}>{e.branch_name}</MenuItem>)
                                }
                            </Select>
                            {formik.errors.branch_id && <FormHelperText>eror</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="UserName"
                            name="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            helperText={formik.errors.username}
                            error={
                                Boolean(formik.errors.username) && formik.touched.username
                              }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="Password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            value= {formik.values.password}
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
                            onChange={formik.handleChange}
                            helperText={formik.errors.password}
                            error={
                                Boolean(formik.errors.password) && formik.touched.password
                              }
                        />
                    </Grid>
                </Grid>
            </Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.BtnBack}
                        startIcon={<ArrowBackIosRoundedIcon />}
                        onClick={()=>router.goBack()}
                    >
                        Kembali
                    </Button>
                   {/* {buttonOnClick()} */}
                   <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.BtnSave}
                        endIcon={<SaveRoundedIcon />}
                        >
                        Simpan
                    </Button>
                </Grid>
            </Grid>
            </form>
        </Paper>
    
    );
}

export default function AddUser() {
   
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
            <FormAddUser />
        </ContentContainer>
    );
}


