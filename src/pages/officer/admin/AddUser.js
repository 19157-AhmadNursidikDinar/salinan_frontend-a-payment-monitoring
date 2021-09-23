import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
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
    const [newUser, setNewUser] = useState({
        "fullname": "",
        "username": "",
        "password": "",
        "role_id": 0,
        "branch_id": 1
    });
    const {fullname, username, password, role_id, branch_id} = newUser
  
    //STATE "Role"
    const [role, setRole] = useState('');
    const [branch, setBranch] = useState()
    //STATE "Show/Hide Password"
    const [values, setValues] = useState({
        showPassword: false,
    });

    const formik = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            password: "",
            role_id: 0,
            branch_id: 1
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

    const handleName = (event)=>{
        //formik.handleChange
        setNewUser({
            ...newUser, 'fullname'  : event.target.value
        })
    }
    
    const handleRole = (event) => {
        setRole(event.target.value);
        setNewUser({...newUser, "role_id": event.target.value,})
    };

    const handleBranch = (event) => {
        setBranch(event.target.value);
        for (const key of dataBranch) {
           if (key.branch_name === event.target.value) {
               setNewUser({...newUser, 'branch_id': key.id})
           }
        }
    };
    const handleClickShowPassword = () => {
        setValues({ showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    function buttonOnClick() {
        if (fullname === '' || username === '' || password === '' || role_id === 0 ) {
            return ( 
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.BtnSave}
                    endIcon={<SaveRoundedIcon />}
                    onClick={()=>{SaveOnclick()}}
                    disabled
                >
                    Simpan
                </Button>
            )
           
        } else {
            if (role_id !== 4) {
                return ( 
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.BtnSave}
                        endIcon={<SaveRoundedIcon />}
                        onClick={()=>{SaveOnclick()}}
                    >
                        Simpan
                    </Button>
                )
            } else if ( role_id === 4 ){
                if (branch_id !== 1) {
                    return(
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.BtnSave}
                            endIcon={<SaveRoundedIcon />}
                            onClick={()=>{SaveOnclick()}}
                        >
                            Simpan
                        </Button>
                    )
                    
                } else {
                    return(
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.BtnSave}
                            endIcon={<SaveRoundedIcon />}
                            onClick={()=>{SaveOnclick()}}
                            disabled
                        >
                            Simpan
                        </Button>
                    )
                   
                }
            }
        }
    }

    async function GetBranchID() {
        const branchID = await branchService.getAllBranch()
        setDataBranch(branchID.data)
    }
    async function SaveOnclick() {
        const data = await RoleService.CreateNewRole(newUser)
        !data.error && router.push('/admin')
    }

   

    useEffect(() => {
        GetBranchID()
    }, [])

    //PAGE ADD USER
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
                            //value={formik.values.fullname}
                            onChange={(e)=>setNewUser({
                                ...newUser, 'fullname'  : e.target.value
                            })}
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
                                <MenuItem value={1}>Admin</MenuItem>
                                <MenuItem value={2}>General Support</MenuItem>
                                <MenuItem value={3}>Accounting</MenuItem>
                                <MenuItem value={4}>User</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        role === 4 &&
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="user-roles">Branch</InputLabel>
                                <Select
                                    labelId="branchAgent"
                                    label="Branch"
                                    id="branchAgent"
                                    value={branch}
                                    onChange={handleBranch}
                                >
                                    {
                                        dataBranch.map((e)=> e.id !== 1 && <MenuItem value={e.branch_name}>{e.branch_name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <TextField
                            id="UserName"
                            name="UserName"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            onChange={(e)=>setNewUser({...newUser, 'username'  : e.target.value})}
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
                            onChange={(e)=>setNewUser({
                                ...newUser, 'password'  : e.target.value
                              })}
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
                   {buttonOnClick()}
                </Grid>
            </Grid>
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


